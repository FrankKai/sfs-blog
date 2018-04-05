var koa = require('koa');
var ObjectId = require('mongodb').ObjectID;
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
/*
** desc:读取每个目录下的文章
*/
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
                                        console.log("a",obj2)
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
/*
** desc:统计目录文件数目
*/
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
}
a()
b()
/*
** desc:跨域配置
*/
var cors = require('koa-cors')
app.use(cors())

/*
** desc:解析配置
*/
const koaBody = require('koa-body');
app.use(koaBody());

/*
** desc:路由配置
*/
// const route = require('koa-route');
// const Router = require('koa-route');
const Router = require('koa-router')
const route = new Router();
/*
** desc:路由处理post/get请求
*/

/*
** desc:post提交评论
*/
const comment = ctx => {
    data = ctx.request.body;
    data.content["article"] = data.mdname;
    console.log(ctx,ctx.request.body)
    /*
    ** desc:存数据到数据库
    */
    db.collection(data.category+"mds").update({name:data.mdname},{$push:{comments:data.content}})
    mddataarr[0] = []
    a()
    b()
    ctx.response.body = "评论添加成功"
  };
route.post('/comment', comment)

/*
** desc:get请求博客
*/
const main = ctx => {
    ctx.response.body = mddataarr;
}
route.get('/main', main)


/**
 * desc: get评论集接口
 */
const comments = ctx =>{
    let commentsArr = [];
    mddataarr[0].forEach((e,i,arr)=>{
        let id = e._id;
        let category = e.category;
        e.comments.forEach((e,i,arr)=>{
            e.id = id;
            e.category = category;
            e.index = i;
            commentsArr.push(e)
        })
    });
    ctx.response.body = commentsArr;
}
route.get('/comments',comments)


/**
 * desc: 删除一个评论
 */
const deleteOneComment = (ctx,next) =>{
    let params = ctx.request.query;
    console.log(params);
    let id = params.id;
    let category = params.category;
    let index = params.index;
    let commentItem = "comments." + index;
    
    try{
        /**
         * desc:为将要删除的数组项增添index属性
         */
        let obj = {};
        obj[commentItem] = {
            "index":index
        }
        db.collection(category+'mds').update({'_id':ObjectId(id)},{$set:obj}).then(()=>{
            /**
             * desc:搜索匹配的选项并删除
             */
            db.collection(category+'mds').update({'_id':ObjectId(id)},{$pull:
                {
                    "comments":{
                        "index":index       
                    }
                }
            })
        })
        ctx.response.body = "删除成功！"            
    }catch(e){
        console.log(e)
    }
}
route.del('/delete',deleteOneComment)

/*
** desc:在线生成markdown文件
*/
const path = require('path')
const mdDir = path.dirname(__dirname)+"\\src\\article\\online"
const markdown = ctx => {
    let content = ctx.request.body.value
    let header = ctx.request.body.header
    fs.writeFile(mdDir+'/'+header+'.md',content,(err)=>{
        if(err) throw err;
        // console.log("自动生成markdown成功")
    })
    ctx.response.body = "md文档生成成功"
}
route.post('/markdown', markdown)
app.use(route.routes())

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