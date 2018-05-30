const db = require('../service/db.js');

const deleteOneComment = (ctx,next) =>{
    let params = ctx.request.query;
    // console.log(params);
    let id = params.id;
    let category = params.category;
    let index = params.index;
    let commentItem = "comments." + index;
    
    try{
        /**
         * desc:为将要删除的数组项增添index属性
         */
        let obj = {};
        obj[commentItem] = {
            "index":index
        };
        db.collection("articlelists").update({'_id':ObjectId(id)},{$set:obj}).then(()=>{
            /**
             * desc:搜索匹配的选项并删除
             */
            db.collection("articlelists").update({'_id':ObjectId(id)},{$pull:
                {
                    "comments":{
                        "index":index       
                    }
                }
            });
        });
        ctx.response.body = "删除成功！";            
    }catch(e){
        console.log(e);
    }
}

module.exports = deleteOneComment;