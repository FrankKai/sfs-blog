var koa = require('koa');
var app = new koa();
const Router = require('koa-router')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')
var router = new Router()
router.get('/nodejs', c2k(proxy({
    target: 'https://api.github.com/users', 
    changeOrigin:true,
    // pathRewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/emojis')
    // agent: new httpsProxyAgent('http://1.2.3.4:88'),
   pathRewrite: path => path.replace(/^\/nodejs(\/|\/\w+)?$/, '/java'),
    // logs: true
})))
app.use(router.routes())

app.listen(1024); 