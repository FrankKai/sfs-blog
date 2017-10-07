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
<style scoped>
.timestamp{
  position: absolute;
  right:5%;
  top:50%;
  width: 20%;
  text-align: center;
}
.tech{
  text-align: left;
}
</style>
