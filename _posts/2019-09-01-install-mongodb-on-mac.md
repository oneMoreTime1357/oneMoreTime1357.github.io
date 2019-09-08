---
layout:     post
title:      Mac安装MongoDB[读译]
tags:
    - MongoDB
    - 笔记
    - 读译
    - Review
---

这两天在新电脑上安装MongoDB，竟然忘了是怎么安装的了，以下是按照这一篇文章的安装教程，简单的翻译了一下。[翻译原文 Installing MongoDB on a Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

## 什么是MongoDB

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。属于[NoSQL](https://www.mongodb.org.cn/tutorial/2.html)数据库系列，NoSQL指的是不仅仅是SQL.

## 前期准备

* **Mac 终端（Terminal**比较推荐使用iTem2，将使用这个终端安装MongoDB
* [Homebrew](https://brew.sh/index_zh-tw)。安装MongoDB的时候有一种方式会使用到。Homebrew是Mac电脑包管理工具，

## 安装概览
有两种方式在Mac上安装MongoDB，最好的一种方式是使用`Homebrew`进行安装，另一种方式是到[MongoDB官网](https://www.mongodb.com/download-center/community)上下载安装包，以下就介绍两种安装方式

### 使用Homebrew安装MongoDB

* 打开Terminal(控制台)输入`brew update`，首先更新homebrew
* 待homebrew更新完成后，输入`brew install mongodb`
* 等到Mongo下载完成。创建一个“db”的文件夹，是用来存放Mongo 数据，可以在默认路径进行安装，直接输入`mkdir -p /data/db`，可能会遇到权限的问题提示没有权限执行，那直接在这个命令前加上sudo，如`sudo mkdir -p /data/db`
* 对这个`/data/db`添加写权限，执行如下

```shell
> sudo chown -R `id -un` /data/db
> # 输入密码
```

* 以上操作完成之后，执行输入 `mongod` 启动Mongo 服务
* 执行Mongo脚本，再重新打开一个terminal窗口，输入`mongo`执行，这个命令会执行一个Mongo 脚本启动MongoDB程序用于接收数据
* 在Mongo脚本窗口执行`quit()`退出程序
* 停止Mongo后台程序执行`ctrl-c`

### 手动安装和运行MonngoDB

* 去[MongoDB官网](https://www.mongodb.com/download-center/community)下载正确版本的MongoDB
* 下载完成之后，将安装包移动到你想要安装Mongo的位置，一般是在Home主文件夹下安装

```shell
> cd Downloads
> my mongodb-osx-x86_64-3.0.7.tgz ~/
```

* 从下载的存档中提取MongoDB，并将目录名称更改为更友好的名称：` > cd ~/ > tar -zxvf mongodb-osx-x86_64-3.0.7.tgz > mv mongodb-osx-x86_64-3.0.7 mongodb`
* 创建Mongo存放数据的文件夹。创建`db`文件夹，可以在主文件夹下执行如下命令`mkdir -p /data/db`
* 确保`/data/db`文件夹有正确的写权限

```shell
> sudo chown -R `id -un` /data/db
> # Enter your password
```

* 启动Mongo的进程，在terminal中执行`~/mongodb/binn/mongod`.这样就会启动Mongo服务
* 执行Mongo 脚本，在另一个terminal中执行`~/mongodb/bin/mongo`。这将会启动一个程序接受Mongo 数据。
* 在Mongo脚本窗口执行`quit()`退出程序
* 停止Mongo后台程序执行`ctrl-c`


扩展链接：

[MongoDB tutorial](https://www.mongodb.org.cn/tutorial/2.html)

[MongoDB 可视化工具 Robo 3T](https://robomongo.org/download)