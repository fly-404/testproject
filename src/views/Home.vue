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
  name: "Home",
  components: {
    HelloWorld,
    tabb
  }
};
</script>
