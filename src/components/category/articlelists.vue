<template>
  <div class="articlelists">
    {{msg}}
    {{msg}}
    <ul>
        <li v-for="article in articles" :key="article" @click="filteArticle(article)">
          <a :href="locationUrl+article">
            {{article.slice(0,-3)}}
          </a>
        </li>
    </ul>
  </div>
</template>

<script>
// import dataApi from '../../api/dataapi'
// import { FILTE_CATEGORY_ARTICLE,SET_DATA,FILTE_ARTICLES } from '../../store/mutation-types'
import { FILTE_ARTICLES } from '../../store/mutation-types'
export default {
  name: 'articlelists',
  template: '<articlelists/>',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
      articles(){
        return this.$store.state.currentArticles.data
      },
      locationUrl(){
        return location.href  + '/'
        // console.log(this.location)
      }
  },
  created(){
    console.log(location)
  },
  // mounted(){
  //   let that=this;
  //   dataApi.getData(data => {
  //       that.$store.commit(SET_DATA,data);
  //     }
  //   )
  // },
//   methods:{
//       getArticles:function(){
//           this.$store.commit(FILTE_ARTICLES)
//       }
//   }
  methods:{
    filteArticle: function(article){
      console.log(article)
      this.$store.commit(FILTE_CATEGORY_ARTICLE,article);
      // this.$router.push({path:'/blog/'+this.title});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.articlelists{
width: 80%;
  ul{
    padding: 0;
    margin: 0;
    li{
      list-style: none;
      a{
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
    }
  };
}
  
</style>
