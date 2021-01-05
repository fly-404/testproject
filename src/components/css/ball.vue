<!--
 * @Autor: fanmm
 * @Date: 2020-11-26 09:13:21
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-26 09:22:00
-->
<template>
        <div class="effect">
        <div class="blackball"></div>
        <div class="redball"></div>
    </div> 
</template>
<script>
export default {
    data(){

    }
}
</script>
<style lang="scss" scoped>
    .effect {
            width: 360px;
            height: 100%;
            padding-top: 50px;
            /* 调整对比度 */
            filter: contrast(10);
            background: #fff;
            margin: auto;
        }
 
        .blackball {
            width: 100px;
            height: 100px;
            background: black;
            padding: 10px;
            border-radius: 50%;
            margin: 0 auto;
            z-index: 1;
            /* 高斯模糊 */
            filter: blur(5px);
        }
 
        .redball {
            width: 60px;
            height: 60px;
            background: #f00;
            padding: 10px;
            border-radius: 50%;
            position: absolute;
            top: 70px;
            left: 50px;
            z-index: 2;
            /* 高斯模糊 */
            filter: blur(5px);
            animation: rball 6s infinite;
        }
 
        /* 运动轨迹动画 压缩 */
        @keyframes rball {
 
            0%,
            100% {
                left: 30px;
                width: 60px;
                height: 60px;
            }
 
            4%,
            54% {
                width: 60px;
                height: 60px;
            }
 
            10%,
            60% {
                width: 50px;
                height: 70px;
            }
 
            20%,
            70% {
                width: 60px;
                height: 60px;
            }
 
            34%,
            90% {
                width: 70px;
                height: 50px;
            }
 
            41% {
                width: 60px;
                height: 60px;
            }
 
            50% {
                left: calc(100% - 95px);
                width: 60px;
                height: 60px;
            }
        }

</style>