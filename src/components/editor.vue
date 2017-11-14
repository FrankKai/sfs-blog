<template>
  <div class="editor">
    <div class="header">
      <h1>{{title}}<el-button type="primary" class="button" @click="createMarkdown()">生成</el-button></h1>
    </div>
    <div class="left">
      <textarea v-model="content.value"></textarea>
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
        value:'hello world'
      }
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
  width: 100%;
}
.left{
  float:left;
  width:50%;
  height: 100%;
  textarea{
    width:100%;
    height: 100%;
  }
}
.right{
  float:right;
  width:50%;
  height: 100%;
  div{
    width:100%;
    height: 100%;    
  }
}
</style>
