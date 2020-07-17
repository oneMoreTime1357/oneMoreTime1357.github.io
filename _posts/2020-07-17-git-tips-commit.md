---
layout:     post
title:      Git tips： Git commit -m多行提交
date:  2020-7-17
tags:
    - 笔记
    - Git tips
---

当使用命令行Git commit 提交代码时，大部分如下，提交一行信息。
```shell
git commit -m 'This is commit message'
```
那如果要提交多行呢，可以这个样子
```shell
git commit -m 'commit title' -m 'commit description'
```
第一个是commit的标题，第二个commit是描述。[Git 文档](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--mltmsggt)描述如下
> 如果添加多个 -m 信息，Git可以将其分段连接起来。

示例：

```shell
git commit -m 'commit title' -m 'commit description' -m 'descript more'

# git log 输出如下
Date:   Fri Jul 17 14:24:52 2020 +0800
    commit title
    
    commit description
    
    descript more
```


**参考链接：**

[git commit accepts several message flags (-m) to allow multiline commits](https://www.stefanjudis.com/today-i-learned/git-commit-accepts-several-message-flags-m-to-allow-multiline-commits/)