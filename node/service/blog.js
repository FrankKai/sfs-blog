const fs = require('fs');
const db = require('../service/db.js');

// const mdDataBlog = [];
// const mdDataCategory = [];
const mdDataBlog = []; // blog前端路由文章列表数据
const path = '../src/article/categories';

const create = require("./create.js");

function readCategoryFiles(){
    /*
    ** desc:读取每个目录下的文章
    */
    
    fs.readdir(path,(err,files)=>{
        if(err){
            throw err
        }else{
            files.forEach((v,i,arr)=>{
                console.log(v)
                let cat = path + '/' + v
                console.log(cat)
                fs.readdir(cat,(err,files)=>{
                    files.forEach((v,i,arr)=>{
                        console.log(v)
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
                                
                                // db.once('open',function(){
                                    create(
                                        articleLocal.title,
                                        new Date(),
                                        articleLocal.title,
                                        'subtitle',
                                        cat,
                                        ['elementUI','vuex','vueRouter','axios'],
                                        '5678',
                                        "http://ov6jc8fwp.bkt.clouddn.com/Taylor%20Swift.jpg",
                                        [{name:"jack",email:"jack@gmail.com",content:"hello front bar jack"},{name:"rose",email:"rose@gmail.com",content:"hello front bar rose"}]
                                    )
                                // })
                                // console.log("articleLocal:",articleLocal)
                                // console.log("stat:",stat)
                                /**
                                 * 替换content
                                 */
                                db.collection('articlelists').updateMany({title:articleLocal.title},{$set:{content:articleLocal.content}})
                                // db.collection('frontendmds').updateMany({title:articleLocal.title},{$set:{content:articleLocal.content}})
                                
                                /**
                                 * 查询数据库，组装数据给前端
                                 */
                                let articleRemote = {};
                                // db.collection("backendmds").find({title:articleLocal.title}).toArray(function(err, docs) {
                                //     // console.log("docs",docs);
                                //     if(docs.length>0){
                                //         articleRemote = docs[0]
                                //         // console.log("readCategoryFiles",articleRemote)
                                //         mdDataBlog.push(articleRemote)
                                //         articleRemote={}
                                //     }
                                // })
                                db.collection("articlelists").find({title:articleLocal.title}).toArray(function(err, docs) {
                                    // console.dir(docs)
                                    if(docs.length>0){
                                        articleRemote = docs[0]
                                        mdDataBlog.push(articleRemote)                                     
                                        articleRemote={}
                                    }
                                })
                                console.log(mdDataBlog)
                            }
                        })
                    })
                })
            })
        }
    })
}
// /*
// ** desc:统计目录文件数目
// */
// function categoryFilesCount(){
//     fs.readdir(path,(err,files)=>{
//         if(err){
//             throw err
//         }else{
//             // console.log(files)
//             files.forEach((v,i,arr)=>{
//                 let categories = {
//                     name: '',
//                     num: 0,
//                     articles: []
//                 };
//                 fs.readdir(path + '/' + v,(err,files)=>{
//                     // console.log(files)
//                     categories.name = v
//                     categories.num = files.length
//                     categories.articles = files
//                     mdDataCategory.push(categories)
//                     db.collection('category').insertOne(categories);
//                     categories = {}
//                 })
//             })
//         }
//     })
// }
readCategoryFiles();
// categoryFilesCount();

module.exports = mdDataBlog;