<template>
    <div class="show">
      <div>
        <span>frank:</span>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus ex, sunt delectus dolorum sequi ipsam sit alias autem accusantium fugiat inventore non ratione ipsum facere nulla fuga consequatur. Praesentium, tempore?</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'show',
    template: '<show/>',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
  .show{
    div{
      span{
      display: inline-block
      }
      p{
        display: inline-block
      }
    }
  }
  </style>
  