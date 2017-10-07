<template>
  <div class="blogger">
    <div>
        <img src="../../assets/logo.png" alt="头像">
    </div>
    <div>
        <p><a href="https://github.com/FrankKai">Github</a></p>
        <p><a href="https://segmentfault.com/u/chennihuannianqing">segmentFault</a></p>
        <p><a href="https://www.zhihu.com/people/ting-zhao-wu-yue-tian-da-lan-qiu/activities">知乎</a></p>
        <p><a href="http://www.jianshu.com/u/ff2903c0af37">简书</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogger',
  template: '<blogger/>',
  data () {
    return {
      msg: 'blogger'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blogger{
  position: absolute;
  right:5%;
  top:3%;
  width: 20%;
  text-align: center;
}
</style>
