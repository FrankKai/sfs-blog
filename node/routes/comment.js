const db = require('../service/db.js');
const comment = ctx => {
    let data = ctx.request.body;
    data.content["article"] = data.mdname;
    // console.log(ctx,ctx.request.body)
    /*
    ** desc:存数据到数据库
    */
    db.collection(data.category+"mds").update({name:data.mdname},{$push:{comments:data.content}})
    ctx.response.body = "评论添加成功了吗？"
};

module.exports = comment;