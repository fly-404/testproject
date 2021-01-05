<!--
 * @Autor: fanmm
 * @Date: 2020-11-24 09:15:34
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-24 17:59:24
-->
<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    id: {
      type: String,
      default: "myChart",
    },
    width: {
      type: String,
      default: "400px",
    },
    height: {
      type: String,
      default: "400px",
    },
    datas: { //数据 例： [["周一","入所",Math.floor(Math.random()*200)],...]
      type: Array,
      default: function () {
        return new Array();
      },
    },
    colors:{ //自定义颜色集合
        type:Array,
        default: function () {
        return new Array();
      },
    }
  },
  data() {
    return {
      chart: null,
      xData: [], //x轴坐标
      yName: [], //yname集合
      yData: [], //yData集合
      timer: null, //定时器
    };
  },
  mounted() {
    this.processData();
    this.initResize();
  },

  methods: {
    //处理数据
    processData() {
      //获取横坐标，数据种类
      this.datas.forEach((item, index) => {
        if (this.xData.indexOf(item[0]) == -1) {
          this.xData.push(item[0]);
        }
        if (this.yName.indexOf(item[1]) == -1) {
          this.yName.push(item[1]);
        }
      });
      //获取各种类对应数据集合
      this.yName.forEach((ite, dex) => {
        this.yData.push(new Array(this.xData.length).fill(0));
      });
      this.xData.forEach((item, index) => {
        this.datas.forEach((item1, index1) => {
          if (item1[0] == item) {
            let dex = this.yName.indexOf(item1[1]);
            this.yData[dex][index] = item1[2];
          }
        });
      });
      this.initChart();
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));

      //配置series
      let series = [];
      this.yName.forEach((item, index) => {
        let obj = {
          name: item,
          type: "bar",
          stack: "total",
          barMaxWidth: "40%",
          barGap: "10%",
          itemStyle:{
            color:this.colors[index]? this.colors[index] : '',
          },
          data: this.yData[index],
        };
        series.push(obj);
      });
      this.chart.setOption({
        backgroundColor: "#ffffff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff",
            },
          },
          extraCssText:'text-align:left;'
        },
        grid: {
          left: "5%",
          right: "5%",
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "5%",
          top: "10%",
          textStyle: {
            color: "#90979c",
          },
          data: this.yName,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            data: this.xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              //坐标轴轴线
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              //坐标轴刻度
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
            //scale:true //true坐标不强制0
          },
        ],
        dataZoom: [ //缩放
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 0,
            end: 100,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: series,
      });
    },
    //绑定resize事件
    initResize() {
      window.addEventListener("resize", this.resizeHandler);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", this.resizeHandler);
        if (!this.chart) {
          return;
        }
        this.chart.dispose();
        this.chart = null;
      });
    },
    //chart resize
    resize() {
      this.chart && this.chart.resize();
    },
    //延时执行
    resizeHandler() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.resize();
      }, 200);
    },
  },
};
</script>
