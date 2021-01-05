<!--
 * @Autor: fanmm
 * @Date: 2020-11-13 17:52:31
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-13 18:01:16
-->
<template>
    <div>
        这是第三代
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    mounted(){
        console.log(this.$attrs.msg)
    }
}
</script>