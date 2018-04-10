/**
 * desc: node 系统调用
 */
const fs = require("fs");
/**
 * desc: mongodb 驱动调用
 */
const ObjectId = require('mongodb').ObjectID;
/**
 * desc: koa2 web框架调用
 */
const koa = require('koa');
const app = new koa();


const mdData = [[],[]]; // main后端路由下的body数据
let mdDataBlog = mdData[0]; // blog前端路由文章列表数据
let mdDataCategory = mdData[1]; // category前端路由目录列表数据


function readCategoryFiles(){
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
                                /**
                                 * 创建文章对象，获取md文件的标题，内容和创建日期
                                 */
                                let articleLocal = {
                                    title:'',
                                    content:'',
                                    birthtime:''
                                }
                                articleLocal.title = v.slice(0,-3)
                                articleLocal.content = data
                                /**
                                 * fs.statSync()获取文件详情
                                 */
                                let stat = fs.statSync(smd)
                                articleLocal.birthtime = stat.birthtime
                                
                                // console.log("articleLocal:",articleLocal)
                                // console.log("stat:",stat)
                                /**
                                 * 替换content
                                 */
                                db.collection('backendmds').updateMany({title:articleLocal.title},{$set:{content:articleLocal.content}})
                                db.collection('frontendmds').updateMany({title:articleLocal.title},{$set:{content:articleLocal.content}})
                                
                                /**
                                 * 查询数据库，组装数据给前端
                                 */
                                let articleRemote = {};
                                db.collection("backendmds").find({title:articleLocal.title}).toArray(function(err, docs) {
                                    // console.log("docs",docs);
                                    if(docs.length>0){
                                        articleRemote = docs[0]
                                        // console.log("readCategoryFiles",articleRemote)
                                        mdDataBlog.push(articleRemote)
                                        articleRemote={}
                                    }
                                })
                                db.collection("frontendmds").find({title:articleLocal.title}).toArray(function(err, docs) {
                                    // console.dir(docs)
                                    if(docs.length>0){
                                        articleRemote = docs[0]
                                        mdDataBlog.push(articleRemote)
                                        articleRemote={}
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
function categoryFilesCount(){
    fs.readdir('../src/article/categories',(err,files)=>{
        if(err){
            throw err
        }else{
            // console.log(files)
            files.forEach((v,i,arr)=>{
                let categories = {
                    name: '',
                    num: 0,
                    articles: []
                };
                fs.readdir('../src/article/categories/'+v,(err,files)=>{
                    // console.log(files)
                    categories.name = v
                    categories.num = files.length
                    categories.articles = files
                    mdDataCategory.push(categories)
                    db.collection('category').insertOne(categories);
                    categories = {}
                })
            })
        }
    })
}
readCategoryFiles();
categoryFilesCount();
/*
** desc:跨域配置
*/
var cors = require('koa-cors');
app.use(cors());

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
const Router = require('koa-router');
const route = new Router();
/*
** desc:路由处理post/get请求
*/

/*
** desc:post提交评论
*/
const comment = ctx => {
    let data = ctx.request.body;
    data.content["article"] = data.mdname;
    // console.log(ctx,ctx.request.body)
    /*
    ** desc:存数据到数据库
    */
    db.collection(data.category+"mds").update({name:data.mdname},{$push:{comments:data.content}})
    mdDataBlog = []
    readCategoryFiles()
    categoryFilesCount()
    ctx.response.body = "评论添加成功"
  };
route.post('/comment', comment);

/*
** desc:get请求博客
*/
const main = ctx => {
    ctx.response.body = mdData;
};
route.get('/main', main);


/**
 * desc: get评论集接口
 */
const comments = ctx =>{
    let commentsArr = [];
    mdDataBlog.forEach((e,i,arr)=>{
        let id = e._id;
        let category = e.category;
        e.comments.forEach((e,i,arr)=>{
            e.id = id;
            e.category = category;
            e.index = i;
            commentsArr.push(e);
        })
    });
    ctx.response.body = commentsArr;
};
route.get('/comments',comments);


/**
 * desc: 删除一个评论
 */
const deleteOneComment = (ctx,next) =>{
    let params = ctx.request.query;
    // console.log(params);
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
        };
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
            });
        });
        ctx.response.body = "删除成功！";            
    }catch(e){
        console.log(e);
    }
}
route.del('/delete',deleteOneComment);

/*
** desc:在线生成markdown文件
*/
const path = require('path');
const mdDir = path.dirname(__dirname)+"\/src\/article\/categories\/";
const markdown = ctx => {
    let content = ctx.request.body.value;
    let header = ctx.request.body.header;
    let category = ctx.request.body.category;
    fs.writeFile(mdDir + category +'/'+header+'.md',content,(err)=>{
        if(err) throw err;
        // console.log("自动生成markdown成功")
    });
    ctx.response.body = "md文档生成成功";
};
route.post('/markdown', markdown);

/*
** desc:获取目录列表接口
*/
const categoriesPath = path.dirname(__dirname)+"\/src\/article\/categories";
let categoryList = [];
fs.readdir(categoriesPath,(err,categories)=>{
    // categoryList = {...categories};
    let item = {};
    categories.map((e,i,arr)=>{
        item.label = e;
        item.value = e;
        item.key = i;
        categoryList.push(item);
        item = {};
    });
});
const category = ctx =>{
    ctx.response.body = categoryList;
};
route.get('/category',category);


app.use(route.routes());


const c2k = require('koa2-connect');
const proxy = require('http-proxy-middleware');
var router = new Router();
router.get('/nodejs', c2k(proxy({
    target: 'https://api.github.com/users', 
    changeOrigin:true,
    // pathRewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/emojis')
    // agent: new httpsProxyAgent('http://1.2.3.4:88'),
   pathRewrite: path => path.replace(/^\/nodejs(\/|\/\w+)?$/, '/java'),
    // logs: true
})));
app.use(router.routes());

app.listen(3001); 
// console.log("markdown文件解析服务成功开启！")

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdDB',{useMongoClient: true,});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));