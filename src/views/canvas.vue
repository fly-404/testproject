<!--
 * @Autor: fanmm
 * @Date: 2020-10-28 17:16:06
 * @LastEditors: fanmm
 * @LastEditTime: 2020-10-29 11:39:09
-->
<template>
  <div>
    <img src="../assets/logo.png" alt="" width="300" />
    <br />
    <canvas width="500" height="500" id="mycanvas"></canvas>
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
      let canvas = document.getElementById("mycanvas");
      if (!canvas.getContext) return;
      let ctx = canvas.getContext("2d");

      //绘制矩形
      // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      // ctx.fillRect(0, 0, 50, 50); //（x,y,width,height）
      /* 1、fillRect(x, y, width, height)：绘制一个填充的矩形。
         2、strokeRect(x, y, width, height)：绘制一个矩形的边框。
         3、clearRect(x, y, widh, height)：清除指定的矩形区域，然后这块区域会变的完全透明。
       */
      //线段
      // ctx.beginPath(); //新建一条path
      // ctx.moveTo(50, 50); //把画笔移动到指定的坐标
      // ctx.lineTo(200, 50); //绘制一条从当前位置到指定坐标(200, 50)的直线.
      // ctx.lineTo(200, 200);
      // //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
      // ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
      // ctx.closePath();
      // ctx.stroke(); //绘制路径。
      //圆弧----arc(x, y, r, startAngle, endAngle, anticlockwise): 以(x, y) 为圆心，以r 为半径，从 startAngle 弧度开始到endAngle弧度结束。anticlosewise 是布尔值，true 表示逆时针，false 表示顺时针(默认是顺时针)。
      //   ctx.beginPath();
      //   ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
      //   console.log(Math.PI)
      //   ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(50, 50);
      //   //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
      // ctx.arcTo(200, 50, 200, 200, 100);
      // ctx.lineTo(200, 200)
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.rect(50, 50, 10, 10);
      // ctx.rect(200, 50, 10, 10)
      // ctx.rect(200, 200, 10, 10)
      // ctx.fill()

      //贝塞尔曲线
      // ctx.beginPath();
      // ctx.moveTo(10, 200); //起始点
      // var cp1x = 40,
      //   cp1y = 100; //控制点
      // var x = 200,
      //   y = 200; // 结束点
      // //绘制二次贝塞尔曲线
      // ctx.quadraticCurveTo(cp1x, cp1y, x, y);
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(40, 200); //起始点
      // var cp1x = 20,
      //   cp1y = 100; //控制点1
      // var cp2x = 100,
      //   cp2y = 120; //控制点2
      // var x = 200,
      //   y = 200; // 结束点
      // //绘制三次贝塞尔曲线
      // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      // ctx.stroke();
      //颜色填充
      // for (var i = 0; i < 6; i++) {
      //   for (var j = 0; j < 6; j++) {
      //     ctx.fillStyle =
      //       "rgb(" +
      //       Math.floor(255 - 42.5 * i) +
      //       "," +
      //       Math.floor(255 - 42.5 * j) +
      //       ",0)";
      //     ctx.fillRect(j * 50, i * 50, 50, 50);
      //   }
      // }
      //边框填充
      // for (var i = 0; i < 6; i++) {
      //   for (var j = 0; j < 6; j++) {
      //     ctx.strokeStyle = `rgb(${this.randomInt(0, 255)},${this.randomInt(
      //       0,
      //       255
      //     )},${this.randomInt(0, 255)})`;
      //     ctx.strokeRect(j * 50, i * 50, 40, 40);
      //   }
      // }

      //线宽
      // ctx.beginPath();
      // ctx.moveTo(10, 10);
      // ctx.lineTo(100, 10);
      // ctx.lineWidth = 10;
      // //lineCap = type  butt：线段末端以方形结束；round：线段末端以圆形结束；square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
      // ctx.lineCap = 'round';
      // ctx.stroke();

      // var lineJoin = ['round', 'bevel', 'miter'];
      // ctx.lineWidth = 20;

      // for (var i = 0; i < lineJoin.length; i++){
      //   // lineJoin = type  round 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。bevel 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。miter(默认) 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

      //     ctx.beginPath();
      //     ctx.moveTo(50, 50 + i * 50);
      //     ctx.lineTo(100, 100 + i * 50);
      //     ctx.lineTo(150, 50 + i * 50);
      //     ctx.lineTo(200, 100 + i * 50);
      //     ctx.lineTo(250, 50 + i * 50);
      //      ctx.lineJoin = lineJoin[i];
      //     ctx.stroke();
      // }

      //虚线
      // ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
      // ctx.lineDashOffset = -0;
      // ctx.strokeRect(50, 50, 210, 210);
      //文本
      // ctx.font = "100px sans-serif"
      //textAlign = value 文本对齐选项。 可选的值包括：start, end, left, right or center。 默认值是 start。textBaseline = value 基线对齐选项，可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。。direction = value 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit
      // ctx.textAlign='start'
      // ctx.textBaseline = 'bottom'

      // ctx.fillText("天若有情", 10, 100);
      // ctx.strokeText("天若有情", 10, 200)

      //绘制图片
      // var img = new Image(); // 创建一个<img>元素
      // img.src = require("../assets/logo.png"); // 设置图片源地址
      // img.onload = function() {
      //   // 参数 1：要绘制的 img
      //   // 参数 2、3：绘制的 img 在 canvas 中的坐标
      //drawImage这个方法多了 2 个参数：width 和 height，这两个参数用来控制 当像 canvas 画入时应该缩放的大小。
      //   ctx.drawImage(img, 0, 0);
      // };

      // var img = document.querySelector("img");
      // ctx.drawImage(img, 0, 0);

      //save() 和 store()
      //关于 save() ：Canvas状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存
      // //
      // ctx.fillRect(0, 0, 150, 150); // 使用默认设置绘制一个矩形
      // ctx.save(); // 保存默认状态

      // ctx.fillStyle = "red"; // 在原有配置基础上对颜色做改变
      // ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

      // ctx.save(); // 保存当前状态
      // ctx.fillStyle = "#FFF"; // 再次改变颜色配置
      // ctx.fillRect(30, 30, 90, 90); // 使用新的配置绘制一个矩形

      // ctx.restore(); // 重新加载之前的颜色状态
      // ctx.fillRect(45, 45, 60, 60); // 使用上一次的配置绘制一个矩形

      // ctx.restore(); // 加载默认颜色配置
      // ctx.fillRect(60, 60, 30, 30); // 使用加载的配置绘制一个矩形

      //translate(x, y) ​translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如右图所示。
      // ctx.save(); //保存坐原点平移之前的状态
      // ctx.translate(100, 100);
      // ctx.strokeRect(0, 0, 100, 100);
      // ctx.restore(); //恢复到最初状态
      // ctx.translate(220, 220);
      // ctx.fillRect(0, 0, 100, 100);

      //rotate(angle) 旋转
      // ctx.fillStyle = "red";
      // ctx.save();

      // ctx.translate(100, 100);
      // ctx.rotate((Math.PI / 180) * 45);
      // ctx.fillStyle = "blue";
      // ctx.fillRect(0, 0, 100, 100);
      // ctx.restore();

      // ctx.save();
      // ctx.translate(0, 0);
      // ctx.fillRect(0, 0, 50, 50);
      // ctx.restore();
      //scale(x, y) scale方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩 小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。默认情况下，canvas 的 1 单位就是 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。同理，设置为 2.0 时，1 个单位就对应变成了 2 像素，绘制的结果就是图形放大了 2 倍。

      //transform(a, b, c, d, e, f)  a (m11): Horizontal scaling（水平缩放） .b (m12): Horizontal skewing（水平倾斜）.c (m21):​ Vertical skewing（垂直倾斜）.d (m22):​ Vertical scaling（垂直缩放）.e (dx):​ Horizontal moving（水平移动）.f (dy):​ Vertical moving（垂直移动）.

      //合成 globalCompositeOperation = type
      /*1.默认设置，新图像会覆盖在原有图像；
        2.source-in 仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。(包括其他的老图像区域也会透明)
        3.source-out 仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。(老图像也不显示)
        4.source-atop 新图像仅仅显示与老图像重叠区域。老图像仍然可以显示。
        5.destination-over 新图像在老图像下面。
        6.destination-in 仅仅新老图像重叠部分的老图像被显示，其他区域全部透明
        7.destination-out 仅仅老图像与新图像没有重叠的部分。 注意显示的是老图像的部分区域
        8.destination-atop 老图像仅仅仅仅显示重叠部分，新图像会显示在老图像的下面。
        9.lighter 新老图像都显示，但是重叠区域的颜色做加处理。
        10.darken 保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)
        11.lighten 保证重叠部分最量的像素。(每个颜色位进行比较，得到最大的)
        12.xor 重叠部分会变成透明
        13.copy 只有新图像会被保留，其余的全部被清除(边透明)。
        */

      //clip()  把已经创建的路径转换成裁剪路径。裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。clip() 只能遮罩在这个方法调用之后绘制的图像，如果是 clip() 方法调用之前绘制的图像，则无法实现遮罩
      // ctx.beginPath();
      // ctx.arc(20, 20, 100, 0, Math.PI * 2);
      // ctx.clip();
      // ctx.fillStyle = "pink";
      // ctx.fillRect(20, 20, 100, 100);
    },
    randomInt(from, to) {
      return parseInt(Math.random() * (to - from + 1) + from);
    }
  }
};
</script>
<style lang="scss" scoped>
#mycanvas {
  border: 1px solid green;
}
</style>