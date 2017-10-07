var koa = require('koa');
var app = new koa();
var cors = require('koa-cors')
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
fs.readdir('../vue-cli-version/src/article/categories',(err,files)=>{
    if(err){
        throw err
    }else{
        files.forEach((v,i,arr)=>{
            // console.log(v)
            let cat = '../vue-cli-version/src/article/categories/'+ v
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
fs.readdir('../vue-cli-version/src/article/categories',(err,files)=>{
    if(err){
        throw err
    }else{
        console.log(files)
        files.forEach((v,i,arr)=>{
            fs.readdir('../vue-cli-version/src/article/categories/'+v,(err,files)=>{
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
app.use(cors())
app.use(function *(){
    this.body = mddataarr;
});

app.listen(3001);
// console.log("markdown文件解析服务成功开启！")

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));