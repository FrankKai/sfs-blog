const fs = require("fs");
const db = require("../service/db.js");
const create = require("../service/create.js");
const emitter = require("../service/emitter");

/*
 ** desc:在线生成markdown文件
 */
const path = require("path");
const mdDir = path.dirname(__dirname) + "/article/categories/";
const markdown = ctx => {
  let content = ctx.request.body.value;
  let header = ctx.request.body.header;
  let category = ctx.request.body.category;
  let tags = ctx.request.body.dynamicTags;
  let url = ctx.request.body.imgUrl;

  fs.writeFile(mdDir + category + "/" + header + ".md", content, err => {
    if (err) throw err;
  });
  /*
   ** desc:存数据到数据库
   */

  create(
    header,
    new Date(),
    header,
    "subtitle",
    category,
    tags,
    content,
    url,
    []
  );

  emitter.emit("update-blog");

  ctx.response.body = "md文档生成成功";
};

module.exports = markdown;
