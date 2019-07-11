> A simple fullstack blog

## FrontEnd Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
node build/dev-server.js

```
## BackEnd Build Setup

``` bash
# open mongodb port 27017
mongod

# build data model in mongodb && get and splice complete data to frontend
node ./server/index.js

```
## Other Build Setup

``` bash
# autogenerate markdown file
node ./server/helper/md-auto.js

```

## 博客技术栈
* 前端
  * element-ui
  * vuex
  * vue-router
  * axios
* 后端
  * koa
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
* 404页面
* 在线写博客功能
* 评论功能
* 评论管理

## 未完成列表
* 分享功能
* 浏览统计
* 导出文章
* 浏览器兼容性
* 在线编辑存储博客

## 优先级最高
* 梳理并优化组件树逻辑，用思维导图画一个组件树

## 目录结构梳理
	* server-------------------------------------------------后端服务
		* article--------------------------------------------存储文章
		* config.js------------------------------------------配置文件
		* helper---------------------------------------------项目帮手
		* routes---------------------------------------------node路由
		* service--------------------------------------------node服务
	* src ---------------------------------------------------前端展现
		* api -----------------------------------------------切换生产环境和开发环境，数据集中获取
		* assets---------------------------------------------静态图片资源
		* components-----------------------------------------功能组件
			* blog-------------------------------------------博客组件
			* category---------------------------------------归档组件
			* comment----------------------------------------评论组件
			* common-----------------------------------------通用组件（当前只包含nav组件）
		* page-----------------------------------------------SPA
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


## FAQ
1. 依赖安装失败怎么办？
```
//设置淘宝镜像源
npm config -g set registry https://registry.npm.taobao.org
// 安装cnpm
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
// 安装依赖
cnpm install
```
2. macOS环境下mongodb启动失败怎么办？
```
brew tap mongodb/brew
brew install mongodb-community@4.0
mongod --config /usr/local/etc/mongod.conf
```

参考链接: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

## 项目预览

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

