<template>
  <div class="birefarticle">
    <!-- {{msg}} -->
    <el-row>
      <el-col :span="30" v-for="(o, index) in 1" :key="o">
          <el-card :body-style="{ padding: '0px' }">
            <img :src=imgSrc class="image">
            <div style="padding: 14px;">
                <!-- <span>{{arcindex}}</span> -->
                <p>{{title}}</p>
                <div>
                  <el-tag v-for="item in tags" :key="item" type="primary">{{item}}</el-tag>
                </div>
                <div class="bottom clearfix">
                <time class="time">{{ birthtime.slice(0,-5) }}</time>
                <el-button type="info" class="button" @click="filteArticle()">阅读全文</el-button>
                </div>
            </div>
          </el-card>
      </el-col>
    </el-row>
    <!-- <p>{{index}}</p> -->
  </div>
</template>

<script>
import { FILTE_ARTICLE } from '../../store/mutation-types'
export default {
  name: 'birefarticle',
  template: '<birefarticle/>',
  props:['index','title','item','birthtime','imgsrc'],
  // arcindex:0,
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App',
      // currentDate: new Date()
    }
  },
  computed:{
    arcindex(){
      return this.index
    },
    tags(){
      return this.$store.state.data[0][this.index].tags
    },
    imgSrc(){
      return this.imgsrc
    }
  },
  methods:{
    filteArticle: function(){
      this.$store.commit(FILTE_ARTICLE,this.index);
      this.$router.push({path:'/blog/'+this.title});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.birefarticle{
  width: 70%;
  /* text-align: center; */
  margin:10px 0;
}
.time {
font-size: 13px;
color: #999;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image {
margin: 10px auto 0 auto;
display: block;
width: 40%;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.el-tag{
  margin-right: 5px;
}
</style>
