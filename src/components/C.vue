<!--
 * @Autor: fanmm
 * @Date: 2020-11-13 17:52:07
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-13 17:59:59
-->
<template>
    <div>
        这是第二代
        <D v-bind="$attrs" />
    </div>
</template>
<script>
import D from "./D.vue"
export default {
    data(){
        return{
            
        }
    },
    components:{
        D
    },
    mounted(){
        console.log(this.$attrs)
    }
}
</script>