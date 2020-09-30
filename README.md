欢迎来到一棵树的博客🎉🚀 http://yikeshu.me 🌲

* 🌲 本博客主要采用Jekyll，github pages生成
* ✨ 如果喜欢请点击star
* 🤩 如果想使用本博客主题，可以fork，或者拷贝到本地，记得把本博客的内容删掉，网站域名换上自己的，上传到自己的github pages就OK了😘


---

### 如何安装jekyll

请看官网[https://jekyllrb.com/docs/installation/](https://jekyllrb.com/docs/installation/)写的很详细了

**需要注意的点**

* 本人使用的是macOS Mojave 10.14.x系统
* terminal zsh item2

在使用brew安装ruby之后，要更改下ruby的引用路径，要优先使用brew安装的ruby

```shell
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile

# 如果使用的是zsh终端，需要也在zsh中添加环境路径
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

### 本地调试编译

先安装依赖包

```shell
yarn install
```

如果是第一次执行，在已经安装jekyll的前提下，安装如下依赖包
```shell
gem install jekyll-paginate
```

本地调试
```
jekyll serve 
# or
yarn run test
```

样式调试编译，本博客使用了gulp
```shell
gulp
```

---

本博客借鉴了此https://github.com/Huxpro/huxpro.github.io 博客的模板
