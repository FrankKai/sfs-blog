const blog = require('../service/blog');
const category = require('../service/category');

const data = {
    blog,
    category
}; 

const main = ctx => {
    ctx.response.body = data;
};

module.exports = main;