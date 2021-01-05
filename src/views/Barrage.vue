<!--
 * @Autor: fanmm
 * @Date: 2020-10-28 14:16:46
 * @LastEditors: fanmm
 * @LastEditTime: 2020-10-28 17:15:56
-->
<template>
  <div class="contain">
    <canvas id="myCanvas" width="444" height="500" ref="myCanvas"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      let myCanvas = this.$refs.myCanvas;
      //画布的宽高
      let Cwidth = 500;
      let CHeight = 500;
      // 创建一个画布上绘图的环境
      var ctx = myCanvas.getContext("2d");
      // 一般情况下，canvas的背景颜色是透明的，当生成图片的时候也是透明
      // 如果希望图片有个背景颜色，可以创建一个框高100%的矩形
      // 画布的最底端-这样就可以有个背景颜色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, Cwidth, CHeight);

      //设置颜色也可以适用rgba
    //   ctx.fillStyle = "rgba(0,0,0,0.9)";
      //绘制一个矩形的边框(x, y, width, height)
    //   ctx.strokeRect(50, 100, 100, 100);

      // 可以在页面插入文字
    //   ctx.fillStyle = "#333";

      // 三个参数-文字，横坐标-纵坐标
      ctx.font = "16px Arial";
      ctx.fillText("今天是个好日子", 50, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect(200, 30, 80, 50);
      
      //空心文字
      ctx.font = "30px Arial";
      ctx.strokeText("Hello World", 10, 300);

      // 创建渐变
      var grd = ctx.createLinearGradient(0, 0, 200, 0);
      grd.addColorStop(0, "red");
      grd.addColorStop(1, "white");
      // 填充渐变
      ctx.fillStyle = grd;
      ctx.fillRect(10, 10, 150, 80);

      
      //   ctx.scale(2, 2);
      //   ctx.strokeStyle = "#000";
      //   ctx.lineWidth = 1;
      //   ctx.strokeRect(10, 10, 100, 100);
      // 还可以插入图片
      // 首先创建一个图片标签
      // 等待图片加载完之后在渲染画布中
      // let imgObj = new Image()
      // imgObj.src = 'http://img4.imgtn.bdimg.com/it/u=3704809141,1787261659&fm=11&gp=0.jpg'
      // let imgUrl = await this.imgOnload(imgObj)
      // ctx.drawImage(imgUrl, 250, 200, 150, 150)

      // 这里图片的我注释了，，因为跨域的图片链接，在生成图片时会失败，你可以使用本地图片
      // 基本步骤就这样

      // 生成图片（图片的格式）
      let imageUrl = myCanvas.toDataURL("image/png", 0.5);

      // base64图片地址就获取到了
      // 现实中存在两种情况，一个显示页面中，点击下载，这个就简单了，可以利用a标签进行下载
      //还有一种情况就是，图片base64地址生成后，自动下载
      //   this.downloadFile(imageUrl, "1.png");
    },
    // 加载图片-二维码-条形码
    imgOnload(img) {
      return new Promise(resolve => {
        img.onload = function() {
          resolve(this);
        };
      });
    },
    // 创建下载图片事件
    downloadFile(data, filename) {
      //创建一个具有指定的命名空间URI和限定名称的元素
      var save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = data;
      save_link.download = filename;
      // 绑定下载事件
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      save_link.dispatchEvent(event);
    }
  }
};
</script>
<style lang="scss">
#myCanvas {
  border: 1px solid red;
}
</style>