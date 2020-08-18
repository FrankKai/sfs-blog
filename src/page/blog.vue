<template>
  <div class="blog">
    <div class="sidebar">
      <blogger></blogger>
      <timestamp></timestamp>
    </div>
    <navigation></navigation>
    <briefarticle
      v-for="(item, index) in articles"
      :item="item"
      :index="index"
      :key="item.id"
      :title="item.title"
      :birthtime="item.birthTime"
      :imgsrc="item.imgSrc"
      :id="item._id"
    ></briefarticle>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import navigation from "@/components/common/navigation.vue";
import briefarticle from "@/components/blog/briefarticle.vue";
import blogger from "@/components/blog/blogger.vue";
import timestamp from "@/components/blog/timestamp.vue";
import { SET_DATA } from "@/store/mutation-types";

export default {
  name: "blog",
  components: { navigation, briefarticle, blogger, timestamp },
  mounted() {
    this.getAllBlogs();
  },
  computed: {
    articles() {
      return this.$store.state.data.blog;
    }
  },
  methods: {
    ...mapActions(["UPDATE_GLOBAL_BLOGS"]),
    getAllBlogs() {
      this.UPDATE_GLOBAL_BLOGS();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blog {
  width: 80%;
}
h1,
h2 {
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
.vue-markdown {
  width: 80%;
  background: rgba(183, 245, 222, 0.5);
}
.sidebar {
  float: right;
  width: 30%;
}
</style>
