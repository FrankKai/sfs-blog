const fs = require("fs");
const db = require('../service/db.js');
const create = require("../service/create.js");

/*
** desc:在线生成markdown文件
*/
const path = require('path');
const mdDir = path.dirname(__dirname)+"\/article\/categories\/";
const markdown = ctx => {
    let content = ctx.request.body.value;
    let header = ctx.request.body.header;
    let category = ctx.request.body.category;
    let tags = ctx.request.body.dynamicTags;
    let url = ctx.request.body.imgUrl;
    
    fs.writeFile(mdDir + category +'/'+header+'.md',content,(err)=>{
        if(err) throw err;
        // console.log("自动生成markdown成功")
    });

    // data.content["article"] = data.mdname;
    // console.log(ctx,ctx.request.body)
    /*
    ** desc:存数据到数据库
    */

   create(
        header,
        new Date(),
        header,
        'subtitle',
        category,
        tags,
        content,
        url,
        []
    )
//    db.collection('articlelists').update({title:header},{$set:{tags:tags}})

    ctx.response.body = "md文档生成成功";
};

module.exports = markdown;