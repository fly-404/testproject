<!--
 * @Autor: fanmm
 * @Date: 2020-11-17 10:07:41
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-26 09:17:13
-->
<template>
  <div>
    <!-- 对话框 -->
    <!-- <div class="triangle">
        </div> -->
    <!-- <div class="dialog">这是一条信息</div> -->
    <!-- 平行四边形 -->
    <!-- <div class="parallel"></div> -->
    <!-- 星星 -->
    <!-- <div class="star"></div> -->
    <!-- 爱心 -->
    <!-- <div class="heart"></div> -->
    <!-- 太极 -->
    <!-- <div class="taiji"></div> -->
    <!-- 字节跳动 -->
    <!-- <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div> -->
    <!-- 透明边框 -->
    <!-- <div class="op_border"></div> -->
    <!-- 多重边框 -->
    <!-- <div class="borders"></div> -->
    <!-- 灵活的背景定位 -->
    <!-- background-position:设置背景图像的起始位置 可选值：center、top left、top 10px left 10px、10% 10%、10px 10px；
    background-origin:默认是padding-box 可选 border-box content-box -->
    <!-- 边框内圆角 -->
    <!-- <div class="raduis">
      I have a nice subtle inner rounding, don't I look pretty?
    </div> -->
    <!-- 条纹背景 -->
    <!-- <div class="gradient">
    </div> -->
    <!-- 复杂的背景图案 -->
    <!-- <div class="image_gradient"></div> -->
    <ball/>
  </div>
</template>
<script>
import ball from "../components/css/ball"
export default {
  components:{
    ball
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.triangle {
  width: 0;
  height: 0;
  border: 50px solid;
  border-color: red yellow green gray;
}
.dialog {
  width: 200px;
  line-height: 2;
  font-size: 16px;
  color: white;
  background-color: #ccc;
  position: relative;
  margin-top: 20px;
  margin-left: 50px;
  &::before {
    content: "";
    border: 8px solid;
    border-color: transparent #ccc transparent transparent;
    position: absolute;
    left: -16px;
    top: 8px;
  }
}
//平行四边形
.parallel {
  width: 200px;
  height: 100px;
  background: lightblue;
  transform: skew(-20deg, 0);
  margin-top: 30px;
  margin-left: 20px;
}
//星星
.star {
  position: relative;
  margin: 200px auto;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 70px 100px;
  transform: rotate(35deg);
  &::before {
    position: absolute;
    content: "";
    top: -128px;
    left: -95px;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 80px 30px;
    transform: rotate(-35deg);
  }
  &::after {
    position: absolute;
    content: "";
    top: -45px;
    left: -140px;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 70px 100px;
    transform: rotate(-70deg);
  }
}
//爱心
.heart {
  width: 100px;
  height: 90px;
  position: relative;
  margin: 100px auto;
  background: lightblue;
  &::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 90px;
    background: red;
    border-radius: 50px 45px 0 0;
    /* 设置旋转中心 */
    transform-origin: 0 100%;
    transform: rotate(-45deg);
  }
  &::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 90px;
    top: -35px;
    left: 15px;
    background: red;
    border-radius: 50px 45px 0 0;
    /* 设置旋转中心 */
    transform-origin: 0 100%;
    transform: rotate(45deg);
  }
}
//太极
.taiji {
  //   position: relative;
  //   width: 150px;
  //   height: 300px;
  //   margin: 100px auto;
  //   border-radius: 50%;
  //   background-color: red;
  //   border-left: 150px solid #000;
  position: relative;
  width: 300px;
  height: 300px;
  margin: 100px auto;
  border-radius: 50%;
  background-color: #000;
  /*从0-50%用背景色，50%开始到100%用#fff */
  background-image: linear-gradient(to right, transparent 50%, #fff 50%);
  &::before {
    content: "";
    position: absolute;
    left: 75px;
    width: 0;
    height: 0;
    padding: 25px;
    border-radius: 50%;
    border: 50px solid #000;
    background: #fff;
    background-clip: padding-box;
  }
  &::after {
    content: "";
    position: absolute;
    top: 150px;
    left: 75px;
    width: 0;
    height: 0;
    padding: 25px;
    border-radius: 50%;
    border: 50px solid #fff;
    background: #000;
    background-clip: padding-box;
  }
}
.spinner {
}
.op_border {
  width: 100px;
  height: 100px;
  background: lightcoral;
  border: 20px solid hsla(0, 0%, 100%, 0.5);
  background-clip: padding-box; //background-origin 属性指定了背景图像的位置区域。content-box, padding-box,和 border-box区域内可以放置背景图像;; background-clip 背景剪裁属性是从指定位置开始绘制
}
// box-shadow: h-shadow(必需的。水平阴影的位置。允许负值) v-shadow(必需的。垂直阴影的位置。允许负值) blur(可选。模糊距离) spread(可选。阴影的大小) color(可选。阴影的颜色) inset(可选。从外层的阴影（开始时）改变阴影内侧阴影);
.borders {
  width: 100px;
  height: 100px;
  background: lightcoral;
  box-shadow: 0 0 0 10px red;
}
.raduis {
  background: tan;
  border-radius: 0.8em;
  padding: 1em;
  box-shadow: 0 0 0 0.3em red;
  outline: 0.6em solid #655;
}
.gradient {
  width: 180px;
  height: 180px;
  // background: linear-gradient(#fb3 30%, #58a 0);
  // background-size: 100% 30px;
  //斜向条纹
  background: linear-gradient(
    45deg,
    #fb3 25%,
    #58a 0,
    #58a 50%,
    #fb3 0,
    #fb3 75%,
    #58a 0
  );
  background-size: 30px 30px;
}
.image_gradient {
  width: 180px;
  height: 180px;
  background: #58a;
  background-image: linear-gradient(white 2px, transparent 0),
    linear-gradient(90deg, white 2px, transparent 0),
    linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0),
    linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
  background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}
</style>