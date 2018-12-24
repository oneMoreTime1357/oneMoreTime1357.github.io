---
layout:     post
title:      "有意思的Console"
date:       2018-09-11
author:     "Sunny Yang"
tags:
    - 翻译
    - Web
    - JS
---

看到了一篇文章觉得很有意思
原文是**[How you can improve your workflow using the JavaScript console](https://medium.freecodecamp.org/how-you-can-improve-your-workflow-using-the-javascript-console-bdd7823a9472)** 作者列举了Console的其他用法，算我孤陋寡闻了，平常Debug时只使用`Console.log`，看了这篇文章才知道有那么多有意思的方法，下面介绍给大家。
<!--more-->
## 什么是Console

JavaScript console 是现在浏览器的一个特性，它可以为开发者提供

* 在网页上查看错误日志和警告日志
* 使用JS命令与网页交互
* 在浏览器中直接Debug项目访问DOM
* 分析网络活动

基本上在浏览器里它授权你写，管理和监听JavaScript是否正确

### Console.log, Console.error, Console.warn and Console.info

这些是最常见的方法，你可以传递多个参数，每个参数都被计算并连接到一个由空格分隔的字符串中，但是objec对象和array数组例外，它们是通过属性进行分隔。
![screenshot1](http://oybj22zxs.bkt.clouddn.com/screenshot1.png)

### Console.group

这个方法允许你将一系列的console.log进行分组（包括 error info 等），在这个组中可以进行折叠。语法也非常简单，

```js
function doSomthing (parm) {
	console.group('group start')
	console.log('date print', new Date())
	console.log(123)
	console.groupEnd()
	console.log('out the group')
}
doSomthing()
```

结果如下：

![screenshot2](http://oybj22zxs.bkt.clouddn.com/screenshot2.png)


### Console.table

当遇到特别大的JSON和数组时`console.log`打印出来很糟糕，`console.table`可以让我们看到可视化的数据结构，还可以命名列表的名字只需要传递参数进去。

```js
const typeConsole = [
    {name: 'log', type: 'standard'},
    {name: 'info', type: 'standard'},
    {name: 'table', type: 'wwwwowww'}
]
console.table(typeConsole)
const mySocial = {
	facebook: true,
	linkedin: true,
	weibo: false,
	meduim: false
}
console.table(mySocial, ["Social", "have Account"])
```

结果输出如下
![screenshot3](http://oybj22zxs.bkt.clouddn.com/screenshot3.png)


第二种打印的方法并没有在列的标题上展示我自定义的文字。

### Console.count, Console.time and Console.timeEnd

对于每个开发者在debug时，这三个方法就像是瑞士军刀一样好用。`console.count`统计并输出相同的标签被执行多少次。`console.time`以指定参数的名称作为开始计时器，并且可以在给定页面上同时运行10,000个计时器。我们可以使用`console.timeEnd`停止计时器并在控制台打印出收集的时间。

```js
console.time('time start')
console.time('init arr')
const arr = new Array(20)
console.timeEnd('init arr')

for (var i = 0; i < arr.length; i++){
	arr[i] = new Object()
	const _type = (i %2 === 0) ? 'even ' : 'odd '
	console.count(_type + 'added')
}

console.timeEnd('time start')
```

输出如下：![screenshot4](http://oybj22zxs.bkt.clouddn.com/screenshot4.png)

### Console.trace and Console.assert

这些方法只是简单的从调用它的地方打印堆栈跟踪。想象一下在创建JS库的时候想知道用户什么时候会触发这个error。在这种情况下这个方法很管用。`console.assert`和`console.trace`很像，但是只在条件不满足时才执行。

```js
function lesserThan (a, b) {
	console.assert(a < b, {"message": "a is not lesser than b", "a": a, "b": b})
}
lesserThan(6,5)
console.trace('enddd')
```

输出如下：当输入6，5时

![screenshot](http://oybj22zxs.bkt.clouddn.com/screenshot.png)

### 删除所有的Consoles

使用完console之后经常需要我们清除它们。有时我们忘了清除直接发到了生产环境（经过了好长时间才注意到）。当然也不建议滥用console在不需要的地方（当控制台得出正确的结果最好将它删除），把错误日志和trace日志保留在开发环境帮助debug。作者经常使用Webpack在工作中或者自己的项目中。这有一个工具可以删除所有你不需要的console在生产环境构建的时候，它是[uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var debug = process.env.NODE_ENV !== "production";

.....
optimization: {
        minimizer: !debug ? [
            new UglifyJsPlugin({
                // Compression specific options
                uglifyOptions: {
                    // Eliminate comments
                    comments: false,
                    compress: {
                       // remove warnings
                       warnings: false,
                       // Drop console statements
                       drop_console: true
                    },
                }
           })] : []
}
```


又增多了几个debug的技能，技术之路探索永不止息。
跟着作者的节奏打开浏览器控制台，跟着上面的代码进行操练吧，就会掌握这种调试技巧。

