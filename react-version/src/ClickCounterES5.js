//Component父类
var Component = function(){

}
Component.prototype = {
    foo:'',
    bar() {

    }
}
module.exports = Component

//ClickCounter子类
var ClickCounter = new Component()
