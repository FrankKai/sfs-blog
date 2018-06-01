const koa = require('koa');
const app = new koa();
const server = require('http').createServer(app.callback());
const io = require("socket.io")(server);
const config = require('./config')
const emitter = require('./service/emitter');
const async = require('async');

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


io.on('connection', function(socket){
    socket.on('comment', function(msg){        
        console.log(msg);
        emitter.emit('event');
        setTimeout(function(){
            io.emit('commentUpdate', msg);
        },100)
        // async.series([
        //     function(callback) {  },
        //     function(callback) {  }
        // ])
    });
});

server.listen(port,function(){
    console.log('listening on :' + port);
}); 