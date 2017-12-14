/*浏览器端发起socket通信的代码*/
var socket = new WebSocket("ws://localhost:12010/socketServer.js");

socket.onmessage = function (event) {
    var data = event.data;
    //处理数据
    console.log(data)
}
socket.onopen = function(){
    alert("Chrome与nodejs服务器成功建立WebSocket通信！")    
}
socket.onerror = function(){
    alert("error")
}
socket.onclose = function(){
    alert("close")
}



//待验证的朴灵大神的代码
/*var WebSocket = function(url) {
    this.options = parseUrl(url);
    this.connect();
}
WebSocket.prototype.onopen = function () {
    //TODO
}
WebSocket.prototype.setSocket = function (socket) {
    this.socket = socket;
}
WebSocket.prototype.connect = function () {
    var that = this;
    var key = new Buffer(this.options.protocalVersion+'-'+Date.now().toString('base64'))
    var shasum = crypto.createHash('sha1');
    var expecte = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5ABODC85B11').digest('base64');
    var options = {
        port:this.options.port,
        host:this.options.hostname,
        headers:{
            'Connection':'Upgrade',
            'Upgrade':'websocket',
            'Sec-WebSocket-Version':this.options.protocolVersion,
            'Sec-WebSocket-Key':key
        }
    }
    var req = http.request(options);
    req.end();
    req.on('upgrade',function(res,socket,upgradeHead){
        that.setSocket(socket);
        that.onopen();
    });
}
*/
