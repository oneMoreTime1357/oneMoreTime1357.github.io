---
layout:     post
title:      View：在vue中全局加载sass
tags:
    - 译读
    - View
    - JS
---

如何在vue中引入全局变量？
接下来我们一起探索下：

---

在CSS世界中，SASS/SCSS,LESS,PostCSS是最常见的CSS预处理器。SASS似乎是最流行的解决方案，它的功能丰富扩展的CSS语言更容易使人理解。
在Vue中多亏了 vue-loader ，只需要单个文件组件的样式标记中添加带有所需语言的 lang="scss" 属性，就可以使用这些解决方案中的任何一个：

```css
<!-- Classroom.vue -->
<style lang="scss">
$bg-classroom: #232323;
.classroom {
  background: $bg-classroom;
}
</style>
```

随着项目的增长，为了便于管理和配置，将SASS中的变量、mixin和函数，拆分成单独的文件，通过 @import 指令导入它们：

```css
/* scss/_variables.scss */
$bg-classroom: #232323;
<!-- Classroom.vue -->
<style lang="scss">
@import "./scss/_variables.scss";
.classroom {
  background: $bg-classroom;
}
</style>
```

这样拆分之后会更清晰，但问题是，我们在需要使用变量、mixin或函数的每个组件都必须导入这些文件，这将成为一个非常重要的任务，下面的这些代码将会在所有组件中重复出现：

```css
<style lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
@import "./scss/_functions.scss";
/* ... */
</style>
```

让我们看下如何解决这个问题，在 `vue-cli 3.x` 中全局加载SASS框架文件。

## 在vue-cli中加载全局SASS

在这里默认您是使用 vue-cli v3.x 创建的项目，如果没有，可以通过安装cli并运行create命令来创建它：

```shell
npm install -g vue-cli
vue create awesome-project-name
```

然后安装所需的sass依赖

```shell
npm install --save-dev node-sass sass-loader
```

`vue-cli` 允许通过在项目的根目录创建一个 `vue.config.js` 文件来修改其配置，该文件使用多个配置选项导出对象。

其中有 `css` 选项，有一个`loaderOptions`属性，我们可以使用它来更改 vue-loader 的内部配置。

可能你并不知道这个方法，我们可以使用data选项执行一些全局的CSS预处理代码，所以我们可以使用它来导入我们的CSS工具：

```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  }
};
```

**注意：** `@` 在vue-cli中指的是 `/src` 的别名

我们在 `loaderOptions` 下指定了sass加载程序。就像这样文件中的所有代码都可以在全局可用。我们可以在任何组件中使用：

```css
<style lang="scss">
.classroom {
  /* No need to import, it just works \o/ */
  background: $bg-classroom;
}
</style>
```

## 不使用vue-cli 3.x如何在项目中设置

如果不使用vue-cli 3.x，则需要调整webpack配置文件中的vue-loader选项。如下：

```js
// webpack.config.js
{
  test: /\.scss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        data: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  ]
}
```

## 注意

要确保在数据配置中导入的文件只包含不被呈现的SASS代码，比如变量、mixin和函数。否则对于最终的后期处理的css文件中的每个组件，改代码都将充分执行。

这就是 vue-loader 的执行方式：它会预先在每个组件的CSS中定义所有文件。

例如：假设你有10个组件，并且预加载了我们上面看到的文件_variables.scss，而且_variables.scss包含任何CSS规则，如：

```css
.box {
  color: $red-color;
}
```

实际上它将会包含在每个组件的CSS部分，最终得到10个重复的.box规则。

译文：https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/
