<template>
  <div class="editor">
    <div class="header">
      <h1>{{title}}</h1>
    </div>
    <div class="article">
      <el-input type="text" placeholder="请输入文章标题" v-model="content.header"></el-input>
      <el-select v-model="content.category" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="button" @click="createMarkdown()">生成</el-button>
    </div>
    <div class="left">
      <el-input type="textarea" v-model="content.value"></el-input>
    </div>
    <div class="right">
      <vue-markdown :source="content.value">
          {{content.value}}
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
export default {
  name: 'editor',
  template: '<editor/>',
  components:{
    VueMarkdown
  },
  created(){
    axios({
      method:'get',
      url:"http://localhost:3001/category"
    }).then((res)=>{
      this.options = res.data
    })
  },
  methods:{
    createMarkdown:function(){
      axios({
        method:'post',
        url:'http://localhost:3001/markdown',
        data:this.content
      }).then((response) => {
        console.log(response);
      })
    }
  },
  data () {
    return {
      title:'markdown文档在线生成器',
      msg: 'Welcome to Your Vue.js App',
      content: {
        header:'',
        value:'hello world',
        category:''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.button{
  transform:translate(5px,-5px)
}
/* div{
  padding:0;
  margin:0;
} */
.editor{
  width: 80%;
}
.left{
  width:48%;
  display: inline-block;
  height: 71%;
  margin: 10px 0 0 0;
  .el-textarea{
    height: 100%;
  }
}
.right{
  float:right;
  width:50%;
  min-height: 70%;
  margin: 10px 0 0 0;
  border: 2px dotted #ccc;  
  div{
    width:100%;
    height: 100%;    
  }
}

.article{
  .el-input{
    width: auto;
  }
  .button{
    transform: translate(0,0)
  }
}
</style>
