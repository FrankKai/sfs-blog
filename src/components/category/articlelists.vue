<template>
  <div class="articlelists">
    <div class="sidebar">
      <blogger></blogger>
      <timestamp></timestamp>
    </div>
    <navigation></navigation>
    <ul>
      <li
        v-for="article in articles"
        :key="article"
        @click="filteArticle(article)"
      >
        <router-link
          :to="'/category' + '/' + name + '/' + article.slice(0, -3)"
        >
          {{ article.slice(0, -3) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { FILTE_ARTICLES } from "../../store/mutation-types";
import navigation from "../common/navigation.vue";
import blogger from "../blog/blogger.vue";
import timestamp from "../blog/timestamp.vue";

export default {
  name: "articlelists",
  template: "<articlelists/>",
  components: { navigation, blogger, timestamp },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    articles() {
      return this.$store.state.currentArticles.data;
    },
    locationUrl() {
      return location.href + "/";
    },
    name() {
      return this.$store.state.currentArticles.name;
    }
  },
  methods: {
    filteArticle: function(article) {
      console.log(article);
      this.$store.commit("FILTE_CATEGORY_ARTICLE", article);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.articlelists {
  width: 80%;
  ul {
    padding: 0;
    margin: 0;
    width: 70%;
    li {
      list-style: none;
      a {
        display: block;
        margin-top: 5px;
        text-decoration: none;
        color: #000;
        padding: 5px;
        background: #e4e8f1;
        border-radius: 5px;
        &:hover {
          background: #8391a5;
          color: #fff;
        }
      }
    }
  }
}
.sidebar {
  float: right;
  width: 30%;
}
</style>
