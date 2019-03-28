---
layout: post
title: 解决Chrome不能播放mp4视频的问题和HLS视频播放
tags: 
  - JS
  - 笔记
---

现在面临一个问题chrome中播放后缀名为.mp4的视频文件只有声音播放不出视频画面，上网查了一下才知道，MP4视频不是说后缀名以.mp4结尾的就是MP4视频，mp4视频还包括不同的编码格式，还有不同的扩展名，都可以统一定义成MP4文件，而chrome只支持标准的H.264方式的编码，所以如果视频编码格式不对，chrome还是加载不出来的。

想要查看视频的编码格式，最简单查看视频信息的方式是，在文件中选中视频点击右键查看简介或者详细信息，下面有一个栏信息是编解码器：标准的编码格式是H.264，如果不是这种格式，那很抱歉chrome加载不出来是正常的。


**为什么chrome只支持H264这种格式呢**

查了一下大概是说，绝大部分的视频编码格式都是要付专利费的，Google已经买了H264编码格式，所以其他的就不买了，Firefox没有Google那么有钱不愿意买。不过它使用Flash，绝大部分的视频格式基本上可以通过Flash播放。


而我司解决办法是，将MP4视频文件转码统一转成hls格式编码的视频，这种格式的视频后缀名是以.m3u8结尾的。

#### 什么是HLS？

HTTP Live Streaming（简称HLS）是一个基于HTTP的视频流协议，由苹果公司实现，

HTTP流媒体直播(HLS)是一种基于HTTP的媒体流媒体通信协议，由苹果公司实施，作为QuickTime、Safari、OS X和iOS软件的一部分。它的工作原理是将整个流程分解成一个小的基于http的文件下载序列，每个下载都加载了一个完整的潜在无界传输流的一小块。

#### 什么m3u8
先说说M3U，M3U是一种播放多媒体列表的文件格式，它的设计初衷是为了播放音频文件比如MP3,但是越来越多的软件现在用来播放视频文件列表，M3U也是可以指定在线留媒体音频源。很多播放器和软件都支持M3U文件格式。

M3U8是Unicode版本的M3U，用UTF-8编码。’M3U’和M3U8‘文件都是苹果公司使用的HTTP Live Streaming格式的基础，这种格式可以在iPhone和Macbook等设备播放。

#### 平台支持情况
苹果的产品都能很好的支持，iPhone、Safari，但是在chrome和Firefox还有一些其他未知的浏览器不支持播放这种视频格式。

So，想要播放这种格式的视频，前端这块还要做一层处理，不过不用担心，已经有人帮我们造好轮子了，Github上有很好的库可以支持这种视频格式的播放，[VideoJs](https://github.com/videojs/video.js),[videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
集成起来也非常的简单，github上都给了一些示例。

- 快速集成开发
在`head`头中引入如下的CDN，需要引入videojs的样式，是为了使用播放器的样式，要不然播放器会很难看。

```html
<link href="//vjs.zencdn.net/5.19/video-js.min.css" rel="stylesheet">
<script src="//vjs.zencdn.net/5.19/video.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.8.3/videojs-contrib-hls.min.js"></script>
```

```html
<body>
    <video id="video-play" class="video-js vjs-default-skin"
      style="width: 600px; height: 400px;"
      playsinline webkit-playsinline
      controls preload="auto"
      x-webkit-airplay="true" controlsList="nodownload" oncontextmenu="return false">
      <source src="http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8" type="application/x-mpegURL">
    </video>
    <button>播放</button>
</body>

<script>
    var el = document.getElementById("play-btn")
    el.addEventListener('click', function () {
        window.videojs('video-play', {}, function onPlayerReady () {
         this.play()
         this.on('ended', function () {
             console.log('ended, video js')
         })
       })
    })
</script>
```

#### 扩展：
- MP4视频编码格式有哪几种

  MP4视频格式包括：MPEG-4 SP(Simple Profile/简单类)/ASP(Advanced Simple Profile/高级简单类)：xvid, divx5, 3ivx,ffmpeg/ffdshow, NeroDigital ASP...及MPEG-4 AVC/H.264：x264, NeroDigital AVC, Apple...还有MPEG-2, MPEG-1（不含Divx3/M$ MPEG4, WM9, RV9或VP6）.-


----

参考链接：

Mp4编码全介绍：https://my.oschina.net/alphajay/blog/4276

http://www.jianshu.com/p/52c569efbfc0

https://imququ.com/post/html5-live-player-1.html