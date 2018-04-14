<template>
  <div class="record">
    <!-- {{msg}} -->
    <div class="sidebar">
      <blogger></blogger>
      <timestamp></timestamp>
    </div>
    <navigation></navigation>
    <ul>
      <li v-for="(item,index) in articles" :key="item.name" @click="filteArticle(index,item.title)">
        {{item.title}}
        {{item.birthtime}}
      </li>
    </ul>
  </div>
</template>

<script>
import navigation from '../components/common/navigation.vue'
import blogger from '../components/blog/blogger.vue'
import timestamp from '../components/blog/timestamp.vue'
import { FILTE_ARTICLE } from '../store/mutation-types'

export default {
  name: 'record',
  template: '<record/>',
  components:{navigation,blogger,timestamp},
  data () {
    return {
      msg: 'record'
    }
  },
  computed:{
    articles(){
      return this.$store.state.data.blog
    }
  },
  methods:{
    filteArticle: function(index,title){
      this.$store.commit(FILTE_ARTICLE,index);
      this.$router.push({path:'/record/'+title});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.record{
  width:80%;
    ul{
    padding: 0;
    margin: 0;
    width: 70%;
    li{
      list-style: none;
      display: block;
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
  };
}
.sidebar{
  float:right;
  width: 30%;
}
</style>
