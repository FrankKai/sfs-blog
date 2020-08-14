const fs = require("fs");
const db = require("../service/db.js");
const emitter = require("./emitter");
const mdDataBlog = []; // blog前端路由文章列表数据
const path = "./server/article/categories";

const create = require("./create.js");

function readCategoryFiles() {
  /*
   ** desc:读取每个目录下的文章
   */

  fs.readdir(path, (err, files) => {
    if (err) {
      throw err;
    } else {
      files.forEach((v, i, arr) => {
        let cat = path + "/" + v;
        fs.readdir(cat, (err, files) => {
          files.forEach((v, i, arr) => {
            let smd = cat + "/" + v;
            fs.readFile(smd, "utf-8", (err, data) => {
              if (err) {
                throw err;
              } else {
                /**
                 * 创建文章对象，获取md文件的标题，内容和创建日期
                 */
                let articleLocal = {
                  title: "",
                  content: "",
                  birthtime: ""
                };
                articleLocal.title = v.slice(0, -3);
                articleLocal.content = data;
                /**
                 * fs.statSync()获取文件详情
                 */
                let stat = fs.statSync(smd);
                articleLocal.birthtime = stat.birthtime;

                /**
                 * 查询数据库，组装数据给前端
                 */
                let articleRemote = {};
                db.collection("articlelists")
                  .find({ title: articleLocal.title })
                  .toArray(function(err, docs) {
                    if (docs.length > 0) {
                      articleRemote = docs[0];
                      mdDataBlog.push(articleRemote);
                      articleRemote = {};
                    }
                  });
              }
            });
          });
        });
      });
    }
  });
}
emitter.on("event", () => {
  mdDataBlog.splice(0, mdDataBlog.length);
  readCategoryFiles();
});
readCategoryFiles();

emitter.on("update-blog", () => {
    readCategoryFiles();
});

module.exports = mdDataBlog;
