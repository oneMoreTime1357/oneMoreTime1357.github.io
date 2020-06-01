---
layout:     post
title:      由修改路由懒加载引起的
tags:
    - Vue
    - 笔记
---

### 项目背景
项目环境：

* vue cli2
* vue2.x
* babel6
* webpack3

项目是很早之前搭建的了，页面和体积越来越多，影响页面加载速度，这次准备做个全面的路由懒加载优化。

路由懒加载可以将项目中路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，提高页面的访问速度。主要用到了Vue异步组件，和webpack的代码分割功能实现。

改写和实现方式，可以参考[Vue router官方给出的示例](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)

```js
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})

// 或者组块的方式
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
```
### 遇到问题
按照官网给出的懒加载方式替换之后并不能顺利生效，报什么错误不太记得了，也忘了截图，如果你没遇到什么问题，那就忽略吧。

又仔细看了一遍官网介绍，如果项目使用的是Babel需要添加`syntax-dynamic-import`插件，才能使babel可以正确地解析语法。

那开始安装插件
```shell
yarn add @babel/plugin-syntax-dynamic-import -D
```
在.babelrc添加如下
```shell
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

添加完成，运行项目，又报错了，这次不是报项目路由的问题，而是babel，大概是引入了新的插件，需要依赖高版本的Babel才行，报错如下，需要安装@babel/core

```shell
Error: Requires Babel "^7.0.0-0", but was loaded with "6.26.0". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version.
```

当前项目babel是6，看来需要升级到babel7了，看了一下babel6到babel7的改动，变动算是比较大的，项目安装名称都改为`@babel/`替换之前的`babel-`，那意味着所有依赖babel的都需要看看是否需要更新。

### 升级Babel7
项目依赖中的babel，还是比较多的。更新之前，如下是项目中用到的babel及插件：
![4b291b7b5ff5794fc9228996d9e895bc.png](https://cdn.nlark.com/yuque/0/2020/png/385711/1591024194041-d162d1a7-5064-4322-a19a-5dc58c1b9d99.png)

1、首先卸载`babel-core`，安装新的`@babel/core`

```shell
yarn remove babel-core
yarn add @babel/core -D
```

2、更新babel-preset-env
```shell
yarn remove babel-preset-env
yarn add @babel/preset-env
```
同步配置`.babelrc`，更新之前的配置
```shell
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": 10
        }
      }
    ]
  ]
}
```
现在运行还是报错的，任重而道远

3、preset-stage-x在babel7也弃用了，需要删掉项目中用到的`babel-preset-stage-2`。看项目中完全没有用到jsx，引入jsx的插件完全没有什么用，所以也一并移除
4、升级babel-loader，babel7依赖babel-loader 8.x

调整完之后

![d4804e167f666442cd3c28855fb652ee.png](https://cdn.nlark.com/yuque/0/2020/png/385711/1591024281827-86737686-0f67-4fb2-bd13-dc6c769a3b91.png)

遇到问题解决问题，直到运行正确没问题为止。

### 小结
项目优化，任何小的改动都可能会引起项目的问题，所以在实施某个方案之前要做充足的评估，改动影响的范围，之后需要做相应的测试验证。

看似一个简单的修改路由懒加载，然后引起升级babel，升级babel会不会对项目的其他地方有影响，影响范围是哪些，这些都是在决定升不升级需要考虑的。这是整个项目的事情，并不是一个简单的个人项目想怎么改就怎么改。在决定升级babel之前我也对这两个版本做了调研，虽然文件名称和配置变动比较大，但基于现有项目用的功能，babel7也都有相应的解决方法，而且更优，只要基于现有项目的功能配置，升级之后也做相应的配置，就不会产生大的影响，so那就升级吧，新版本会带来新的不一样的体验。


---
相关链接：

[vue router路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)

[Npm babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/)

[babel-plugin-syntax-dynamic-import链接](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/)

[babel官网升级7的变动](https://babeljs.io/docs/en/v7-migration)
[升级到Babel7不完全指南](https://github.com/chenxiaochun/blog/issues/61)
[Polyfill 方案的过去、现在和未来](https://github.com/sorrycc/blog/issues/80)
[babel7升级实践](https://blog.hhking.cn/2019/04/02/babel-v7-update/)
