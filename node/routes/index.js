const Router = require('koa-router');
const router = new Router();
const main = require('./main');
const comment = require('./comment');
const comments = require('./comments');
const deleteOneComment = require('./delComment');
const markdown = require('./markdown');
const categoryList = require('./categoryList');

router
    .get('/main',main)
    .post('/comment',comment)
    .get('/comments',comments)
    .del('/delete',deleteOneComment)
    .post('/markdown', markdown)
    .get('/category',categoryList);
    
module.exports = router;