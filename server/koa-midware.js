var koa = require('koa');
var app = new koa();
var mddata = ''
var mddataarr = [[],[]]
var obj={
    title:'',
    content:'',
    birthtime:''
}
var categories = {
    name: '',
    num: 0,
    articles: []
}
var obj2 = {}

const fs = require("fs")
function a(){
//读取每个目录下的文章
    fs.readdir('../src/article/categories',(err,files)=>{
        if(err){
            throw err
        }else{
            files.forEach((v,i,arr)=>{
                // console.log(v)
                let cat = '../src/article/categories/'+ v
                // console.log(cat)
                fs.readdir(cat,(err,files)=>{
                    files.forEach((v,i,arr)=>{
                        let smd = cat + "/" + v
                        fs.readFile(smd,'utf-8',(err,data)=>{
                            if(err){
                                throw err
                            }else{
                                obj.title = v.slice(0,-3)
                                obj.content = data
                                let stat = fs.statSync(smd)
                                obj.birthtime = stat.birthtime 
                                db.collection('backendmds').updateMany({title:obj.title},{$set:{content:obj.content}})
                                db.collection('frontendmds').updateMany({title:obj.title},{$set:{content:obj.content}})
                                db.collection("backendmds").find({title:obj.title}).toArray(function(err, docs) {
                                    console.dir(docs);
                                    if(docs.length>0){
                                        obj2 = docs[0]
                                        mddataarr[0].push(obj2)
                                        obj2={}
                                    }
                                })
                                db.collection("frontendmds").find({title:obj.title}).toArray(function(err, docs) {
                                    console.dir(docs)
                                    if(docs.length>0){
                                        obj2 = docs[0]
                                        mddataarr[0].push(obj2)
                                        obj2={}
                                    }
                                })
                            }
                        })
                    })
                })
            })
        }
    })
}
//统计目录文件数目
function b(){
    fs.readdir('../src/article/categories',(err,files)=>{
        if(err){
            throw err
        }else{
            console.log(files)
            files.forEach((v,i,arr)=>{
                fs.readdir('../src/article/categories/'+v,(err,files)=>{
                    console.log(files)
                    categories.name = v
                    categories.num = files.length
                    categories.articles = files
                    mddataarr[1].push(categories)
                    db.collection('category').insertOne(categories);
                    categories = {}
                })
            })
        }
    })
// app.use(function *(){
//     this.body = mddataarr;
// });
}
a()
b()
/*跨域配置*/
var cors = require('koa-cors')
app.use(cors())

/*
**解析配置
*/
const koaBody = require('koa-body');
app.use(koaBody());

/*
**路由配置
*/
const route = require('koa-route');

/*
**路由处理post/get请求
*/
/*post提交评论*/
const comment = ctx => {
    // var result;
    data = ctx.request.body;
    /*存数据到数据库*/
    db.collection(data.category+"mds").update({name:data.mdname},{$push:{comments:data.content}})
    mddataarr[0] = []
    a()
    b()
    ctx.response.body = "评论添加成功"
  };
app.use(route.post('/comment', comment))
/*get请求博客*/
const main = ctx => {
    ctx.response.body = mddataarr;
}
app.use(route.get('/main', main))

//在线生成markdown文件
const path = require('path')
const mdDir = path.dirname(__dirname)+"\\src\\article\\online"
// let mdName = ""
const markdown = ctx => {
    let content = ctx.request.body.value
    let header = ctx.request.body.header
    fs.writeFile(mdDir+'/'+header+'.md',content,(err)=>{
        if(err) throw err;
        // console.log("自动生成markdown成功")
    })
    ctx.response.body = "md文档生成成功"
}
app.use(route.post('/markdown', markdown))

// var proxy = require('koa-proxy');
// app.use(route.get('index.js', proxy({
//     url: 'http://alicdn.com/index.js'
//   })));


// const octocat = ctx => {
//     ctx.response.body = "koa proxy success";
// }
// app.use(route.get('/octocat', octocat))
// middleware
// const proxy = require('koa-proxies')
// const httpsProxyAgent = require('https-proxy-agent')
// console.log(proxy)
// app.use(proxy('/octocat', {
//   target: 'https://api.github.com/users',    
//   changeOrigin: true,
//   agent: new httpsProxyAgent('http://1.2.3.4:88'),
//   rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/emojis'),
//   logs: true
// }))

const Router = require('koa-router')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')
var router = new Router()
router.get('/nodejs', c2k(proxy({
    target: 'https://api.github.com/users', 
    changeOrigin:true,
    // pathRewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/emojis')
    // agent: new httpsProxyAgent('http://1.2.3.4:88'),
   pathRewrite: path => path.replace(/^\/nodejs(\/|\/\w+)?$/, '/java'),
    // logs: true
})))
app.use(router.routes())

app.listen(3001); 
// console.log("markdown文件解析服务成功开启！")

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdDB',{useMongoClient: true,});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));