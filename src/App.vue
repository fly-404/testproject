<!--
 * @Autor: fanmm
 * @Date: 2020-10-10 09:43:00
 * @LastEditors: fanmm
 * @LastEditTime: 2021-05-11 09:53:54
-->
<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <keep-alive :include='includedComponents'>
          <router-view v-if="isshow" />
    </keep-alive>
     <!-- <router-view v-if="isshow" /> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      includedComponents:['echarts1'],
      isshow:true
    }
  },
  provide(){
    return{
      load:this.load,
      loader:this.loader
    }
  },
  mounted(){
    this.resetRem();
    clearTimeout(this.b);
    window.onresize = () => {
      this.b = setTimeout(() => {
        this.resetRem();
      }, 200);
    };
  },
  methods:{
    load(){
      console.log("2222222222")
      this.includedComponents = ['aaaaaaaaaaaaaaaaa'];
      this.isshow = false;
      this.$nextTick(()=>{
        this.isshow = true;
        sessionStorage.setItem("list",new Date())
      })
    },
    loader(){
      this.includedComponents = ['echarts1'];
    },
     resetRem() {
      var hmtlH =
        document.documentElement.clientHeight || document.body.clientHeight;
      var html = document.documentElement;
      html.style.fontSize = (hmtlH / 12) * 1.14 + "px";
    },
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin:0;
}
body,html{
background: #ccc;
height: 100%;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}

</style>
