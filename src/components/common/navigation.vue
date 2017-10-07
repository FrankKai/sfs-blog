<template>
  <div class="navigation">
  <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content bg-purple"><a href="http://localhost:8080/#/blog">博客</a></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"><a href="http://localhost:8080/#/category">目录</a></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"><a href="http://localhost:8080/#/record">归档</a></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"><a href="http://localhost:8080/#/tag">标签</a></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"><a href="http://localhost:8080/#/home">返回封面</a></div></el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  template:'<navigation/>',
  data() {
      return {
      };
    },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  /* min-height: 36px; */
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
