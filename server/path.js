const path = require('path');
const urlJoin = path.join(__dirname, '../../');
const urlResolve = path.resolve(__dirname, '../../');


const foo = path.join(urlJoin,"./personal/");
const bar = path.resolve(urlResolve,"./personal/");


console.log(urlJoin,urlResolve);

console.log(foo,bar);

console.log(process.cwd())