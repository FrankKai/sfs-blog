<template class="turnoff">
    <el-button type="danger" @click="open2" size="small">{{STATE}}</el-button>
</template>

<script>
//   import * as Api from '../api/hos/api.js'
  export default {
    props: ['finalDelData'],
    name: 'turnoff',
    template: '<turnoff/>',
    methods: {
      open2 () {
        this.$confirm('此操作将删除该评论' + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    data () {
      return {
        STATE: '删除',
        pageNum:0,
        urlDef: '',
        localName: '',
        userName:''
      }
    }
  }
</script>