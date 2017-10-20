![博客预览图](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/newcover.png)
# sfs-blog

> A simple fullstack blog

## FrontEnd Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
## BackEnd Build Setup

``` bash
# open mongodb port 27017
mongod

# build data model in mongodb
node ./server/db-data.js

# get and splice complete data to frontend
node ./server/koa-midware.js

```
## Other Build Setup

``` bash
# autogenerate markdown file
npm run mkmd || node ./server/md-auto.js

```

## 博客技术栈
* 前端
  * element-ui
  * vuex
  * vue-router
  * axios
* 中间件
  * koa
* 后端
  * mongodb

## 已完成列表
* 粒子动画
* 目录下钻
* 文章归档
* 标签统计
* markdown解析
* UI界面优化
* 简陋图片功能
* 自动化生成md
* 简陋的评论功能

## 未完成列表
* 评论功能
* 评论管理
* 分享功能
* 浏览统计
* 导出文章
* 浏览器兼容性
* 在线编辑存储博客

## 优先级最高
* 梳理并优化组件树逻辑，用思维导图画一个组件树