var koa = require('koa');
var app = new koa();
/*解析请求*/
const koaBody = require('koa-body');
app.use(koaBody());
/*不解析json*/
const route = require('koa-route');
const main = ctx => {
console.log(ctx.request.body)
ctx.response.body = "Curl post succeed!"+ctx.request.body.port+" "+ctx.request.body.port+"!"
}
app.use(route.post('/', main))
app.listen(3009);