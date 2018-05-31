<template>
    <div class="show">
      <ul>
        <li v-for="item in commentsList">
          <h5 class="name">昵称：{{item.name}}</h5>
          <span class="email">邮箱：{{item.email}}</span>
          <p>评论：{{item.comment}}</p>
        </li>
      </ul>
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
    },
    computed:{
      commentsList(){
        return this.$store.state.currentArticle.comments
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
.show{
  text-align: left;
  margin:auto;
  width:70%
}
  </style>
  