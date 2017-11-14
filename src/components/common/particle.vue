<template>
  <div class="particle">
    <canvas id="particleCanvas"></canvas>
  </div>
</template>

<script>
export default {
    name: 'particle',
    template: '<particle/>',
    data: function() {
      return {
      }
    },
    mounted() {
        console.log(this)
        // let self = this
        let canvas = document.getElementById("particleCanvas")
        let ctx = canvas.getContext("2d")
        let arr = []
        let k = 0
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        class Particle {
            constructor(x, y, r){
                this.x = x;
                this.y = y;
                this.r = r;
            }
        }
        Particle.prototype.drawArc = function() {
                ctx.beginPath();
                ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false)
                ctx.stroke();
                ctx.fillStyle = randomColor();
                ctx.fill();
        }
        function generateAndRender(){
            requestAnimationFrame(generateAndRender)
            k++;
            if(k>150){
                ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
                k = 0
            }
            for(let i = 0;i<2;i++){
                let rx = Math.random()*canvas.width
                let ry = Math.random()*canvas.height
                let rr = Math.random()*15
                let item = new Particle(rx,ry,rr);
                arr.push(item);
            }
            arr.forEach((item)=>{
                item.drawArc();
            })
            arr = [];
        }
        function randomColor(){
            return "#" + (Math.random() * 0xffffff << 0).toString(16);
        }
        requestAnimationFrame(generateAndRender)
    }
}
</script>

<style scoped>
.particle{
  top:0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align:center;
  z-index: -100;
  overflow: hidden;
}
</style>