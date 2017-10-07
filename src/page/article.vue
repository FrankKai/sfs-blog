<template>
    <div class="article">
        <!-- <vue-markdown>**test**</vue-markdown> -->
        <vue-markdown class="article-content">{{article.content}}</vue-markdown>
        <!-- <p>{{mddata}}</p> -->
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
// import Axios from 'axios'
export default {
    name: 'article',
    components:{VueMarkdown},
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            mddata:[]
        }
    },
    created() {

    },
    watch: {
        mddata: function(){
            
        }
    },
    computed:{
      article(){
        return this.$store.state.currentArticle
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article-content{
    width: 80%;
    margin: auto;
}
</style>
