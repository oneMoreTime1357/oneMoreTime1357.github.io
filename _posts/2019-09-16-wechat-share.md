---
layout:     post
title:      公众号和小程序互跳
tags:
    - wechat
    - 笔记
    - Tips
---

## 公众号和小程序

可以相互关联跳转，下面分两种情况，从公众号跳小程序，从小程序跳公众号。

#### 公众号跳小程序
在公众号中，查看公众号关联的小程序，就可以直接跳到小程序

#### 小程序跳公众号
在小程序中，直接在小程序内点击右上角，点击关于xxx，就可以看到关联的公众号了

## 公众号和H5
也可以相互跳转，只不过比较迂回。

#### 公众号跳H5
在公众号中，可以从底部自定义菜单，自定义消息就可以直接打开H5

#### H5跳公众号
可以先跳转到公众号的历史消息页面，然后再从历史消息页面直接点击跳到公众号。

## 公众号H5和小程序
两者仅在小程序中可以互跳

#### 公众号H5直接跳到小程序

这个是不支持的，除非生成小程序指定页面的二维码，通过扫码跳到小程序

#### 小程序跳H5，H5跳小程序
小程序跳H5是基于小程序内部提供的`web-view`直接在小程序内部加载H5页面，然后在小程序打开的H5中也可以通过调用小程序的API，回跳到小程序中。

[官方文档链接](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)


**参考链接:**

[微信小程序、微信公众号、H5之间能相互跳转](https://www.anttoweb.com/kb/wei-xin-xiao-cheng-xu-wei-xin-gong-zhong-hao-h5-zhi-jian-neng-xiang-hu-tiao-zhuan/)
