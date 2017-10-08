<template>
  <div class="tag">
    <!-- {{msg}} -->
    <navigation></navigation>
    <div>
      <el-tag v-for="(value,key) in tags" :key="key">
        {{key}}  
        {{value}}
      </el-tag>
    </div>
  </div>
</template>

<script>
import navigation from '../components/common/navigation.vue'
export default {
  name: 'tag',
  template: '<tag/>',
  components:{navigation},
  data () {
    return {
      msg: 'tag',
      tags: {}
    }
  },
  created(){
    let data = this.$store.state.data[0]
    let arr = []
    let disarr = []
    let obj = {}
    for(var i=0;i<data.length;i++){
      let subarr = data[i].tags
      subarr.forEach((v)=>{
        arr.push(v)
      });
    }
    console.log(disarr)
    disarr = [...new Set(arr)]
    // this.tags = disarr
    // console.log([...new Set(disarr)])
    disarr.forEach(function(i,v){
      obj[i]=1
    })
    for(var i=0;i<arr.length;i++){
      for(var j=i+1;j<arr.length;j++){
        if(arr[i]===arr[j]){
          obj[Object.keys(obj)[i]]++
          break;
        }
      }
    }
    this.tags = obj
    console.log(arr)
    console.log(disarr)
    console.log(obj)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag{
  width: 80%;
}
.el-tag{
  margin-left: 5px;
}
</style>
