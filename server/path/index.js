const foo = require('./dir/foo');
const bar = require('./dir/bar');

console.log("dir/foo.js:",foo);
console.log("dir/bar.js:",bar);
console.log("index.js",process.cwd())