<template>
    <div class="article">
        <!-- <vue-markdown>**test**</vue-markdown> -->
        <navigation class="navigation"></navigation>
        <img :src=imgsrc class="image"></img>
        <h3 class="mdtitle">{{mdtitle}}</h3>
        <vue-markdown class="article-content">{{article.content}}</vue-markdown>
        <submit></submit>
        <show></show>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Submit from '../components/comment/submit.vue'
import Show from '../components/comment/show.vue'
import Navigation from '../components/common/navigation.vue'
// import Axios from 'axios'
export default {
    name: 'article',
    components:{VueMarkdown,Submit,Show,Navigation},
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
      },
      imgsrc(){
        return this.$store.state.currentArticle.imgSrc
      },
      mdtitle(){
        return this.$store.state.currentArticle.title
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.article{
    width:100%;
    text-align: center;
    margin:auto;
    /* .navigation{
        margin:auto
    } */
    .image{
        width:30%;
        height: 50%;
    }
    .article-content{
        width: 80%;
        margin: auto;
        text-align: left
    }
}



</style>
