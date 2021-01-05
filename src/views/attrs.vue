<!--
 * @Autor: fanmm
 * @Date: 2020-11-13 17:53:16
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-13 17:55:46
-->
<template>
    <div>
        这是祖组件
        <B :msg="msg" :test="test" />
    </div>
</template>
<script>
import B from "../components/B"
export default {
    data(){
        return{
           msg:{a:1,b:2},
           test:"这是数据"
        }
    },
    components:{
        B
    }
}
</script>