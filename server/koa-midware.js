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
//统计目录文件数目
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
    var result;
    data = ctx.request.body;
    /*存数据到数据库*/
    // db.collection('test').insertOne(data);
    // db.collection('backendmds').findOne({name:obj.title})
    db.collection(data.category+"mds").update({name:data.mdname},{$push:{comments:data.content}})
    db.collection(data.category+"mds").findOne({name:data.mdname},(err,doc)=>{
         console.log(doc['comments'])
    })
    // console.log(result)
    // ctx.response.body = result
    ctx.response.body = "评论添加成功"
    // console.log(db.collection(data.category+"mds").findOne({name:data.mdname}))
  };
app.use(route.post('/comment', comment))
/*get请求博客*/
const main = ctx => {
    ctx.response.body = mddataarr;
}
app.use(route.get('/main', main))

app.listen(3001); 
// console.log("markdown文件解析服务成功开启！")

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdDB',{useMongoClient: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));