<!--
 * @Autor: fanmm
 * @Date: 2020-11-13 17:51:04
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-13 17:57:31
-->
<template>
    <div>
        这是第一代
        <C v-bind="$attrs" />
    </div>
    
</template>
<script>
import C from "./C.vue"
export default {
    data(){
        return{

        }
    },
    components:{
      C
    }
}
</script>