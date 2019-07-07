---
layout:     post
title:      Splice, Slice, Split傻傻分不清楚[读译]
tags:
    - JS
    - 笔记
    - 读译
---

读[JavaScript Splice,Slice,Split](https://medium.com/@jeanpan/javascript-splice-slice-split-745b1c1c05d2)

咋一看这三个长的都差不多，都以S开头，我也是有时对这三个属性有点犯迷糊，总是记不清，不知道在什么情况下该用哪个，今天就跟着这篇文章，好好的理解理解。

![pizza](https://cdn-images-1.medium.com/max/1600/1*M61AUDeeywWsdfDFP4yJHg.png)

作者举了一个生动的例子，使用这三个属性简单的去分割pizza。首先把这一个pizza分成十份，每一份对应1，2，3……到10。首先使用的是**splice**它可以增加或移除一块pizza，例如`splice(1,1)`执行完成之后就把第二块pizza移除掉了，所以pizza少了一块。**slice**可以选中需要的pizza，但它首先将原pizza复制一份，然后从新的pizza上选取需要的，比如执行`slice(2,3)`实际上我们得到的是第二块pizza。最后**split**，它的功能就是使用特殊符号分割pizza，比如使用香肠再次分割pizza。

## Splice

`splice()`是数组Array中的方法

```js
Array.prototype.splice()
```

`splice()`方法会改变原数组，可以移除元素或者添加新的元素

```js
array.splice(start, [deleteCount], [item1], [item2])
```


```js
var example = ['A', 'B', 'C', 'D'];

example.splice(2, 0, 'E');       
// 移除0个元素，添加 'E' 在index 2的位置

console.log(example);
// ["A", "B", "E", "C", "D"]

var copy = example.splice(2, 1); 
// 移除一个元素，在index 2的位置，返回删除的元素

console.log(copy);
// ["E"]
console.log(example);
// ["A", "B", "C", "D"]

var copy2 = example.splice(2, 0, 'E');

console.log(copy2);
// [] 添加元素返回空数组
console.log(example);
```

例如：删除元素 `shift()`和`splice()`相似

```js
function shiftArray(arr) {
  // remove 1 item at 0-index position, return the deleted item 
  return arr.splice(0, 1); 
}

var a = [1, 2, 3];

var b = a.shift();

console.log(a); // [2, 3]

console.log(b); // 1

var c = shiftArray(a);

console.log(a); // [3]

console.log(c); // [2]
```

## Slice

`slice()`是数组对象和字符串对象中的方法，两种类型都可以用。它不改变原数组，返回一个新的拷贝对象。

```js
Array.prototype.slice()
```

`slice()`返回的是数组的浅拷贝，选取数组的一部分从bengin到end（不包含end）。不会改变原数组。

```js
String.prototype.slice()
```

`slice()`方法，选取字符串的一部分，返回新的字符串

```js
array.slice(begin, end)

string.slice(begin, end)
```

### begin参数

* `undefined`: 从0开始选取
* `>=0`: 从0索引开始算，在索引的位置开始
* `< 0`: 从结束位置开始

### end参数

* `undefined`: 到结束的位置
* `>=0`: 从0索引开始算，到此索引前为止（不包含此索引）
* `< 0`: 从结束位置开始

```js
var arr = ['A', 'B', 'C', 'D'];

var a = arr.slice();        // 没有传参，开始位置为Undefined，选取的是整个数组的长度
console.log(a);
// ["A", "B", "C", "D"]
var b = arr.slice(-1);      // 开始位置传递的是负数，从数组的最后位置开始算

console.log(b);
// ["D"]
var c = arr.slice(0, -1);   // 开始位置传的是0，结束位置传的是负数，结束位置从数组的最后位置开始数，
console.log(c)
// ["A", "B", "C"]
```

例如：转换数组为一个新数组

```js
function convert2Array() {
  return Array.prototype.slice.call(arguments);
}

var arr = convert2Array(1, 2, 3); 

console.log(arr)
// [1, 2, 3]
```

示例：

```js
var a = ['A', 'B', 'C', 'D'];

var slicedArr = a.slice(1, 3);  // slice starts from 1-index to 3-index, but not include 3-index : ['B', 'C']

console.log(a)
// ["A", "B", "C", "D"]         // slice doesn't change the input
console.log(slicedArr)
// ["B", "C"]
var b = 'ABCD'

var slicedStr = b.slice(1, 3);  // slice process the slice as the array

console.log(b)
// "ABCD"
console.log(slicedStr)
// "BC"
```


## Split

`split()`是字符串中的方法，将字符串分割为新的数组

```js
String.prototype.split()
```

`split()`方法可以接收分隔符，将字符串使用分隔符分割为数组

```js
string.split([separator[, limit]])
```

示例：

```js
var string = 'Hello World. How are you doing?';

var splits = string.split(' ', 3);    // 使用空格进行分割，第二个参数是告诉它分割的次数，并返回前三个分割的数据

console.log(splits)
// ["Hello", "World.", "How"]
var splits = string.split(' ')

console.log(splits)
// ["Hello", "World.", "How", "are", "you", "doing?"]
```

检查是否是回文

```js
var str = "abcba";

function isPalindrome(str) {
  // split the string to array, reverse the array, then join the array with ''
  return str === str.split('').reverse().join(''); 
}

isPalindrome(str); // return true
```

## 总结

最重要的是总结，一目了然，好记



|  | Splice | Slice | Split |
| --- | --- | --- | --- |
| Array.prototype | Y | Y | Y |
| String.prototype |  | Y | Y |
| 改变原数组 | Y |  |  |
| 创建新数组 |  | Y | Y |
| 返回值 | 返回一个数组，包含删除的元素 | 返回一个选中的元素，数组类型 | 被分割的字符串，作为一个数组返回 |

* splice在添加或删除数组中的元素时，会改变原数组
* slice 选取数组中的元素时，不会改变原数组
* split 不改变原字符串

---
看完文章觉得自己大致了解了，但还是想要记录下来，加深印象。全文也不是完全的翻译，核心还是依赖作者的思想，边读边译也有一些自己的理解，要点已列出，如果想要充分理解，还是要读原文，获得的是作者的第一手信息。

原文链接： [JavaScript Splice,Slice,Split](https://medium.com/@jeanpan/javascript-splice-slice-split-745b1c1c05d2)