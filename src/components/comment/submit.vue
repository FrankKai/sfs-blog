<template>
    <div class="submit">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm2.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="留言" prop="comment">
          <el-input v-model="ruleForm2.comment" auto-complete="off" type="textarea"
          autosize :autosize="{ minRows: 2}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- {{mdname}} -->
    </div>
  </template>
  
  <script>
  //  import axios from 'axios'
   import axiosService from 'util/axios.js';
   export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        }else{
          callback()
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else{
          callback()
        }
      };
      return {
        ruleForm2: {
          comment: '',
          email: '',
          name: ''
        },
        rules2: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        },
        commentObj:{
          category:'',
          mdname:'',
          content:{}
        }
      };
    },
    // computed:{
    //   mdname(){
    //     return this.$store.state.currentArticle.name
    //   }
    // },
    created(){
      this.commentObj.category = this.$store.state.currentArticle.category
      this.commentObj.mdname = this.$store.state.currentArticle.name
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            /*push到指定文章的评论数组中*/
            this.commentObj.content = this.ruleForm2
            axiosService({
              method:'post',
              url:'/comment',
              data:this.commentObj
            }).then((response) => {
              console.log(response);
            })
            this.$socket.emit('comment', 'update comment')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .submit{
    width:30%;
    margin: auto
  }
  </style>
  