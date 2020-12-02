---
layout:     post
title:      View:JavaScript函数的秘密
tags:
    - JS
    - View
---

View:《Functions in JavaScript Have More Secrets Than You Think》

读完本篇文章你将了解
* 纯函数
* 高阶函数
* 函数缓存
* 懒函数
* 函数柯里化
* 函数组件

## 纯函数（Pure Function）
什么是纯函数？

一个函数包含如下两种情况叫纯函数：
* 如果传相同的参数，总是返回相同的结果；
* 在执行函数时，没有副作用（side effect）

**例1**
```js
function circleArea(radius){
  return radius * radius * 3.14
}
```

当半径相同时，函数总是返回相同的结果。函数的执行对函数的外部没有影响，这是一个纯函数。

**例2**

```js
let counter = (function(){
  let initValue = 0
  return function(){
    initValue++;
    return initValue
  }
})()
```

这个计数器函数每次运行返回的结果都不同，所以不是一个纯函数。

![counter function](https://cdn.nlark.com/yuque/0/2020/png/385711/1605696636402-77663e14-9c05-48c8-8fbf-5b270de56516.png?x-oss-process=image%2Fresize%2Cw_600)

**例3**

```js
let femaleCounter = 0;
let maleCounter = 0;
function isMale(user){
  if(user.sex = 'man'){
    maleCounter++;
    return true
  }
  return false
}
```

在上面的例子中，给函数 `isMale` 传相同的参数，总是会得到相同的结果，但是它有副作用（side effects）,副作用是更改全局变量 `maleCounter` 的值，因此它不是纯函数。

**纯函数有什么作用？**

为什么我们要区分纯函数和其他函数？因为纯函数有许多优点，所以我们可以在编程过程中使用春寒锁来提高代码的质量。
1. 纯函数要清晰的多，也更容易阅读。
a. 每个纯函数总是完成一个特定的任务，并有一个精确的结果。这将大大提高代码的可读性，并使编写文档更加容易。
2. 编译器可以对纯函数进行更多的优化。
a. 假设我们有如下这样一个代码片段：

```js
for (int i = 0; i < 1000; i++){
    console.log(fun(10));
}
```

如果fun 不是一个纯函数，那么 fun(10)在运行这段代码时需要执行1000次。

如果fun是一个纯函数，编辑器将能够在编译时优化。优化后的代码可能是这样的：

```js
let result = fun(10)
for (int i = 0; i < 1000; i++){
    console.log(result);
}
```

3. 纯函数更容易测试

a. 纯函数的测试不需要依赖于上下文。当我们为纯函数编写单元测试时，我们只需要给出一个输入值并断言函数的输出满足我们的要求

一个简单的例子：一个纯函数接受一个数字数组作为参数，并将数组的每个元素增加1。

```js
const incrementNumbers = function(numbers){
  // ...
}
```

我们只需要这样编写它的单元测试：

```js
let list = [1, 2, 3, 4, 5];
assert.equals(incrementNumbers(list), [2, 3, 4, 5, 6])
```

如果它不是一个纯函数，我们需要考虑很多外部因素，这不是一个简单的任务。

## 高阶函数（Higher-Order Function）
什么是高阶函数？

高阶函数是一个函数，有如下特点：
* 将一个或多个函数作为参数
* 返回一个函数作为其结果

使用高阶函数可以增加代码的灵活性，使我们可以编写更简洁和高效的代码。

假设我们现在有一个整数数组，我们想要创建一个新的数组。新数组的元素具有与原始数组相同的长度，并且相应元素的值是原始数组值的两倍。

如果不使用高阶函数，我们可以这样写：

```js
const arr1 = [1, 2, 3];
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
}
```

在JavaScript中，数组有一个 `map()` 方法。

> The map(callback) method creates a new array populated with the results of calling a provided function on every element in the calling array.

```js
const arr1 = [1, 2, 3];
const arr2 = arr1.map(function(item) {
  return item * 2;
});
console.log(arr2);
```

`map` 函数是一个高阶函数。

正确使用高阶函数可以提高代码的质量。接下来的部分都是关于高阶函数的，所以继续。

## 函数缓存（Function Caching）

假设我们有一个这样的纯函数：

```js
function computed(str) {    
    // Suppose the calculation in the funtion is very time consuming        
    console.log('2000s have passed')
      
    // Suppose it is the result of the function
    return 'a result'
}
```

为了提高程序的速度，我们需要缓存函数操作的结果。当之后调用时，如果参数相同，将不再执行该函数，但可以直接返回缓存中的结果。我们要怎么做？

我们可以编写一个 `catch` 函数来包装我们的目标函数。这个缓存函数将目标函数作为参数，并返回一个新的包装函数。在 `catch` 函数的内部，我们可以使用 `Object` 或`Map`缓存前一个函数调用的结果。
例子如下：

![缓存函数](https://cdn.nlark.com/yuque/0/2020/png/385711/1605841019495-d918d0c3-6a2f-4dc1-a021-1be1c33ab2b7.png)

## 懒函数（Lazy Function）

函数体通常包含一些条件语句，有时这些语句只需执行一次。

我们可以通过在第一次执行之后“删除”这些语句来提高性能，这样改函数就不需要在随后的执行中执行这些语句。这就是懒函数。

例如：我们现在需要编写一个名为foo的函数，它总是返回第一次调用的Date对象，注意“第一次调用”。

```js
let fooFirstExecutedDate = null;
function foo() {
    if ( fooFirstExecutedDate != null) {
      return fooFirstExecutedDate;
    } else {
      fooFirstExecutedDate = new Date()
      return fooFirstExecutedDate;
    }
}
```

每次运行上述函数时，都需要执行判断语句。如果这个判断条件非常复杂，那么它将导致我们程序的性能下降。现在，我们可以使用懒函数技术来优化这段代码。

我们可以这样写

```js
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
}
```

在第一次执行之后，我们用新函数覆盖原始函数。当这个函数在将来被执行时，判断陈述将不再被执行。这样写会提高我们代码的性能。

然后我们看一些更实际的例子。

当我们在元素中添加DOM事件时，未来与现代浏览器和IE浏览器兼容，我们需要对浏览器环境做出判断：

```js
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}
```

每次我们调用 `addEvent` 函数，我们都必须做出判断。使用懒函数，我们可以这样做：

```js
function addEvent (type, el, fn) {
  if (window.addEventListener) {
      addEvent = function (type, el, fn) {
          el.addEventListener(type, fn, false);
      }
  } else if(window.attachEvent){
      addEvent = function (type, el, fn) {
          el.attachEvent('on' + type, fn);
      }
  }
  return addEvent(type, el, fn)
}
```

总之，如果一个函数中有一个条件判断，只需要执行一次，那么我们可以用懒函数来优化它。特别是，在做出第一个判断之后，原来的函数被新的函数覆盖，新的函数删除了条件判断。

## 函数柯里化（Function Curring）

柯里化是一种用多个参数计算函数的技术，用一个参数计算一系列函数。
换句话说，当一个函数，不是一次接受所有的参数，而是接受第一个参数，然后返回一个接受第二个参数的新函数，然后返回一个接受第三个参数的新函数，依此类推，直到所有的参数都完成。

它有什么用呢？

* 柯里化可以帮助你避免一次又一次地传递同一个变量
* 它有助于创建一个高阶函数，在事件处理方面非常有帮助
* 小件可以配置和轻松重复使用

让我们来看一个简单的 `add` 函数。它接受三个操作数作为参数，并返回所有三个操作数的和。

```js
function add(a,b,c){
  return a + b + c;
}
```

当我们传少于三个参数，或者多于三个参数来调用它，结果如下：

```js
add(1,2,3) --> 6 
add(1,2) --> NaN
add(1,2,3,4) --> 6 //Extra parameters will be ignored.
```

那如何转换成柯里化函数呢？

上代码

![柯里化函数](https://cdn.nlark.com/yuque/0/2020/png/385711/1605872116663-9119731d-66b9-4bdb-9645-e7e419c2bff1.png)

## 函数组合（Function Compose）

如我们需要写一个函数实现如下需求

> Input ‘bitfish’, return ‘HELLO, BITFISH’.

如你所看到的，这个函数有两个部分：
* 串联字符串
* 将字符串转换为大写

所以可以这样写

```js
let toUpperCase = function(x) { 
  return x.toUpperCase(); 
};

let hello = function(x) { 
  return 'HELLO, ' + x; 
};
let greet = function(x){
  return hello(toUpperCase(x));
};
```

这个例子有两个步骤，所以greet函数看起来并不复杂。如果有更多的操作，greet函数将需要更多的嵌套，类似这样的写 `fn3(fn2(fn1(fn0(x)))) `

所以我们可以编写一个 `compose` 函数专门用于编写组合函数：

```js
let compose = function(f,g) {
    return function(x) {
        return f(g(x));
    };
};
```

因此 `greet` 函数可以用 `compose` 函数来组合：

```js
let greet = compose(hello, toUpperCase);
greet('kevin');
```

使用 `compose` 函数将两个函数组合成一个函数，可以使代码从右向左运行，而不是从内向外运行，从而使代码更具可读性。

但是现在的 `compose` 函数只能支持两个参数，我们真的希望函数可以接受任意数量的参数。

在大家所知的开源项目underscore中已经实现了composer函数

```js
function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};
```

通过函数组合，我们可以优化函数直接的逻辑关系，提高代码的可读性，并促进未来的扩展和重构。

原文链接:
<a href="https://medium.com/javascript-in-plain-english/function-in-javascript-has-much-more-secrets-than-you-think-b3bf64055c99" target="_blank">Functions in JavaScript Have More Secrets Than You Think</a>