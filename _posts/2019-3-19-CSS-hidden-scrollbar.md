---
layout: post
title: CSS 隐藏滚动条
tags: 
  - CSS
  - 笔记
---

### PC中实现隐藏滚动的方法

在浏览器中隐藏滚动条，兼容浏览器**(chrome 和Safari)**，只需在滚动的class中加入如下CSS即可

```css
.element::-webkit-scrollbar {
    display: none;
}
```

要兼容PC其他**浏览器IE,Firefox**等，在容器外面再嵌套一层`overflow:hidden`，内部内容限制尺寸和外部嵌套层一样，就变相隐藏了。

```html
<div class="outer-container">
     <div class="inner-container">
        <div class="content">
            ......
        </div>
     </div>
 </div>
```

```css
.outer-container,.content {
    width: 200px; height: 200px;
}
.outer-container {
    position: relative;
    overflow: hidden;
}
.inner-container {
    position: absolute; left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
 
 /* for Chrome */
.inner-container::-webkit-scrollbar {
    display: none;
}
```

### H5隐藏滚动条

上面说的都是PC的，但一般H5中如果有滚动条会看着很丑，有没有更有效的H5隐藏的方法？换个思路，接着往下看。

需求：
主要是为了实现一个横向滚动，隐藏滚动条的办法

微信webview内核由UIWebView升级到新内核WKWebView后，就不生效了

```css
// 只需要添加如下样式，隐藏滚动条样式就会生效
-webkit-overflow-scrolling: touch;
```

**H5更trick的方法，隐藏滚动条**
换个思路有时候问题就解决了，看似欺骗性的解决办法，但用户无感知，对于程序员来说只要解决了问题就行，这种方式也值得推荐。

主要是通过把滚动条撑开，然后通过负值的外边距抵消撑开的部分，使得外容器高度不受影响，从而隐藏溢出的滚动条。

```html
<div class="slider">
    <ul></ul>
</div>
```

```css
.slider {
    overflow: hidden;
}
.slider ul {
    padding-bottom: 10px;
    margin-bottom: -10px;
}
```

---
参考链接


[CSS 实现隐藏滚动条同时又可以滚动](https://blog.niceue.com/front-end-development/hide-scrollbar-but-still-scrollable-using-css.html)
[H5页面横向滚动条隐藏](https://github.com/o2team/H5Skills/issues/72)


