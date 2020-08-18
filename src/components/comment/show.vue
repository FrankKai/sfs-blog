<template>
  <div class="show">
    <div class="show-header">
      评论区
    </div>
    <div class="show-item" v-for="(item, i) in commentsList" :key="i">
      <p class="name">昵称：{{ item.name }}</p>
      <p class="email">邮箱：{{ item.email }}</p>
      <p>评论：{{ item.comment }}</p>
    </div>
  </div>
</template>

<script>
import { SET_DATA, FILTE_ARTICLE } from "../../store/mutation-types";
import dataApi from "../../api/dataapi";

export default {
  name: "show",
  template: "<show/>",
  props: ["index", "commentsList"],
  sockets: {
    commentUpdate: function(val) {
      let that = this;
      dataApi.getData(data => {
        that.$store.commit(SET_DATA, data);
      });
      setTimeout(function() {
        that.$store.commit(
          FILTE_ARTICLE,
          that.$store.state.currentArticle.index
        );
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.show {
  width: 80vw;
  &-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-item {
    border-top: 3px dashed black;
    width: 100%;
    padding: 10px;
  }
}
</style>
