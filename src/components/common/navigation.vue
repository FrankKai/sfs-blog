<template>
  <div class="navigation">
    <div class="logo">
      <p><a href="/">趁你还年轻的博客</a></p>
      <!-- <p>趁你还年轻的博客</p> -->
    </div>
    <div class="navs">
      <a href="http://localhost:8081/#/blog">博客</a>
      <a href="http://localhost:8081/#/category">目录</a>
      <a href="http://localhost:8081/#/record">归档</a>
      <a href="http://localhost:8081/#/tag">标签</a>
      <a href="http://localhost:8081/#/home">返回封面</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  template:'<navigation/>',
  data() {
      return {
      };
    },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navs {
  position: absolute;
  right:0;
  top:10px;
  a {
    display: inline-block;
    text-decoration:none;
    text-align: center;
    // color: chocolate;
    // background: #DFFCB5;
    padding:10px;
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
  position: relative;
  width: 70%;
  div{
    display: inline-block
  }
  .logo{
    // position: absolute;
    // left:0;
    p{
      a{
        text-decoration:none;
        font-size: 25px;
        margin:0;
        margin:6px 0;
        border-radius:5%;
        padding:10px;
        color: #fff;
        background: #403F48;
        &:hover{
          color: #fff;
          background: #8391a5
        }
      }
    }
  }
}
</style>
