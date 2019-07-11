var Benchmark = require("benchmark")
var suite = new Benchmark.Suite;
var arr = [1,2,3,4,5,6,7,8,9,10,11,12]
// add tests
suite.add('Array#map', function() {
  var ret = [] 
  ret = arr.map((v)=>{return v * 2})
  return ret
})
.add('Array#forEach', function() {
  var ret = [] 
  arr.forEach((v)=>{ret.push(v)})
  return ret
})
.add('for', function() {
    var ret = [];
    for(var i=0;i<arr.length;i++){
        var v = arr[i]
        ret.push((v)=>{return v * 2});
    }
    return ret
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });