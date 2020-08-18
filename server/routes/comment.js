const db = require("../service/db.js");
const emitter = require("../service/emitter");

const comment = ctx => {
  let data = ctx.request.body;
  data.content["article"] = data.mdname;
  /*
   ** desc:存数据到数据库
   */
  emitter.emit("event");
  db.collection("articlelists").update(
    { name: data.mdname },
    { $push: { comments: data.content } }
  );
  ctx.response.body = "评论添加成功了吗？";
};

module.exports = comment;
