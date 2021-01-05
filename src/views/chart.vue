<!--
 * @Autor: fanmm
 * @Date: 2020-11-24 09:16:21
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-24 17:59:00
-->
<template>
  <div class="chart-container">
    <chart :datas ="datas" height="100%" width="100%" />
    <!-- <div id="myCharts" style="width:100%;height:100%;border:1px solid rde;">

    </div> -->
  </div>
</template>

<script>
import Chart from '@/components/BarChart.vue'
// import Bar from "@/components/Bar/Bar.js"

export default {
  name: 'BarChart',
  components: { Chart },
  data(){
      return{
          datas:[["周三","入所",Math.floor(Math.random()*200)],["周一","入所",Math.floor(Math.random()*200)],["周二","入所",Math.floor(Math.random()*200)],["周四","入所",Math.floor(Math.random()*200)],["周五","入所",Math.floor(Math.random()*200)],["周一","出所",Math.floor(Math.random()*200)],["周二","探监",Math.floor(Math.random()*200)],["周六","探监",Math.floor(Math.random()*200)]]
      }
  },
  mounted(){
      this.initChart();
  },
  methods:{
      initChart(){
        //   let myEcharts = new Bar("myCharts");
        // //   console.log(Bar)
        // myEcharts.addDate(this.datas[0]);
        // myEcharts.addDate(this.datas[1]);
        // myEcharts.addDate(this.datas[2]);
        // myEcharts.addDate(this.datas[3]);
        // myEcharts.addDate(this.datas[4]);
        // myEcharts.addDate(this.datas[5]);
        // myEcharts.addDate(this.datas[6]);
        // myEcharts.addDate(this.datas[7]);
        // myEcharts.updata();
      }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

