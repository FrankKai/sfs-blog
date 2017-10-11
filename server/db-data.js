var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mdDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    var mdSchema = new mongoose.Schema({
        name:String,
        birthTime:Date,
        title:String,
        subtitle:String,
        category:String,
        tags:Array,
        content:String,
        imgSrc:String
    })
    var Fmd = mongoose.model('frontendmd',mdSchema)
    var Foo = new Fmd({
        name:'foo',
        birthTime:new Date(),
        title:'foo',
        subtitle:'subfoo',
        category:'frontend',
        tags:['elementUI','vuex','vueRouter','axios'],
        content:'1234',
        imgSrc:"http://ov6jc8fwp.bkt.clouddn.com/AAEAAQAAAAAAAAghAAAAJGE4ZTM1NjJkLThjNWMtNDE1OC1iMGZjLTJjMTJjMjliNjBhYw.jpg"
    })
    Foo.save(function (err) {
        console.log('Foo保存成功');
    });
    var Bar = new Fmd({
        name:'bar',
        birthTime:new Date(),
        title:'bar',
        subtitle:'subbar',
        category:'frontend',
        tags:['elementUI','vuex','vueRouter','axios'],
        content:'5678',
        imgSrc:"http://ov6jc8fwp.bkt.clouddn.com/Taylor%20Swift.jpg"
    })
    Bar.save(function (err) {
        console.log('Bar保存成功');
    });
    var Bmd = mongoose.model('backendmd',mdSchema)
    var Baz = new Bmd({
        name:'baz',
        birthTime:new Date(),
        title:'baz',
        subtitle:'subbaz',
        category:'backend',
        tags:['koa','mongodb'],
        content:'001111001010101011',
        imgSrc:"http://ov6jc8fwp.bkt.clouddn.com/%E5%A4%A7%E7%A5%9E.jpg"
    })
    Baz.save(function (err) {
        console.log('Baz保存成功');
    });
})

