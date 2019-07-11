const fs = require('fs');
const db = require('../service/db.js');

// const mdDataBlog = [];
const mdDataCategory = [];
// const mdDataBlog = []; // blog前端路由文章列表数据
const path = '../server/article/categories';

/*
** desc:统计目录文件数目
*/
function categoryFilesCount(){
    fs.readdir(path,(err,files)=>{
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
                fs.readdir(path + '/' + v,(err,files)=>{
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
// readCategoryFiles();
categoryFilesCount();

module.exports = mdDataCategory;