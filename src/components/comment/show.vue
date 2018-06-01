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
  import { SET_DATA,FILTE_ARTICLE } from '../../store/mutation-types';
  import dataApi from '../../api/dataapi';
  // import asyncFlow from 'async';
  export default {
    name: 'show',
    template: '<show/>',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    sockets:{
      connect: function(){
        // this.id=this.$socket.id
      },
      commentUpdate: function(val){
        let that = this;
        // asyncFlow.series([
        //     function(callback) { 
        //       dataApi.getData(data => {
        //       console.log(data);
        //       that.$store.commit(SET_DATA,data);
        //     }); },
        //     function(callback) { that.$store.commit(FILTE_ARTICLE,this.$store.state.currentArticle.index); }
        // ])

        dataApi.getData(data => {
          console.log(data);
          that.$store.commit(SET_DATA,data)
        })
        setTimeout(function(){
          that.$store.commit(FILTE_ARTICLE,that.$store.state.currentArticle.index);
        },100)
        console.log(val)
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
  