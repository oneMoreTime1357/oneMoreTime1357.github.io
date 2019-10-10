---
layout:     post
title:      HTML转PDF
tags:
    - JS
    - HTML
    - 笔记
    - Tips
---


这周有一个需求，产品需要在后台系统预览一个网页图表信息，然后可以直接将这个图表下载成PDF保存到本地。这么骚的操作，之前还没有遇到，大概调研了一下。

在浏览器上直接打开网页，浏览器是支持将当前网页转成PDF下载的，右键->打印就可以了，但是不符合需求设定，需求是要在当前页面打开一个弹窗，然后下载弹窗里面展示的内容，而不是整个页面的内容，那就只能用其他办法了。发现有两个JS库可以支持这一操作的完成[Html2canvas](http://html2canvas.hertzen.com/getting-started)、[jsPDF](https://github.com/MrRio/jsPDF)，思路是这样的，分两步。

1. 首先使用Html2canvas将html页面生成canvas快照，
2. 再使用jsPDF将canvas转成PDF

下面就简单介绍一下详细步骤

### Html2canvas
[Html2canvas](https://github.com/niklasvh/html2canvas/)
Html2canvas可以在浏览器中基于网页DOM生成屏幕快照，或者页面部分的快照，但不是100%精确。它是浏览器客户端界面生成的并不需要服务端的参与。


#### 使用

html2canvas使用Promise构建，该函数返回一个包含canvas的promise。

```js
html2canvas(document.body).then(function(canvas) {  
  document.body.appendChild(canvas);
});
```

### jsPDF
[jsPDF](https://github.com/MrRio/jsPDF)
用于浏览器客户端生成PDF。可以将文字生成PDF，图片生成PDF

#### 使用

将图片文字生成PDF。[Demo示例](https://raw.githack.com/MrRio/jsPDF/master/)

```js
var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRg....';

var doc = new jsPDF();

doc.setFontSize(40);
doc.text("Octocat loves jsPDF", 40, 30, 4);
doc.addImage(imgData, 10, 40, 180, 180);
```

### HTML生成PDF
首先将jsPDF和html2canvas引入到项目，不管是引用js还是使用npm引入。引入完成之后，接下来我们可以使用了，先贴代码，然后再说坑再哪里。如下是使用html2canvas将网页中的内容生成canvas，然后使用jsPDF将canvas生成PDF，生成的canvas要是太长就会有分页的问题，下面是如果有分页就增加一个页面进行分页。

```js
 window.html2canvas(document.getElementById('contentView')).then(function (canvas) {
          console.log('下载中')
          // document.body.appendChild(canvas)
          
          var contentWidth = canvas.width
          var contentHeight = canvas.height

    // 一页pdf显示html页面生成的canvas高度;
          var pageHeight = contentWidth / 592.28 * 841.89
    // 未生成pdf的html页面高度
          var leftHeight = contentHeight
    // 页面偏移
          var position = 0
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 595.28
          var imgHeight = 592.28 / contentWidth * contentHeight

          var pageData = canvas.toDataURL('image/jpeg', 1.0)

          var pdf = new jsPDF('', 'pt', 'a4')

    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    // 当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
	          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
                // 避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage()
              }
            }
          }

          pdf.save('content.pdf')
        })
```

**注意**

有坑的地方，刚开始不知道怎么回事，代码写的也正确，但生成canvas的时候，总是只能截取当前可视区域的位置，最后查了很多办法，看项目排查才发现，是因为项目中引入了其他的样式css，在body样式上添加了`overflow:hidden;`导致超出页面窗口的部分都被截掉了，当前页面是在内部设置的滚动，所以在抓取页面生成canvas的时候，能获取到页面高度只有窗口的高度，canvas在生成的时候也是只有可视区域那么大。所以，在使用的时候也要注意页面的高度，是不是真正撑起来的高度，canvas绘制时是根据页面的滚动区域scrollWidth和scrollHeight设置高度的。

---

**参考链接**

很详细的一篇教程 https://github.com/linwalker/render-html-to-pdf

https://github.com/niklasvh/html2canvas/issues/117