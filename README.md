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

## 未完成列表
* UI界面优化
* 路由过渡功能
* vuex管理优化
* md信息动态存储
* 文章详情支持图片
* 评论功能
* 评论管理
* 分享功能
* 浏览统计