---
layout:     post
title:      不花一分钱，创建自己的网站之VuePress
tags:
    - Vue
---

VuePress 官方地址

打开首页点击快速上手，会有介绍VuePress，大家可以自行查看了解。

### 快速上手

开始快速的创建自己的网站吧。

按照官网给出的命令执行，如下：

```shell
# 安装
yarn global add vuepress # 或者：npm install -g vuepress

# 创建项目目录
mkdir vuepress-starter && cd vuepress-starter

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

不太清楚是什么原因导致的，这样执行完成之后，我只得到一个空白页面，build后一堆错误的提示在terminal上，如下：

```shell
...
Error: /Users/tal/.config/yarn/global/node_modules/@vuepress/theme-default/components/DropdownLink.vue:156:15
   152|       vertical-align middle
   153|       margin-top -1px
   154|       margin-left 0.4rem
   155|   .mobile-dropdown-title
   156|     @extends .dropdown-title
----------------------^
   157|     display none
   158|     font-weight 600
   159|     font-size inherit
   
Failed to @extend ".dropdown-title"
...

# 挑了个主要的放上
```


这应该是在项目上找不到相应的组件报错了。
看了网上也找不到什么解决办法，那就使用第二种方式吧，第二种直接在项目上安装，对我来说是可用的。
先创建目录层级

```shell
# 创建项目文件夹
mkdir onepress
cd onepress
# 初始化
yarn init -y
#package.json已初始化好
# 文档路径
mkdir docs
cd docs
# 创建.vuepress目录，存放vuepress配置
mkdir .vuepress
cd .vuepress
touch config.js
mkdir public
```

好了，到这里创建了项目基本的目录层级。

```shell
onepress
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
```

在项目中安装vuepress

```shell
yarn add -D vuepress
```

在package.json中添加如下脚本

```shell
"scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
```

然后启动项目执行如下就可以写作了，不过由于什么都没有配置会得到一个默认的空白404页面

```shell
yarn dev # 或者：npm run dev
```

要生成静态的HTML文件，运行

```shell
yarn build # 或者：npm run build
```

### 配置.vuepress的config.js

在这里可以配置整个网站的布局及样式，参考官网指示配置

```shell
module.exports = {
  title: 'onepress 小站',
  description: 'just playing around'
}
```

其他具体细节可以参考官网提示，需要什么就把什么配置加入到config.js中就行。
可以查看我创建的小站[onepress GitHub](https://github.com/oneMoreTime1357/onepress)

### 部署

由于我使用的是GitHub pages访问查看，直接参考官网部署配置，发布到 gh-pages 这个分支就可以了。

可以参考[我的部署文件](https://github.com/oneMoreTime1357/onepress/blob/master/deploy.sh)

执行完部署脚本之后，就可以发现远程分支多了一个 `gh-pages` 这个分支，有了这个分支就可以通过GitHub pages的域名后面拼上这个仓库名称，访问到这个文档的界面了。

如:[http://yikeshu.me/onepress/](http://yikeshu.me/onepress/)
我这里是使用了自定义域名，如果你直接只用GitHub pages的域名，那直接在域名后面拼上仓库名称就可以访问了。如：https://<USERNAME>.github.io/<REPO>