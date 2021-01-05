<!--
 * @Autor: fanmm
 * @Date: 2020-11-18 11:54:23
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-19 14:31:29
-->
<template>
  <div>
    <!-- 切角效果 -->
    <!-- <div class="radial"></div> -->
    <!-- 梯形 -->
    <!-- <div class="tab"></div> -->
    <!-- 折角效果 -->
    <!-- <div class="aaa"></div> -->
    <!-- 动画 -->
    <!-- <div class="pipe">
      <div class="ball"></div>
    </div> -->
    <!-- 闪烁 -->
    <!-- <div class="highlight">mormal</div> -->
    <!-- 打字动画 -->
    <h1>CSS is awesome!</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
div {
  width: 200px;
  height: 200px;
}
// 切角
.cut {
  background: #58a;
  background: linear-gradient(135deg, transparent 15px, #58a 0) top left,
    linear-gradient(-135deg, transparent 15px, #58a 0) top right,
    linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
    linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
}
.radial {
  background: #58a;
  background: radial-gradient(circle at top left, transparent 15px, #58a 0) top
      left,
    radial-gradient(circle at top right, transparent 15px, #58a 0) top right,
    radial-gradient(circle at bottom right, transparent 15px, #58a 0) bottom
      right,
    radial-gradient(circle at bottom left, transparent 15px, #58a 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
}
.tab {
  width: 200px;
  height: 100px;
  position: relative;
  display: inline-block;
  padding: 0.5em 1em 0.35em;
  color: white;
}
.tab::before {
  content: ""; /* 用伪元素来生成一个矩形 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #58a;
  transform: perspective(0.5em) rotateX(5deg);
}
.aaa {
  background: rgb(180, 3, 56); /* 回退样式 */
  //   background: linear-gradient(-135deg, transparent 2em, #58a 0);
  background: linear-gradient(
        to left bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.4) 0
      )
      no-repeat 100% 0 / 2em 2em,
    linear-gradient(-135deg, transparent 1.5em, #58a 0);
}
.pipe {
  @keyframes bounce {
    60%,
    80%,
    to {
      transform: translateY(400px);
      animation-timing-function: ease-out;
    }
    70% {
      transform: translateY(300px);
    }
    90% {
      transform: translateY(360px);
    }
  }
  width: 30px;
  height: 420px;
  background: linear-gradient(lightblue, white);
  border: 1px solid red;
  border-bottom: 10px solid green;
  .ball {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: pink;
    animation: bounce 3s ease-in;
  }
}
@keyframes blink-smooth {
  50% {
    color: transparent;
  }
}
.highlight {
  height: 40px;
  width: 100px;
  background: lightblue;
  color: #fff;
  animation: 1s blink-smooth 3 steps(1);
}
@keyframes typing {
  from {
    width: 0;
  }
}
h1 {
  width: 15ch; /* 文本的宽度 */
  overflow: hidden;
  white-space: nowrap;
  animation: typing 6s steps(15);
}
</style>