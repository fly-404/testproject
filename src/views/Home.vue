<!--
 * @Autor: fanmm
 * @Date: 2021-01-05 12:29:51
 * @LastEditors: fanmm
 * @LastEditTime: 2021-01-21 09:06:30
-->
<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <tabb/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import tabb  from "@/components/table.vue"

export default {
  name: "home",
  components: {
    HelloWorld,
    tabb
  },
  data(){
    return{
      str:'kWZvpdq6boUOkJtk2AQgPg==',
      str2:'张三'
    }
  },
  methods:{
    aes(){
      let a = this.$encrypt(this.str2);
       console.log(a);
       let b = this.$decrypt(this.str);
       console.log(b);
       
    }
  },
  mounted(){
    // this.aes();
  }
};
</script>
