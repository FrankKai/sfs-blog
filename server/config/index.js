// import dev from "./dev.env.js";
// import prod from "./prod.env.js";

// export default {
//     dev: dev,
//     prod: prod
// }

var dev = require('./dev.env.js');
var prod = require('./prod.env.js')

module.exports = {
    dev: dev,
    prod: prod
}