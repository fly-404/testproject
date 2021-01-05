<!--
 * @Autor: fanmm
 * @Date: 2020-10-29 11:44:13
 * @LastEditors: fanmm
 * @LastEditTime: 2020-10-29 15:02:20
-->
<template>
  <div>
    <canvas width="500" height="500" id="mycanvas" ref="mycanvas"></canvas>
  </div>
</template>
<script>
let ctx;
let sun;
let earth;
let moon;
export default {
  data() {
    return {
        timer:null
    };
  },
  beforeDestroy(){
      cancelAnimationFrame(this.timer)
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
      let canvas = this.$refs.mycanvas;
      if (!canvas.getContext) return;
      ctx = canvas.getContext("2d");
      sun = new Image();
      earth = new Image();
      moon = new Image();
      sun.src = require("../assets/logo.png");
      earth.src = require("../assets/logo.png");
      moon.src = require("../assets/logo.png");
      let _this = this;
      moon.onload = function() {
        console.log(this);

        _this.draw();
      };
    },
    draw() {
      console.log(1);
      ctx.clearRect(0, 0, 500, 500); //清空所有的内容
      /*绘制 太阳*/
      ctx.drawImage(sun, 0, 0, 300, 300);

      ctx.save();
      ctx.translate(150, 150);

      //绘制earth轨道
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,0,0.5)";
      ctx.arc(0, 0, 100, 0, 2 * Math.PI);
      ctx.stroke();

      let time = new Date();
      //绘制地球
      ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      );
      ctx.translate(100, 0);
      ctx.drawImage(earth, -12, -12);

      //绘制月球轨道
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,.3)";
      ctx.arc(0, 0, 40, 0, 2 * Math.PI);
      ctx.stroke();

      //绘制月球
      ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      );
      ctx.translate(40, 0);
      
      ctx.drawImage(moon, -3.5, -3.5);
      ctx.restore();

     this.timer = requestAnimationFrame(this.draw);
    },
    imgOnload(img) {
      return new Promise(resolve => {
        img.onload = function() {
          resolve(this);
        };
      });
    }
  }
};
</script>
<style lang="scss">
#mycanvas {
  border: 1px solid green;
}
</style>