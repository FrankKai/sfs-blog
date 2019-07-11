var http = require('http');
var crypto = require('crypto');
var protocol = "chat";
var WebSocket = function() {
}
WebSocket.prototype.onopen = function () {
    //TODO
}
WebSocket.prototype.setSocket = function (socket) {
    this.socket = socket;
}
var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World\n')
})
server.listen(12010);
server.on('upgrade',function(req,socket,upgradeHead){
    var head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    var key = req.headers['sec-websocket-key']
    var shasum = crypto.createHash('sha1')
    key = shasum.update(key+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest('base64')
    var headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade:websocket',
        'Connection:Upgrade',
        'Sec-WebSocket-Accept:'+key,
        // 'Sec-WebSocket-Protocol:'+protocol
    ]
    socket.setNoDelay(true);
    socket.write(headers.concat('','').join('\r\n'));
    var websocket = new WebSocket();
    websocket.setSocket(socket);
})