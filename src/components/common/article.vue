<template>
  <div class="article">
    <div class="article-header article-common">
      <navigation></navigation>
      <h1 class="article-header__mdtitle">{{ computedArticle.title }}</h1>
    </div>
    <div class="article-main article-common">
      <div class="article-main__header">
        正文
      </div>

      <div class="article-main__content">
        <img
          class="article-main__image"
          v-if="computedArticle.imgSrc"
          :src="computedArticle.imgSrc"
        />
        <vue-markdown class="article-content">{{
          computedArticle.content
        }}</vue-markdown>
      </div>
    </div>

    <div class="article-footer article-common">
      <div class="article-footer__submit article-footer-common">
        <submit></submit>
      </div>
      <div class="article-footer__comments article-footer-common">
        <show :commentsList="computedArticle.comments"></show>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueMarkdown from "vue-markdown";
import Submit from "../comment/submit.vue";
import Show from "../comment/show.vue";
import Navigation from "../common/navigation.vue";

export default {
  name: "carticle",
  components: { VueMarkdown, Submit, Show, Navigation },
  data() {
    return { computedArticle: null };
  },
  computed: {
    ...mapState({
      carticle: "currentArticle",
      allData: "data"
    }),
    articleId() {
      if ("id" in this.$route.query) {
        return this.$route.query.id;
      }
    }
  },
  watch: {
    allData() {
      this.updateArticle();
    }
  },
  mounted() {
    this.updateArticle();
  },
  methods: {
    updateArticle() {
      if (this.articleId && sessionStorage.getItem("data:blog")) {
        const blog = JSON.parse(sessionStorage.getItem("data:blog")).find(
          article => article._id === this.articleId
        );
        this.computedArticle = blog;
      } else {
        this.computedArticle = this.carticle;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.article {
  width: 80vw;
  margin: 20px 0;
  &-header {
    text-align: center;
    &__mdtitle {
      margin: 20px 0;
    }
  }
  &-main {
    &__image {
      width: 30%;
      height: 50%;
    }
    &__header {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &__content {
      min-height: 300px;
      border-top: 3px dashed black;
      border-bottom: 3px dashed black;
      padding: 5px;
    }
  }
  &-footer {
    &__submit {
      width: 40%;
    }
    &-common {
      margin-bottom: 30px;
    }
  }
  &-common {
    margin-bottom: 30px;
  }
}
</style>
