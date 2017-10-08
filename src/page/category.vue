<template>
  <div class="category">
    <!-- {{msg}} -->
    <navigation></navigation>
    <ul id="cat">
      <li v-for="(category,index) in categories" :key="category.name" @click="getArticles(index)">
        <a :href="'http://localhost:8080/#/category/'+category.name">
        {{category.name}}
        {{category.num}}
        </a>
      </li>
    </ul>
    <!-- <p v-for="category in categories" :key="category.name">
    </p> -->
  </div>
</template>

<script>
import navigation from '../components/common/navigation.vue'
// import axios from 'axios'
import dataApi from '../api/dataapi'
import { SET_DATA,FILTE_ARTICLES } from '../store/mutation-types'
export default {
  name: 'category',
  template: '<category/>',
  components:{navigation},
  data () {
    return {
      msg: 'category'
    }
  },
  created () {

  },
  computed:{
    categories(){
      return this.$store.state.data[1]
    }
    // arcindex(){
    //   return this.index
    // }
  },
  mounted(){
    let that=this;
    dataApi.getData(data => {
        that.$store.commit(SET_DATA,data);
      }
    )
  },
  methods:{
      getArticles:function(index){
        // let that = this
        // console.log(this)
        this.$store.commit(FILTE_ARTICLES,index)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.category{
  width: 80%;
  ul{
    padding: 0;
    margin: 0;
    li{
      list-style: none;
      a{
        display: inline-block;
        margin-top: 5px;
        text-decoration: none;
        color: #000;
        padding: 5px;
        background: #e4e8f1;
        border-radius: 5px;
        &:hover{
          background: #8391a5;
          color: #fff;
        }
      }
    }
  };

}
</style>
