const fs = require('fs');
const path = require('path');
/*
** desc:获取目录列表接口
*/
const categoriesPath = path.dirname(__dirname)+"\/article\/categories";
let list = [];
fs.readdir(categoriesPath,(err,categories)=>{
    // categoryList = {...categories};
    console.log(categoriesPath);
    let item = [];
    categories.map((e,i,arr)=>{
        item.label = e;
        item.value = e;
        item.key = i;
        list.push(item);
        item = {};
    });
});
const categoryList = ctx =>{
    ctx.response.body = list;
};

module.exports = categoryList;