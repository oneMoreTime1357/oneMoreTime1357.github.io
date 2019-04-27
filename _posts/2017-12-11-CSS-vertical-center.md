---
layout: post
title: CSS垂直居中
date:  2017-12-11
tags: 
  - CSS
  - 笔记
  - Web
---

CSS垂直居中基本上经常需要用到的一个需求，而且面试的时候也有的公司会考察这个问题，但是需要手写出来，所以对于这个老生常谈的问题还是需要记住，下面就是我总结出了几种垂直居中的方法：
<!-- more -->
#### 基于绝对定位的方法
这种方法采用了绝对定位的方法适用于，固定宽高的模块。废话不说上代码
html

```css
<div class="main">
    <div class="center">居中文本</div>
</div>
```

css

```css
.main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}
```

- 原理就是使用绝对定位相对于父元素，左边偏移50%，右边偏移50%，然后再使用**[transform](https://www.w3cplus.com/content/css3-transform)**中的translate进行位移，translate移动是根据元素中心作为参考值移动的，所以以元素中心为基点，再向左向上移动-50%，此元素就达到居中的效果了。

#### table垂直居中

```css
<table style="width=100%">
    <tr>
        <td>这是table垂直居中</td>
    </tr>
</table>
```

如果担心语义上的不同，可以使用如下方式
html

```html
<div class="table-style">
    <div class="table-cell">table垂直居中</div>
</div>
```

css

```css
.table-style {
    display: table;
    width: 100%;
}

.table-cell {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```

#### 使用Flex解决方案
html

```html
<div class="main">
    <div class="center">flex居中</div>
</div>
```

css

```css
.main {
    width：100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

Flex中的**align-items**定义项目在交叉轴上如何对齐，**center**是交叉轴的中点对齐，而**justify-content**定义了项目在主轴上的对齐方式，**center**在主轴方向居中，两者组合就可以实现垂直居中的效果。

---
这就是我总结的三种垂直居中的方法，如何还有更好的方法欢迎交流。

