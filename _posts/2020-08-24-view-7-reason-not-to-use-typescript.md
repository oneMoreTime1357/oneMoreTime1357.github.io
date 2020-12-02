---
layout:     post
title:      View：7个不使用typescript的好理由
tags:
    - View
    - TypeScript
---

每个人都喜欢TypeScript，它解决了JS的好多问题，它是JS的超集，它使代码不容易出错并易于阅读。有很多很好的理由使用TypeScript。但作者要给出7个理由不使用TypeScript。我们听听他怎么说。

### 使用它是有风险的

TypeScript添加了类型检测在编译时检查它们，为什么还会有风险呢？Typescript只在编译时检查类型，并且只检查可用的类型。任何网络调用、系统库、特定于平台的API和非类型化的第三方库都无法与TypeScript通信。当你习惯于检查类型并且不需要完全理解代码和平台时，错误和bug就会显现出来。

使用JS不需要对类型进行任何假设，而是检查变量的具体值，确保它就是期望的值。如果在这种情况下不需要关心它的类型就不需要关心。在TS中，依赖编译来完成，它只能检查那么多。你可以把这两者结合起来，但是那又有什么意义呢？如果将花费时间编写定义，然后花费时间编写代码以确保在运行时维护这些定义，那么首先为什么使用它们呢？

### 混乱

原本应该为代码库带来清晰度和可读性的语言反而模糊了。
作者举了几个例子

```js
// TODO: do this more elegantly
;((currentReducer as unknown) as Reducer<
  NewState,
  NewActions
>) = nextReducer
```

Redux库中的代码，所有这四行都是将nextReducer分配给currentReducer

```js
// HACK: Since TypeScript inherits static properties too, we have to
// fight against TypeScript here so Subject can have a different static create signature
/**
 * Creates a new cold Observable by calling the Observable constructor
 * @static true
 * @owner Observable
 * @method create
 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
 * @return {Observable} a new cold observable
 * @nocollapse
 * @deprecated use new Observable() instead
 */
static create: Function = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
  return new Observable<T>(subscribe);
}
```

这个例子来自RxJS库。如果不得不和一个能帮助我的工具作斗争，我不认为这是一个好工具。

### 它并不能解决问题

TypeScript据说可以解决JavaScript的问题。但并不是这样的。动态类型在JavaScript中从来都不是一个问题，但是有许多其他的问题。例如 NaN === NaN 是false，分号是可选的或者不是可选的，换行符把对象定义变成了作用域，用语法糖代替OOP确实是问题。

TypeScript没有解决这些问题，但是引入了另一个标准，进一步分化了JS社区。

### 它不是一个超集，而是一个子集
TypeScript最终编译成JavaScript，它不可能是JS的超集。它限制了你使用JavaScript所能做的事情，模糊了JavaScript强大的一面。如果你真的想成为一个伟大的开发人员，不要满足于一个令人欣慰的谎言，试着去理解JavaScript真正的力量和灵活性。

### 它是开源的，但仅此而已...

使用TS的原因是因为它是开源的。的确，TS编译器是在MIT许可下发布的。但是它仍然被微软控制，它的开源进步只不过是一种营销手段。不要把开源和民主混为一谈：微软仍然可以对TS做任何你想做的事情，而你只是在这里观看。另外，JS是由一个国际委员会管理的，没有社区的批准不会改变任何事情。

### 大公司使用它

我不能相信有些人认为这是一个原因。大公司还使用遗留代码库，进行税务欺诈，歧视女性。为什么突然之间他们使用TypeScript就是一个很好的例子了。

### 它有更多的功能

现在并不是了。当在2012年第一次引入TS时，它有很多新特性JS中没有的，例如类。但是从那时起JS有了很大的进步，现在TS正在努力跟上。如果JS中缺少了什么，那么有一个babel plugin就可以做到。

--- 

曾经我也是TS的积极拥护者，有时候我们想要用TS也仅仅是想要尝试使用新技术，或者给自己增加一个新技能。通过作者的这篇文章，提供了一种观点，希望可以客观的看待TS，到底需不需要使用，还需要多多考虑清楚。

原文链接：
[7 really good reasons not to use TypeScript](https://medium.com/javascript-in-plain-english/7-really-good-reasons-not-to-use-typescript-166af597c466)