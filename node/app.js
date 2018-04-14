const koa = require('koa');
const app = new koa();
/*
** desc:跨域配置
*/
var cors = require('koa-cors');
app.use(cors());
/*
** desc:解析配置
*/
const koaBody = require('koa-body');
app.use(koaBody());

// const blog = require('./routes/blog');

const router = require('./routes/index.js');
app.use(router.routes());
app.listen(3001); 