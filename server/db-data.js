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
    var Bmd = mongoose.model('backendmd',mdSchema)
    createMd(
        'foo',
        new Date(),
        'foo',
        'subfoo',
        'frontend',
        ['elementUI','vuex','vueRouter','axios'],
        '1234',
        "http://ov6jc8fwp.bkt.clouddn.com/AAEAAQAAAAAAAAghAAAAJGE4ZTM1NjJkLThjNWMtNDE1OC1iMGZjLTJjMTJjMjliNjBhYw.jpg",
        "Fmd"
    )
    createMd(
        'bar',
        new Date(),
        'bar',
        'subbar',
        'frontend',
        ['elementUI','vuex','vueRouter','axios'],
        '5678',
        "http://ov6jc8fwp.bkt.clouddn.com/Taylor%20Swift.jpg",
        "Fmd"
    )
    createMd(
        'baz',
        new Date(),
        'baz',
        'subbaz',
        'backend',
        ['koa','mongodb'],
        '001111001010101011',
        "http://ov6jc8fwp.bkt.clouddn.com/%E5%A4%A7%E7%A5%9E.jpg",
        "Bmd"
    )

    function createMd(name,birthTime,title,subtitle,category,tags,content,imgSrc,type){
        let obj = null
        let newMD = null
        obj = {
            name:name,
            birthTime:birthTime,
            title:title,
            subtitle:subtitle,
            category:category,
            tags:tags,
            content:content,
            imgSrc:imgSrc
        }
        if(type === "Fmd"){
            newMD = new Fmd(obj)
        }else if(type === "Bmd"){
            newMD = new Bmd(obj)
        }else{
            console.log("Sorry,we can not recognize your collection's type")
        }
        return newMD.save()
    }
})