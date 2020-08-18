const fs = require("fs");
const db = require("../service/db.js");

const mdDataCategory = [];
const path = "./server/article/categories";

/*
 ** desc:统计目录文件数目
 */
function categoryFilesCount() {
  fs.readdir(path, (err, files) => {
    if (err) {
      throw err;
    } else {
      files.forEach((v, i, arr) => {
        let categories = {
          name: "",
          num: 0,
          articles: []
        };
        fs.readdir(path + "/" + v, (err, files) => {
          categories.name = v;
          categories.num = files.length;
          categories.articles = files;
          mdDataCategory.push(categories);
          db.collection("category").insertOne(categories);
          categories = {};
        });
      });
    }
  });
}
categoryFilesCount();

module.exports = mdDataCategory;
