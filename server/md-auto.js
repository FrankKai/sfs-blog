const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})
const fs = require('fs')
const path = require('path')
const mdDir = path.dirname(__dirname)+"\\src\\article"

let mdName = ""

rl.question("请输入markdown名称:",(answer) => {
    mdName = answer
    rl.close()
    fs.writeFile(mdDir+'/'+mdName,'Hello Node.js',(err)=>{
        if(err) throw err;
        console.log("自动生成markdown成功")
    })
})

/*
快速获取文件名
path.basename()
*/
/*
快速获取文件名后缀
path.extname()
*/