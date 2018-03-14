<template>
  <div class="timestamp">
    <!-- {{msg}} -->
    <!-- <p>20170706</p>
    <p>20170708</p>
    <p>20170709</p> -->
    <div class="tech">
        <h4>博客技术栈</h4>
        <p>前端</p>
        <ul>
          <li>element-ui</li>
          <li>vuex</li>
          <li>vue-router</li>
          <li>axios</li>
        </ul>
        <p>中间件</p>
        <ul>
          <li>koa</li>
        </ul>
        <p>后端</p>
        <ul>
          <li>mongodb</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timestamp',
  template: '<timestamp/>',
  data () {
    return {
      msg: 'timestamp'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.timestamp{
  // position: absolute;
  // right:4%;
  // top:30%;
  // float: right;
  // width: 20%;
  padding: 10px;
  text-align: center;
  // border: 1px solid;
}
.tech{
  text-align: left;
    ul{
      padding:0;
      margin:0;
      li{
        display: inline-block;
        list-style: none;
        background: #FFFA9D;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
      }
    };
}
</style>
