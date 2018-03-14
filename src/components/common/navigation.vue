<template>
  <div class="navigation">
    <div class="logo">
      <router-link to='/'>趁你还年轻的博客</router-link>
      <!-- <p>趁你还年轻的博客</p> -->
    </div>
    <div class="navs">
      <router-link to='/blog'>博客</router-link>
      <router-link to='/category'>目录</router-link>
      <router-link to='/record'>归档</router-link>
      <router-link to='/tag'>标签</router-link>
      <router-link to='/editor'>写文章</router-link>            
      <router-link to='/home'>返回封面</router-link>
      <!-- <el-button @click="koaProxyTest">koa2 proxy test</el-button> -->
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import koaProxy from '../../api/koa-proxy.js'
export default {
  name: 'navigation',
  template:'<navigation/>',
  data() {
      return {
      };
  },
  methods:{
    koaProxyTest: function(){
      koaProxy.getData(console.log)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navs {
  // position: absolute;
  // right:0;
  // top:10px;
  display: inline-block;
  float: right;
  // width: 70%;
  a {
    display: inline-block;
    text-decoration:none;
    text-align: center;
    // color: chocolate;
    // background: #DFFCB5;
    padding:3px;
    border-radius:5%;
    color: #fff;
    background: #403F48;
    &:hover{
      color: #fff;
      background: #8391a5
    }
  }
}
.navigation{
  width: 70%;
  margin-top: 10px;
  clear: both;
  display: inline-block;
  .logo{
    // box-sizing: border-box;
    // border: 10px solid transparent;
    width: 30%;
    display: inline-block;
      a{
        text-decoration:none;
        font-size: 15px;
        margin:0;
        margin:6px 0;
        border-radius:5%;
        padding:6px;
        color: #fff;
        background: #403F48;
        &:hover{
          color: #fff;
          background: #8391a5
        }

    }
  }
}
.clearfix{
  clear: both;
}
</style>
