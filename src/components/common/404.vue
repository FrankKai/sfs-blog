<template>
  <div class="notFound">
    <h3 class="error">{{msgEnglish}}</h3>
    <h3 class="success">{{msgChinese}}</h3>
    <img src="../../assets/404.jpg"></img>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  template: '<notFound/>',
  data () {
    return {
      msgEnglish: '404 Page Not Found.',
      msgChinese: '你访问的页面带着他的小姨子跑了！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notFound{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.error{
  color:rgba(255,0,0,.8)
}
.success{
  color:rgba(0,250,0,.8)
}
</style>
