---
layout:     post
title:      View：如何检测JavaScript对象是否为空
tags:
    - View
    - JS
---

挺有意思的一篇文章。平时在工作中如果判断一个字符串或者数字是否为空，直接使用 if 就可以了，那如果要判断一个对象呢？使用 if 不管是不是空对象总会判断为true。

---

这里有一份代码菜单去检测 `object` 是否为空。针对新的浏览器，你可以使用原生的JS使用 `Object.keys` ，但是针对旧的浏览器，你可以安装Lodash库的 `isEmpty` 来检测。

```js
const empty = {};
/* -------------------------
  Plain JS for Newer Browser
----------------------------*/
Object.keys(empty).length === 0 && empty.constructor === Object
// true
/* -------------------------
  Lodash for Older Browser
----------------------------*/
_.isEmpty(empty)
// true
```

### 什么是Vanilla JavaScript
vanilla：中文可以翻译成香草味，vanilla JavaScript就是香草味的JavaScript，也可以说普通的JavaScript。

vanilla JavaScript不是一个新的框架或库，它仅仅是原生的js没有使用Lodash或者jQuery这样的库。

### A.使用浏览器新特性检测是否为空对象

我们可以使用 `Object.keys` 方法去检测是否为空对象
```js
const empty = {};
Object.keys(empty).length === 0 && empty.constructor === Object;
```

#### 为什么需要额外使用 constructor 来检测

你可能会好奇为什么需要 `constructor` 来检查呢？是为了覆盖到一些包装类型。在JavaScript中有9种构造器

```js
new Object();
new String();
new Number();
new Boolean();
new Array();
new RegExp();
new Function();
new Date();
```

我们先使用 `new Object()` 创建一个空对象。提示：你不应该使用构造器创建对象。考虑到不好的练习，请看[Airbnb Style Guide](https://github.com/airbnb/javascript#objects--no-new)和[ESLint](https://eslint.org/docs/2.0.0/rules/no-new-wrappers)

```js
const obj = new Object();
Object.keys(obj).length === 0; // 
```

当对象是空的时候使用 `Object.keys` 判断返回的是true。但是如果我们使用其他的构造器创建对象，会得到什么呢？

```js
function badEmptyCheck(value) {
  return Object.keys(value).length === 0;
}
badEmptyCheck(new String());    // true 😱
badEmptyCheck(new Number());    // true 😱
badEmptyCheck(new Boolean());   // true 😱
badEmptyCheck(new Array());     // true 😱
badEmptyCheck(new RegExp());    // true 😱
badEmptyCheck(new Function());  // true 😱
badEmptyCheck(new Date());      // true 😱
```

得到的是true
使用 constructor 检查

```js
function goodEmptyCheck(value) {
  Object.keys(value).length === 0
    && value.constructor === Object; // 👈 constructor check
}
goodEmptyCheck(new String());   // false ✅
goodEmptyCheck(new Number());   // false ✅
goodEmptyCheck(new Boolean());  // false ✅
goodEmptyCheck(new Array());    // false ✅
goodEmptyCheck(new RegExp());   // false ✅
goodEmptyCheck(new Function()); // false ✅
goodEmptyCheck(new Date());     // false ✅
```

Beautiful!我们覆盖了所有case
使用其他数据来检测
我们再测试几组数据来检查我们的方法是否可行

```js
function isEmptyObject(value) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}
```

如下方，返回的是我们期待的结果

```js
isEmptyObject(100)  // false
isEmptyObject(true) // false
isEmptyObject([])   // false
```

注意，这些数据会报错

```js
// TypeError: Cannot covert undefined or null ot object
goodEmptyCheck(undefined)
goodEmptyCheck(null)
```

#### 提升检查容错null、undefined

如果不想抛出错误 `TypeError` ，你可以添加额外的检查：

```js
let value;
value // 👈 null and undefined check
 && Object.keys(value).length === 0 && value.constructor === Object;
value = null;       // null
value = undefined;  // undefined
```

### B.低版本浏览器检查空对象
如果你需要兼容低版本浏览器。头疼，当我们在说低版本浏览器的时候，是指IE浏览器，好吧，我们还有两个选择可以解决这个问题。我们可以使用vanilla或者使用库。
使用原生JavaScript检查空对象
使用原生js不是很简介，但是也可以用

```js
function isObjectEmpty(value) {
  return Object.prototype.toString.call(value) === "[object Object]" && JSON.stringify(value) === "{}"
}
```

检测对象会返回空

```js
isObjectEmpty({});           // true ✅
isObjectEmpty(new Object()); // true ✅
// 完美，针对构造器对象也可以正确检测
isObjectEmpty(new String());   // false ✅
isObjectEmpty(new Number());   // false ✅
isObjectEmpty(new Boolean());  // false ✅
isObjectEmpty(new Array());    // false ✅
isObjectEmpty(new RegExp());   // false ✅
isObjectEmpty(new Function()); // false ✅
isObjectEmpty(new Date());     // false ✅
// 针对 null 和 undefined 呢，也可以返回false，而不是报错
isObjectEmpty(null);      // false
isObjectEmpty(undefined); // false
```

#### 引用第三方库来检查空对象
有很多的库都可以支持检查空对象。大多数都对低版本浏览器有很好的支持

**Lodash**

```js
_.isEmpty({});
// true
```

**Underscore**

```js
_.isEmpty({});
// true
```

**jQuery**

```js
jQuery.isEmptyObject({});
// true
```

### 原生vs库

视情况而定，比起引入一些庞大的第三方库我更喜欢原生的写法。如果是小的项目，我就懒得引入第三方库。但如果你的app已经引入安装了，那就大胆的使用吧。你会发现你的app会表现的比其他的更好。视项目环境与当前的情况选择一种最适合的方式。

---

使用原生js自己写还是使用第三方库，具体问题具体分析吧。在做一些小项目的时候，引入一个庞大的第三方库我是觉得有点大材小用，当项目比较庞大复杂，可以使用第三方库来提升效率，毕竟第三方库覆盖了很多中情况兼容性比较好。

原文链接：
[How to Check if Object is Empty in JavaScript](https://medium.com/@samanthaming/how-to-check-if-object-is-empty-in-javascript-aeab2674eeb1)