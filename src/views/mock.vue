<!--
 * @Autor: fanmm
 * @Date: 2020-11-13 11:47:12
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-13 12:00:17
-->
<template>
    <div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
this.getMock();
    },
    methods:{
        getMock(){
           this.axios.get('/api/test').then(res=>{
               console.log(res)
           }) 
        }
    }
}
</script>