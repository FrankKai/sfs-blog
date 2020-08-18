const fs = require("fs");
const create = require("../service/create.js");
const emitter = require("../emitter");

/*
 ** desc:在线生成markdown文件
 */
const path = require("path");
const mdDir = path.dirname(__dirname) + "/article/categories/";
const markdown = ctx => {
  const {
    value: content,
    header,
    category,
    dynamicTags: tags,
    imgUrl: url
  } = ctx.request.body;

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

  ctx.response.body = "博客生成成功";
};

module.exports = markdown;
