var koa = require('koa');
var app = new koa();

app.keys = ['im a newer secret', 'i like turtle'];
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

const route = require('koa-route');
const index = ctx => {
    data = ctx.request.body;
    ctx.response.body = "评论添加成功"
    ctx.cookies.set('name', 'frank', { signed: true ,maxAge:7200000});
  	ctx.cookies.set('age', 23, { signed: true ,maxAge:7200000});
  	ctx.body = 'Hello World';
  };
app.use(route.get('/', index))

app.listen(3000);