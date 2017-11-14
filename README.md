### 首页
![博客预览图](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/newcover.png)
### 博客
![博客](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/博客.png)
### 目录
![目录](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/目录.png)
### 归档
![归档](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/归档.png)
### 标签
![标签](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/标签.png)
### 文章详情
![文章详情](https://github.com/FrankKai/sfs-blog/blob/master/src/assets/images/文章详情.png)
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

## 目录结构梳理
	* server-------------------------------------------------后端服务
		* db-data.js-----------------------------------------db初始化数据
		* koa-midware.js-------------------------------------数据中转开放api给前端
		* md-auto.js-----------------------------------------命令行式生成markdown
	* src ---------------------------------------------------前端展现
		* api -----------------------------------------------切换生产环境和开发环境，数据集中获取
		* article--------------------------------------------存放markdown文档
			* categories-------------------------------------markdown分类
		* assets---------------------------------------------静态图片资源
		* components-----------------------------------------功能组件
			* blog-------------------------------------------博客组件
			* category---------------------------------------归档组件
			* comment----------------------------------------评论组件
			* common-----------------------------------------通用组件（当前只包含nav组件）
		* demo-----------------------------------------------例子
		* page-----------------------------------------------SPA
			* article.vue------------------------------------文章详情
			* blog.vue---------------------------------------博客页
			* category.vue-----------------------------------目录页
			* home.vue---------------------------------- ----首页
			* record.vue-------------------------------------归档页
			* tag.vue------------------------------------- --标签页
		* router---------------------------------------------Router
			* index.js---------------------------------------路由转发
		* store----------------------------------------------State Management
			* action.js--------------------------------------异步请求数据
			* getters.js-------------------------------------数据过滤
			* index.js---------------------------------------创建vuex实例，传入state，getter，mutation，action。
			* mutation-types.js------------------------------定义mutation类型
			* mutation.js------------------------------------更新数据
		* App.vue--------------------------------------------页面路由父容器
		* main.js--------------------------------------------创建vue实例，挂载app，传入vue-router，vuex实例。

## 需要优化的点
1.后端接口逻辑混乱
2.前端vuex未运用getter和action
3.组件生命周期不理解