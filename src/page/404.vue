<template>
  <div class="404">
    {{msg}}
    <img src="../../assets/404.jpg"></img>
  </div>
</template>

<script>
export default {
  name: '404',
  template: '<404/>',
  data () {
    return {
      msg: '对不起，您的页面带着他的小姨子跑了！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
