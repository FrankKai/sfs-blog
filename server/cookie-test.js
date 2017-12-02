const koa = require('koa');
const app = new koa();

app.keys = ['im a newer secret', 'i like turtle'];
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

const route = require('koa-route');
const setCookie = ctx => {
    data = ctx.request.body;
    ctx.response.body = "Cookie设置成功"
    ctx.cookies.set('name', 'frank', { signed: true ,maxAge:7200000});
  	ctx.cookies.set('age', 23, { signed: true ,maxAge:7200000});
  	ctx.body = 'Hello World';
  };
app.use(route.get('/set', setCookie))
const deleteCookie = ctx =>{
    ctx.response.body = "Cookie删除成功"
    ctx.cookies.set('name','frank',{signed:false,maxAge:0})
    ctx.cookies.set('age',23,{signed:false,maxAge:0})
    ctx.body = "Hello orld"
}
app.use(route.get('/delete',deleteCookie))
app.listen(3000);