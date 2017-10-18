<template>
    <div class="submit">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="留言">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <button>提交</button>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'submit',
    template: '<submit/>',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  