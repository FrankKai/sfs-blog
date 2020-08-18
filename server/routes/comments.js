const db = require("../service/db");
let mdDataBlog = require("../service/blog");
const emitter = require("../emitter");

emitter.on("delete comment:update routes comments", data => {
  mdDataBlog = data;
});

/**
 * desc: get评论集接口
 */
const comments = ctx => {
  let commentsArr = [];
  mdDataBlog.forEach((e, i, arr) => {
    let id = e._id;
    let category = e.category;
    e.comments.forEach((e, i, arr) => {
      e.id = id;
      e.category = category;
      e.index = i;
      commentsArr.push(e);
    });
  });
  ctx.response.body = commentsArr;
};

module.exports = comments;
