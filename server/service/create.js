var mongoose = require("mongoose");
var mdSchema = new mongoose.Schema({
  name: String,
  birthTime: Date,
  title: String,
  subtitle: String,
  category: String,
  tags: Array,
  content: String,
  imgSrc: String,
  comments: Array
});
var md = mongoose.model("articlelist", mdSchema);

function createMd(
  name,
  birthTime,
  title,
  subtitle,
  category,
  tags,
  content,
  imgSrc,
  comments
) {
  let obj = null;
  let newMD = null;
  obj = {
    name: name,
    birthTime: birthTime,
    title: title,
    subtitle: subtitle,
    category: category,
    tags: tags,
    content: content,
    imgSrc: imgSrc,
    comments: comments
  };
  newMD = new md(obj);
  return newMD.save();
}

module.exports = createMd;
