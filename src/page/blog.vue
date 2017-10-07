<template>
  <div class="blog">
    <navigation></navigation>
    <briefarticle
      v-for="(item, index) in articles"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="item.id"
      :title="item.title"
      :birthtime="item.birthtime"
    ></briefarticle>
    <!-- <briefarticle></briefarticle> -->
    <blogger></blogger>
    <timestamp></timestamp>
    <!-- <article></article> -->
    <!-- <div>{{articles}}</div> -->
    <!-- <vue-markdown class="vue-markdown" v-for="item in articles" :key="item.id">
      {{item.title}}
      {{item.content}}
    </vue-markdown> -->
    <!-- <vue-markdown># 123</vue-markdown> -->
    <!-- <category></category> -->
  </div>
</template>

<script>
import navigation from '../components/common/navigation.vue'
import briefarticle from '../components/blog/briefarticle.vue'
import blogger from '../components/blog/blogger.vue'
import timestamp from '../components/blog/timestamp.vue'
import dataApi from '../api/dataapi'
import { SET_DATA } from '../store/mutation-types'
// import Category from './category.vue'
// import Article from './article.vue'
// import VueMarkdown from 'vue-markdown'



export default {
  name: 'blog',
  components: {navigation,briefarticle,blogger,timestamp/*,VueMarkdown*/},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    let that=this;
    dataApi.getData(data => {
        that.$store.commit(SET_DATA,data);
      }
    )
    console.log(that.$store)
  },
  computed:{
      articles(){
        return this.$store.state.data[0]
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blog{
  width: 80%;
  /* height: 100%; */
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.vue-markdown{
  width: 80%;
  background: rgba(183,245,222,0.5);
}
</style>
