const fs = require("fs");
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

module.exports = markdown;