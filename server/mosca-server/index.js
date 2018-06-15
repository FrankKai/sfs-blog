var mosca = require('mosca');
// 订阅/发布 mosca设置
var pubsubsettings = {
    // type: 'mongo',
    // url: 'mongodb://localhost:27017/mqtt',
    // pubsubCollection: 'ascoltatori',
    // mongo:{}
};
// mosca 服务器初始化
var moscaSettings = {
    port: 1883,
    backend: pubsubsettings
};

var server = new mosca.Server(moscaSettings);
server.on('ready',setup);

function setup(){
    console.log('Mosca server is up and running')
}

//publish()发送消息到客户端，支持mqtt协议的离线，服务质量，消息记录

var message = {
    topic: '/hello/world',
    payload: 'abcde', // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
  };
  
  server.publish(message, function() {
    console.log('done!');
  });
//on()允许接收客户端传来的信息
server.on('published',function(packet,client){
    console.log('Client Published',packet.payload);
    // console.log('Client',client);
})

server.on('clientConnected', function(client) {
    console.log('Client Connected:', client.id);
});

// server.on('clientDisconnected', function(client) {
//     console.log('Client Disconnected:', client.id);
// });

