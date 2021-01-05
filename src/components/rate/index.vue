<!--
 * @Autor: fanmm
 * @Date: 2021-01-05 09:19:16
 * @LastEditors: fanmm
 * @LastEditTime: 2021-01-05 09:43:51
-->
<template>
  <div>
    <div class="rate-content">
      <input  type="radio" name="rate" />
      <input  type="radio" name="rate" />
      <input  type="radio" name="rate" />
      <input  type="radio" name="rate" />
      <input  type="radio" name="rate" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import"~@/assets/fonts/iconfont.css";
/* 去掉默认样式 */
input {
  -webkit-appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
}

:root {
  /*高亮颜色*/
  --main: #ffa822;
  /*默认颜色*/
  --basic: #999;
}

.rate-contentinput[name="rate"] {
  font-family: "iconxingxing";
  /*之前引入的iconfont字体*/
  font-size: 30px;
  padding-right: 10px;
}

.rate-contentinput[name="rate"]::after {
  content: "\e645";
  color: var(--basic);
  /*加点颜色过渡效果*/
  transition: color .4s ease;
}
//点击
input[name="rate"]:checked::after {
  content: "\e73c";
  color: var(--main);
}
</style>