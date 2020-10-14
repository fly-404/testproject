/*
 * @Author: fanmm 
 * @Date: 2020-10-10 10:29:52 
 * @Last Modified by: fanmm
 * @Last Modified time: 2020-10-10 10:39:02
 */

<template>

  <div id="chart" style="width: 400px;height:400px;"></div>

</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted(){
     this.initEchart();
  },
  methods:{
    initEchart(){
      let myChart = this.$echarts.init(document.getElementById("chart"));
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
