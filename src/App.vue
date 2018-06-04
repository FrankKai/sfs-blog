<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import axiosService from 'util/axios.js';
export default {
  name: 'app',
  // mounted(){
  //   axiosService({
  //     method:'get',
  //     url:"/axsssos"
  //   }).then((res)=>{
  //     console.log(res);
  //   })
  // }
  //测试webstorm commit
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  background-color: rgba(183,245,222,0.5);
}
#app{
  padding:0;
  margin:0;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
}

/*
** desc: ./comments/editor.vue 左侧textarea高度 css tricks
*/
.el-textarea__inner{
  height: 100%;
}
</style>
