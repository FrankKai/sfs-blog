<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>
  
<script>
export default {
  name: 'app'
}
</script>

<style>
/* #app {
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  text-align: center;
  width:100%;
  height:100%;
  background-color: #B7F5DE; 
}*/
body{
  padding: 0;
  margin: 0;
}
#app{
  padding:0;
  margin:0;
  display: flex;
  justify-content: center;
  /* height: 100%; */
  width: 100%;
  position: absolute;
  /* background-color: rgba(183,245,222,0.5); */
}
</style>
  