---
layout:     post
title:      "Web分享到Twitter、Facebook、微信、微博"
author:     "Sunny"
tags:
    - Web
    - 笔记
---

分享是为了更好的传播，尤其是做业务平台网站的，传播是自然的事情，而且要和国际化接轨，就要能分享到Facebook、Twitter这样的网站，在中国这片土地上使用最多的就是微信了，所以微信也是一个很好的传播平台，但是自定义标题和缩略图在现在的微信是没有办法做到了。

## 分享到微信

##### 1、 微信内分享
不知有没有发现，自己的网站链接有时候分享到微信群中，发到朋友圈，右下角的缩略图没了。之前以为是没有集成JSSDK，但做了一个微信公众号的项目，集成了JSSDK，发现有的页面按照之前在body的最上方添加一张隐藏的默认图片形式也不行了，只有使用JSSDK中的分享方法，主动设置分享icon和标题才有作用。

网上查找才发现，微信6.5.5版本调整了分享规则，针对公众号的网页分享，必须接入微信认证公众号！
https://mp.weixin.qq.com/s/hAdtKl2i4ilyo9HxT1kXyw

所以没有接入JSSDK的网站想要在微信中分享自定义标题和icon是没有希望了。
想要在微信中传播自定义标题和缩略图就要乖乖的集成JSSDK，按照规则分享吧:)

##### 2、从浏览器分享到微信
在浏览器打开后，点击浏览器自带的分享图标，选择**微信**，这种方式获取缩略图的方法：
需要在head头部添加[Open Graph Meta Data](http://ogp.me/)

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="http://www.example.com/img/thumbnail.png">
<meta property="og:url" content="http://www.example.com/">
```

其中og:image是完整的URL，最好不要太大，毕竟是缩略图
亲测这种方式可以实现从手机浏览器分享到微信可定制缩略图和title。

**注意**
坑还在后面，如果分享的自定义的title中包含**现金**、**提现**、**红包**等这类关键字是分享不出去的，坑啊……所以我们改为繁体字之后就可以了，如果一定要用这类字就先用繁体字代替吧，要不然就换成别的吧。

## 分享到 Facebook & Twitter & 微博

web页面想要分享到Facebook、Twitter和微博，简单的是需要在按钮写个a标签，将分享链接自定义，点击之后就可以跳到一个它们提供的外部分享页面，分享了。

#### Weibo
web微博分享直接在按钮上添加个a标签，直接调用微博开放出来的分享链接就可以了。标题和url都可以根据自己的需求填写。

```html
<a href="http://service.weibo.com/share/share.php?appkey=&title=填上你的标题&url=http://example.com&searchPic=false&style=simple" target="_blank">Weibo</a>
```

#### Facebook
web页面分享到Facebook也可以直接使用链接跳转。

```html
<a href="https://www.facebook.com/sharer.php?title=填上你的标题&u=http://example.com" target="_blank">Facebook</a>
```

但是Facebook自定义title不管用，它自己有抓取目标页面代码的一套规则，对html中的<title/>和<meta/>标签进行分析。一般来说<title/>会作为要分享的标题，<meta name="description" content="">会作为分享的正文。这是最基本的两个抓取点。

**注意：**抓取的内容是从服务端返回的html代码，由js操作后的html抓取不到。

所以想要Facebook分享能有图片和页面的标题，需要提前将meta中的`og`定义好，注意`og:image`中图片（完整url）的尺寸大小，最小不要小于200 x 200px，太小了也抓取不到。还有两种尺寸的图片大小，1200 x 630px 或者 600 x 315 根据自己的需要生成吧，而且图片需要在国外能很好的加载出来，我们使用的是七牛的链接，发现七牛的图片链接在国外支持的不太好，有时候会访问失败。
[Facebook share best practices](https://developers.facebook.com/docs/sharing/best-practices#crawl)

如果是简单的web分享，使用上面的分享链接就可以了，Facebook ID也没有必要去申请，如果想要在本页面中弹出弹窗分享链接，可以申请个Facebook app创建一个APP ID，要求不高一个链接完全就可以了。

没有抓取到设计的图片和标题，检测一下图片的链接和og中设置title和image对不对，记住js修改的抓取不到哦，其他的应该就没什么问题了

#### Twitter
web分享到Twitter，也可以直接使用分享链接，直接放到代码中就可以了。

```html
<a href="https://twitter.com/share?text=填上你的标题&url=http://example.com" target="_blank">Twitter</a>
```

如果想要使用Twitter分享带图片的链接，生成Twitter Cards的形式，需要在meta中添加图片的大小，[官方文档Twitter cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)

```html
<meta name="twitter:card" content="summary"></meta>
```

同样cards上的title、描述和图片也是抓取og中定义的title、description和image，提前在meta中定义好。

**注意**
Twitter也是只能抓取服务端返回的html，后来用js修改的meta抓取不到。


---
Facebook分享调试工具
https://developers.facebook.com/tools/debug/sharing/


---
**参考链接**
[web分享到Facebook、Twitter](https://doterlin.github.io/blog/2017/01/07/fb-share/)

[微信分享没缩略图](https://flniu.github.io/blog/2017/03/14/wechat-share-link-thumbnail/#%E6%96%B9%E6%B3%95%E4%B8%80%E5%9C%A8%E9%A1%B5%E9%9D%A2-body-%E6%9C%80%E4%B8%8A%E6%96%B9%E6%B7%BB%E5%8A%A0-300300-%E5%83%8F%E7%B4%A0%E7%9A%84-img)
注意：在body上添加图片已经失效。

[微信分享没有缩略图-JSSDK集成](https://blog.csdn.net/qq_34543438/article/details/78254682)

Facebook & Twitter分享meta tag规则定义
[What You Need to Know About Open Graph Meta Tag……](https://blog.kissmetrics.com/open-graph-meta-tags/)

