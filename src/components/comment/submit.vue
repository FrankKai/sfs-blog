<template>
  <div class="submit">
    <div class="submit-header">
      留言板
    </div>
    <div class="submit-main">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="commentSubmit"
        label-width="40px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm2.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="ruleForm2.email"
            auto-complete="off"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="留言" prop="comment">
          <el-input
            v-model="ruleForm2.comment"
            auto-complete="off"
            type="textarea"
            autosize
            :autosize="{ minRows: 4 }"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('commentSubmit')"
            size="small"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm2')" size="small"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axiosService from "util/axios.js";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        comment: "",
        email: "",
        name: ""
      },
      rules2: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      },
      commentObj: {
        category: "",
        mdname: "",
        content: {}
      }
    };
  },
  created() {
    this.commentObj.category = this.$store.state.currentArticle.category;
    this.commentObj.mdname = this.$store.state.currentArticle.name;
  },
  methods: {
    ...mapActions(["UPDATE_GLOBAL_BLOGS"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commentObj.content = this.ruleForm2;
          axiosService({
            method: "post",
            url: "/comment",
            data: this.commentObj
          })
            .then(response => {
              if (response.status === 200) {
                // 触发全局更新action
                this.UPDATE_GLOBAL_BLOGS();
                this.resetForm();
              }
            })
            .catch(() => {
              this.resetForm("commentSubmit");
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/deep/.el-form-item {
  margin-bottom: 0;
}
.submit {
  &-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;

  }
}
</style>
