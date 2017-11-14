<template>
  <div class="hello">
  {{msg}}
  </div>
</template>

<script>
// import {mavonEditor} from 'mavon-editor'
export default {
  name: 'hello',
  template: '<hello/>',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
