<!--
 * @Autor: fanmm
 * @Date: 2020-10-10 09:43:00
 * @LastEditors: fanmm
 * @LastEditTime: 2020-12-08 13:51:51
-->
<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
*{
  padding: 0;
  margin:0;
}
body{
background: #ccc;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  
  
}

</style>
