---
layout:     post
title:    JavaScript运行机制，Event Loop
tags:
    - 笔记
---

## 为什么JavaScript是单线程

JavaScript的机制就是单线程，一次只能做一件事，为什么是单线程，而不是多线程呢？



JavaScript是单线程与它的用途有关。作为浏览器脚本语言，与用户进行交互操作DOM，就注定了只能是单线，要不然会有很多的同步问题。试想一下，如果JavaScript是多线程，一个线程操作DOM进行修改，一个线程同时执行删除操作，那这时怎么执行，以哪个为准？



所以JavaScript是单线程，避免了复杂性。



为了利用多核CPU的计算能力，提出了web worker，允许JavaScript创建多个线程，但web worker也是主线程控制，不得操作DOM。所以JavaScript还是单线程。



## 任务队列

单线程意味着，所有任务都需要排队，前一个任务结束才会执行后一个任务。



任务分为同步任务和异步任务。同步任务是指在主线程排队的任务，只有上一个任务执行完毕，下一个任务才能执行；异步任务是指，不进入主线程，而进入任务队列（task queue）的任务，只有“任务队列”通知主线程，某个异步任务可以执行了，才会进入主线程执行。



任务队列是一个先进先出的数据结构，排在前面的先执行，优先被主线程读取。

![img](/img/event-loop/loop-flow.png))

## 事件和回调函数

“任务队列”是一个事件队列，IO设备完成一项任务，就在任务队列中添加一个事件，表示相关的异步任务可以进入执行栈了。主线程读取任务队列，就是读取里面有哪些事件。



“任务队列”中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（如：鼠标点击，页面滚动等）。只要指定回调函数，这些事件发生时就会进入任务队列，等待主线程读取。



回调函数，就是指那些被主线程挂起来的代码，异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。



任务队列是一个队列，先进先出的数据结构。排在前面的事件优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，“任务队列”上的第一位事件就会自动进入主线程。



## Event Loop

主线程从“任务队列”中读取事件，这个过程是循环不断的，所以整个的这种运行机制是Event loop（事件循环）



下面是一张经典的描述事件循环的图，引自[Philip Roberts: Help, I’m stuck in an event-loop.](https://vimeo.com/96425312)

![image.png](/img/event-loop/event-loop.png))

从这张图中可以看出，主线程JS中有堆和栈，栈中调用的一些函数和事件，会按顺序加入到任务队列，当栈中的代码执行完毕，就会读取任务队列中的事件和回调函数，按顺序执行。



一个例子

```
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
```

它的执行顺序是这样的

![3426099361.gif](/img/event-loop/active-loop.gif))



### 定时器

定时器setTimeout、setInterval，这两个函数的运行机制是一样的，区别在于，前者指定时间只执行一次，后者重复反复执行。

```
setTimeout(() => {
    console.log('hello')
}, 200)
```

当执行到setTimeout时，setTimeout的第二个参数是告诉JavaScript，再过多长时间将这个函数添加到任务队列中。如果队列是空的，那么添加的代码会立即执行，如果队列不是空的，则需要等待前面的代码执行完了以后再执行。



### 宏任务、微任务

将回调函数或事件添加到任务队列之后，主线程读取任务队列的任务也不是完全按照顺序来执行，而是遵循：在同一个事件循环中，微任务优先宏任务执行。



```
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');
```

想一下上面会输入什么



```
script start
script end
promise1
promise2
setTimeout
```

上面就是执行结果，可以看到在浏览器中，最后执行的是setTimeout，promise先执行，为什么会这样呢？

宏任务微任务有哪些？

#### 宏任务

| #                     | 浏览器 | Node |
| --------------------- | ------ | ---- |
| I/O                   | ✅      | ✅    |
| setTimeout            | ✅      | ✅    |
| setInterval           | ✅      | ✅    |
| setImmediate          | x      | ✅    |
| requestAnimationFrame | ✅      | x    |



requestAnimationFrame [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

> requestAnimationFrame()告诉浏览器在下次重绘之前调用指定的回调函数来更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。



#### 微任务

| #                          | 浏览器 | Node |
| -------------------------- | ------ | ---- |
| process.nextTick           | x      | ✅    |
| MutationObserver           | ✅      | x    |
| Promise.then catch finally | ✅      | ✅    |



## 在Node中

Node也是单线程，但与浏览器中的表现稍有不同。

![image.png](/img/event-loop/node-loop.png)

根据上图node js的运行机制

> 1. V8引擎解析JavaScript脚本。
> 2. 解析后的代码，调用Node API。
> 3. libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个事件循环Event Loop，以异步的方式将任务的执行结果返回给V8引擎。
> 4. V8引擎再将结果返回给用户。



Node js独有的方法，process.nextTick、setImmediate。



**process.nextTick**

process.nextTick可以在当前执行栈的尾部，下一次Event Loop之前触发回调函数。也就是说，它指定的任务总是发生在所有异步任务调用之前。

```
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

new Promise(resolve => {
  console.log('promise 1')
  resolve('promise then')
}).then(res => {
  console.log(res)
})

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
```

输出如下：

```
promise 1
1
2
promise then
TIMEOUT FIRED
```

上面这段代码中，由于process.nextTick方法指定的回调函数，总是在当前执行栈的尾部触发。所以函数A比setTimeout和promise.then先执行，函数B也是。这说明多个process.nextTick语句，在当前执行栈中执行。



**setImmediate**

看如下代码执行

```
setImmediate(function A() {
  console.log(1);
  setImmediate(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0);
```

在node环境运行了很多次，结果会出现很多中情况，有可能是1-TIMEOUT FIRED-2，或者TIMEOUT FIRED-1-2



但Node文档中称setImmediate总是排在setTimeout前面，但下面的代码把这两个函数封装在一个异步回调里。

```
require('fs').readFile(__dirname, _ => {
  setTimeout(_ => console.log('timeout'))
  setImmediate(function A() {
    console.log('immediate');
    setImmediate(function B(){console.log(2);});
  });
})

// immediate
// timeout
// 2
```

如上打印出来的结果，会一直是这个顺序，immediate-timeout-2。函数A在setTimeout回调函数之前执行，但函数B却在setTimeout回调后，最后执行。这是因为setImmediate总是将事件注册到下一轮Event Loop，所以，函数A和setTimeout回调一起执行，而函数B在下一轮Loop执行。



由此，process.nextTick和setImmediate的一个重要区别就是，多个process.nextTick语句总是在当前执行栈一次执行完，多个setImmediate可能需要多个loop才能执行完。



但这也是添加setImmediate方法的原因，如果像下面这样总也执行不完

```
process.nextTick(function foo() {
  process.nextTick(foo);
});
```

---

参考学习链接：

[动图学 JavaScript 之：事件循环（Event Loop）](https://savokiss.com/tech/js-visualized-event-loop.html)

[阮一峰](https://www.ruanyifeng.com/) [JavaScript 运行机制详解：再谈Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

[微任务、宏任务与Event-Loop](https://juejin.cn/post/6844903657264136200)

