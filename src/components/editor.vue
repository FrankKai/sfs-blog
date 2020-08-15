<template>
  <div class="editor">
    <div class="header">
      <h1 class="header__title">{{ title }}</h1>
      <a
        class="header__guide"
        href="https://guides.github.com/features/mastering-markdown/"
        target="blank"
        >markdown语法指南</a
      >
      <el-button
        type="primary"
        class="header__return"
        @click="jumpToBlog"
        size="small"
      >
        返回
      </el-button>
    </div>
    <div class="article">
      <el-input
        type="text"
        placeholder="请输入文章标题"
        v-model="content.header"
        size="small"
      ></el-input>
      <el-select
        v-model="content.category"
        placeholder="请选择目录"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        class="button"
        @click="createMarkdown()"
        size="small"
        >生成</el-button
      >
    </div>
    <div class="tag-list">
      <el-tag
        :key="tag"
        v-for="tag in content.dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ 标签</el-button
      >
    </div>
    <div class="background-img">
      <el-input
        type="text"
        placeholder="请输入文章背景图片url"
        v-model="content.imgUrl"
        size="small"
      ></el-input>
    </div>
    <div class="left">
      <el-input type="textarea" v-model="content.value"></el-input>
    </div>
    <div class="right">
      <vue-markdown :source="content.value">
        {{ content.value }}
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import axiosService from "util/axios.js";

export default {
  name: "editor",
  template: "<editor/>",
  components: {
    VueMarkdown
  },
  created() {
    axiosService({
      method: "get",
      url: "/category"
    }).then(res => {
      this.options = res.data;
    });
  },
  methods: {
    createMarkdown() {
      if (!this.content.category) {
        this.content.category = "默认";
      }
      if (!this.content.header) {
        this.$message({
          message: "文章标题不能为空",
          type: "warning"
        });
        return;
      }
      axiosService({
        method: "post",
        url: "/markdown",
        data: this.content
      })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.data,
              type: "success"
            });
            this.jumpToBlog();
          } else {
            this.$message({
              message: res.data,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    handleClose(tag) {
      this.content.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.content.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    jumpToBlog() {
      this.$router.push("/blog");
    }
  },
  data() {
    return {
      title: "博客生成器",
      content: {
        header: "",
        value: "快开始写博客吧···",
        category: "默认",
        dynamicTags: [],
        imgUrl: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      inputVisible: false,
      inputValue: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.button {
  transform: translate(5px, -5px);
}
.editor {
  width: 80%;
  .header {
    &__title {
      display: inline-block;
    }
    &__guide {
      color: black;
      &:hover {
        color: #20a0ff;
      }
    }
    &__return {
      float: right;
      position: relative;
      top: 10px;
    }
  }
}
.left {
  width: 48%;
  display: inline-block;
  height: 76vh;
  margin: 10px 0 0 0;
  .el-textarea {
    height: 100%;
  }
}
.right {
  float: right;
  width: 50%;
  height: 76vh;
  margin: 10px 0 0 0;
  border: 2px dotted #ccc;
  div {
    width: 100%;
    height: 100%;
  }
}

.article {
  clear: right;
  .el-input {
    width: auto;
  }
  .button {
    transform: translate(0, 0);
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.tag-list {
  margin: 10px 0 0;
}
.background-img {
  margin: 10px 0 0;
}
</style>
