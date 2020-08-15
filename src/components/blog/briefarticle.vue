<template>
  <div class="birefarticle">
    <el-row>
      <el-col :span="30" v-for="(o, index) in 1" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img v-if="imgSrc" :src="imgSrc" class="image" />
          <div style="padding:14px;">
            <h3 class="line-break line-break-clamp__2">{{ title }}</h3>
            <div>
              <el-tag v-for="item in tags" :key="item" type="primary">{{
                item
              }}</el-tag>
            </div>
            <div class="bottom clearfix">
              <time class="time"
                >创建时间:
                {{ birthtime.slice(0, -5) | formatTimestampToDate }}</time
              >
              <el-button type="info" class="button" @click="filteArticle()"
                >阅读全文</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import utilTime from "@/util/time";
import { FILTE_ARTICLE } from "../../store/mutation-types";

export default {
  name: "birefarticle",
  template: "<birefarticle/>",
  props: ["index", "title", "item", "birthtime", "imgsrc"],
  data() {
    return {};
  },
  computed: {
    arcindex() {
      return this.index;
    },
    tags() {
      return this.$store.state.data.blog[this.index].tags;
    },
    imgSrc() {
      return this.imgsrc;
    }
  },
  filters: {
    formatTimestampToDate(timesteamp) {
      return utilTime.formatTimestampToDate(timesteamp, "char").second;
    }
  },
  methods: {
    filteArticle: function() {
      this.$store.commit(FILTE_ARTICLE, this.index);
      this.$router.push({ path: "/blog/" + this.title });
    }
  }
};
</script>

<style lang="scss" scoped>
.birefarticle {
  width: 70%;
  margin: 10px 0;
  display: inline-block;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  margin: 10px auto 0 auto;
  display: block;
  width: 40%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-tag {
  margin-right: 5px;
}
</style>
