const koa = require('koa');
const app = new koa();
const config = require('./config')
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

var port = 3001;

if(process.env.NODE_ENV == "development"){
    port = config.dev.port;
}else if(process.env.NODE_ENV == "production"){
    port = config.prod.port;    
}
app.listen(port); 