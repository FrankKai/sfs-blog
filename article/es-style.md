严格遵照airbnb的JS书写指南:https://github.com/airbnb/javascript/blob/master/README.md
airbub的babel插件：https://www.npmjs.com/package/babel-preset-airbnb

babel-preset-env就是垃圾，用babel-preset-aribnb才是硬道理，在.babelrc文件里配置presets:['airbnb']即可。

npm scripts中 babel 3.5.js --presets airbnb -o ./test/airbnb-js-style-guide/3.5.js

如果是babel-preset-env，上面的airbub为env，.babelrc文件中是"env"；如果是es2015，上面的aribnb则为es2015，.babelrc文件中也是"es2015"。

收获：
1..babelrc文件的presets数组，可以添加多个，编译时可自行进行选择
2.babel-preset-env不支持所有的新ES语法，不支持某些实验性规范
3.一家公司的ES书写指南，有自己的babel-preset-xxx插件（一般是对babel-preset-env的扩展）

这是babel-preset-airbnb的依赖，可以说是对babel-preset-env的一种扩充