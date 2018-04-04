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
          this.userName = location.search.substring(10)
          this.pageNum = this.$store.getters.page
          this.localName = this.finalDelData.name
          this.urlDef = Api.Ip.hosDev+'user/' + this.localName + '?enable=N'
          this.$store.dispatch("postTurnOnUser",
            {
              url:this.urlDef,
              name:this.localName,
              num:this.pageNum,
              username:this.userName,
              searchName:this.$store.getters.search.name
            }
          )
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