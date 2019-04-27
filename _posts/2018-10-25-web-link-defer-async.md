---
layout: post
title: async 、 defer、prefetch
tags: 
  - 笔记
  - Web
---

### async && defer

```js
<script src="script.js"></script>
```

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

#### async

```js
<script async src="script.js"></script>
```

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

#### defer

```js
<script defer src="myscript.js"></script>
```

有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

![web_defer.png](https://upload-images.jianshu.io/upload_images/1205680-56481e6081daeafc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### Nuxt 添加defer

```
{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', defer: true }
```

**总结**

- defer和async都不会阻止Document的解析，都是异步
- defer会在DOMContentLoaded前依次按照加载顺序执行脚本
- async则是下载完立即执行，不一定是在DOMContentLoaded前
- async因为顺序无关，所以很适合Google Analytics这样的无依赖脚本

### prefetch

**MDN 解释 prefetch**
> link prefetch 是一种浏览器机制，其利用浏览器空闲时间来下载或预取用户在不久的将来可能访问的文档。页面向浏览器提供一组预取提示，并在浏览器完成当前页面的加载后开始静默的拉取执行的文档并将其存储在缓存中。当用户访问其中一个预取文档时，便可以快速的从浏览器缓存中得到

#### 预加载Link prefetch写法

HTML5页面资源预加载/预读取功能是通过Link标记实现的，将rel属性指定为prefetch，在href属性指定要加载的资源地址。

```
<link rel="prefetch" href="/images/big.jpeg">
```

#### prefetch在什么情况下使用

- 当页面有幻灯片类似的服务时，预加载/预读取接下来的1-3页和之前的1-3页。
- 预加载那些整个网站通用的图片。
- 预加载网站上搜索结果的下一页。

#### 预加载注意事项

- 预加载(Link prefetch)不能跨域工作，包括跨域拉取cookies。
- 预加载(Link prefetch)会污染你的网站访问量统计，因为有些预加载到浏览器的页面用户可能并未真正访问。
- 火狐浏览器从2003年开始就已经提供了对这项预加载(Link prefetch)技术的支持



---
**参考链接**

[H5页面预加载Link prefetch加速页面](http://www.webhek.com/post/link-prefetch.html)

[defer和async区别](https://segmentfault.com/q/1010000000640869)

[defer && async](https://github.com/xiaoyu2er/blog/issues/8)


