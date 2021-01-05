import echarts from 'echarts'
class BarChart {
    constructor(id, params) {
        this.id = id;
        this.params = params;
        this.init();
    }
    echarts = null;
    init() {  
        this.echarts = echarts.init(document.getElementById(this.id));
    }
    colors = ['#6ab1ff', '#31d4d3', '#f45c76', '#f160c0', '#393939', '#f5b031', '#fad797', '#59ccf7', '#c3b4df'];
    option = {
        color:this.colors,
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
            data:[],
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
              data: [],
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
          series: [],
    }
    xData = [];//x轴坐标
    yName = [];//tooltip种类
    yData = [];//数据集合
    //添加数据集合
    add(data) {
        console.log('111')
         //获取横坐标，数据种类
      data.forEach((item, index) => {
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
        data.forEach((item1, index1) => {
          if (item1[0] == item) {
            let dex = this.yName.indexOf(item1[1]);
            this.yData[dex][index] = item1[2];
          }
        });
      });
    }
    //添加一条数据
    addDate(data) {
         let index,dex;
         //判断x坐标是否已存在
        if(this.xData.indexOf(data[0]) > -1){
             index = this.xData.indexOf(data[0]);
        }else{
            index = this.xData.length;
            this.xData.push(data[0]);
            this.yData.forEach((item,index)=>{
                item.push(0)
            });   
        }
        //判断yName是否已存在
        if(this.yName.indexOf(data[1])>-1){
                
            dex = this.yName.indexOf(data[1]);
        }else{
             dex = this.yName.length;
             this.yName.push(data[1]);
             this.yData.push(new Array(this.xData.length).fill(0));
        }
        this.yData[dex][index] = data[2];
    }
    //显示图表
    updata() {
        console.log(this.xData,this.yName,this.yData)
      let series = [];
      this.yName.forEach((item, index) => {
        let obj = {
          name: item,
          type: "bar",
          stack: "total",
          barMaxWidth: "40%",
          barGap: "10%",
          data: this.yData[index],
        };
        series.push(obj);
      });
      this.option.series = series;
      this.option.xAxis[0].data = this.xData;
      this.option.legend.data = this.yName;
      this.echarts.setOption(this.option);
    }
    //浏览器绑定resize事件
    onResize(){
        window.addEventListener("resize", this.reSize.bind(this));
    }
    //echarts resize
    timer = null;
    reSize(){
       let _this = this;
        if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(function(){
              _this.echarts && _this.echarts.resize()
          }, 200);
    }
    //取消resize事件
    unResize(){
        window.removeEventListener("resize", this.reSize.bind(this));
    }

/*  用法示例：
   datas:[["周三","入所",Math.floor(Math.random()*200)],["周一","入所",Math.floor(Math.random()*200)],["周二","入所",Math.floor(Math.random()*200)],["周四","入所",Math.floor(Math.random()*200)],["周五","入所",Math.floor(Math.random()*200)],["周一","出所",Math.floor(Math.random()*200)],["周二","探监",Math.floor(Math.random()*200)],["周六","探监",Math.floor(Math.random()*200)]] 
   组件引入js
   import Bar from "@/components/.../Bar.js"
   初始化
   let myEcharts = new Bar(元素id);
   赋值
   myEcharts.add(this.datas); 或 myEcharts.addDate(this.datas[0]);
   显示
   myEcharts.updata(); */
}
export default BarChart;