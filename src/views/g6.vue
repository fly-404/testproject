<!--
 * @Autor: fanmm
 * @Date: 2021-05-17 16:58:42
 * @LastEditors: fanmm
 * @LastEditTime: 2021-05-17 17:06:43
-->
<template>
  <div class="main-content-box">
    <div class="demoDiv">
      <div class="toolDiv">
        <div class="zoom zoomOut" title="放大" @click="getZoomOut">
          <i class="iconfont">&#xe640;</i>
        </div>
        <div class="zoom zoomIn" title="缩小" @click="getZoomIn">
          <i class="iconfont">&#xe624;</i>
        </div>
        <div class="zoom subNodes" title="二级" @click="showSubNodes">
          <i class="iconfont">&#xe614;</i>
        </div>
        <div class="zoom allViews" title="全部线路" @click="showAllViews">
          <i class="iconfont">&#xe697;</i>
        </div>
        <div class="zoom refreshViews" title="刷新拓扑图" @click="refreshViews">
          <i class="iconfont">&#xe64d;</i>
        </div>
        <div class="zoom thirdNodes" title="还原" @click="reFreshNodeOrg">
          <i class="iconfont">&#xe649;</i>
        </div>
      </div>
      <div id="container"></div>
      <div class="showDetails" v-if="isShowDetails">
        <p class="details-title">详细信息</p>
        <span class="closeDetail" @click="closeDetail">
          <i class="iconfont">&#xe60b;</i>
        </span>
        <div class="details-info">
          <div class="details-info-items">
            <h4 class="info-items-label">名称：</h4>
            <h4 class="info-items">{{ showNodeDetailsObj.label }}</h4>
          </div>
          <div class="details-info-items">
            <h4 class="info-items-label">Id：</h4>
            <h4 class="info-items">{{ showNodeDetailsObj.id }}</h4>
          </div>
          <div class="details-info-items">
            <h4 class="info-items-label">状态：</h4>
            <h4 class="info-items"></h4>
          </div>
          <div class="details-info-items">
            <h4 class="info-items-label">描述信息：</h4>
            <p class="info-items-description">此处是对节点的一些介绍描述信息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
// import Util from "@antv/g6/lib/util";

import data from "../../public/data.js";
export default {
  name: "g6demo13",
  data() {
    return {
      currentGraph: {},
      lineEdge: [],
      lineEdgeArrOne: [],
      lineEdgeArrTwo: [],
      clickNum: 0,
      showNodeDetailsObj: {},
      showEdgeDetailsObj: {},
      isShowDetails: false,
      drawData: {},
      tempData: {
        nodes: [],
        edges: [],
      },
      isClickNodes: false,
      isClickRefresh: false,
      ForceData: {},
    };
  },
  created() {},
  mounted() {
    this.$loading({
      lock: true,
      text: "数据加载中~~~",
      spinner: "el-icon-loading",
      background: "rgba(232, 240, 230, 0.85)",
    });
    /**
     * 模拟后台请求数据（全量获取）
     */
    // getForce().then(res => {
    //   if (res.status === 1) {
    //     this.drawData = res.data
    //     setTimeout(() => {
    //       this.getFirstNodes();
    //       this.initGrahp();
    //     }, 10)
    //   }
    // })
    this.drawData = data;
    setTimeout(() => {
      this.getFirstNodes();
      this.initGrahp();
    }, 10);
    setTimeout(() => {
      this.$loading().close();
    }, 1000);
  },
  methods: {
    initGrahp() {
      /**
       * 需要保存vue的this实例，否则直接调用this时，this的指向会发生变化
       */
      let _that = this; //保存vue实例
      /**
       * 临时变量，用于存储需要显示的节点信息
       */
      let tempObj = {};
      /**
       * 使用iconfont
       */
      G6.registerNode("iconfont", {
        draw(cfg, group) {
          const {
            backgroundConfig: backgroundStyle,
            style,
            labelCfg: labelStyle,
          } = cfg;

          if (backgroundStyle) {
            group.addShape("circle", {
              attrs: {
                x: 0,
                y: 0,
                r: cfg.size * 0.5, //背景节点的大小
                ...backgroundStyle,
              },
              name: "circle-shape",
            });
          }

          const keyShape = group.addShape("text", {
            attrs: {
              x: 0,
              y: 0,
              fontFamily: "iconfont", // 对应css里面的font-family: "iconfont";
              textAlign: "center",
              textBaseline: "middle",
              text: cfg.text,
              fontSize: cfg.size,
              // lineHeight: 44,
              ...style,
            },
            name: "text-shape1",
          });
          /**
           * 节点label的y轴偏移量
           * 原值为 labelY = backgroundStyle ? cfg.size *2 : cfg.size;
           */
          const labelY = backgroundStyle ? cfg.size : cfg.size;

          group.addShape("text", {
            attrs: {
              x: 0,
              y: labelY,
              textAlign: "center",
              textBaseline: "middle",
              text: cfg.label,
              fontSize: labelStyle.fontSize, //此属性可生效，配置labelCfg中的fontSize字段，即可实现设置
              ...labelStyle.style,
            },
            name: "text-shape1",
          });
          return keyShape;
        },
      });
      /**
       * 添加右键点击节点的菜单及事件
       */
      const conextMenuContainer = document.createElement("ul");
      conextMenuContainer.id = "contextMenu";

      // create li
      const firstLi = document.createElement("li");
      firstLi.innerHTML = `查看层级`;
      firstLi.style.display = "block";
      firstLi.addEventListener("click", function (ev) {
        /**
         * 此处增加对点击边时隐藏的默认显示边的显示
         * 即在查看节点时，显示默认边
         */
        const edges = graph.getEdges();
        edges.forEach((edge) => {
          edge.show();
        });
        /**
         * 显示当前节点下的子节点的方法
         */
        graph.changeData(_that.tempData);
      });
      conextMenuContainer.appendChild(firstLi);

      const lastLi = document.createElement("li");
      lastLi.innerText = "节点详情";
      lastLi.style.display = "block";
      lastLi.addEventListener("click", function (ev) {
        _that.isShowDetails = true; //显示详情框
        _that.showNodeDetailsObj = tempObj;
      });
      conextMenuContainer.appendChild(lastLi);
      document.getElementById("container").appendChild(conextMenuContainer);

      const width = document.getElementById("container").scrollWidth;
      const height = document.getElementById("container").scrollHeight || 600;
      console.log(height);
      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        // renderer: 'canvas',
        linkCenter: true,
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            {
              type: "edge-tooltip", // 边提示框
              formatText(model) {
                // 边提示框文本内容
                // console.log(model)
                const text = model.lineNum
                  ? "端口连接数: " + model.lineNum
                  : null;
                return text;
              },
              offset: -20,
            },
          ],
        },
        layout: {
          type: "force",
          preventOverlap: true,
          /**
           * 边长。可以使用回调函数的形式对不同对边定义不同边长
           */
          linkDistance: (d) => {
            console.log(d);
            if (d.source.id === "node0") {
              return 180;
            }

            if (d.source.siteFlag === "firstNodes") {
              return 120;
            }
            if (d.source.siteFlag === "subNodes") {
              return 100;
            }
            if (
              d.source.siteFlag === "subNodes" &&
              d.target.siteFlag === "thirdNodes"
            ) {
              return 80;
            }
            return 30;
          },
          /**
           * 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用。
           * 可以使用回调函数的形式对不同对节点定义不同节点作用力
           */
          nodeStrength: (d) => {
            if (d.isLeaf) {
              return -150;
            }
            return -50;
          },
          /**
           * 边的作用力，默认根据节点的出入度自适应。可以使用回调函数的形式对不同对节点定义不同边作用力
           */
          edgeStrength: (d) => {
            if (
              d.source.id === "node1" ||
              d.source.id === "node2" ||
              d.source.id === "node3"
            ) {
              return 5;
            }
            return 1;
          },
          /**
           * preventOverlap 为 true 时生效，防止重叠时节点边缘间距的最小值。
           * 可以是回调函数，为不同节点设置不同的最小间距，
           */
          nodeSpacing: (d) => {
            // d 是一个节点
            if (
              d.id === "node1" ||
              d.id === "node2" ||
              d.id === "node3" ||
              d.id === "node4" ||
              d.id === "node5"
            ) {
              return 50;
            }
            return 10;
          },
          /**
           * 是否启用 web-worker 以防布局计算时间过长阻塞页面交互，默认false
           */
          workerEnabled: false,
        },
        defaultNode: {
          backgroundConfig: {
            backgroundType: "circle",
            fill: "#40a9ff",
            //stroke: 'LightSkyBlue',
          },
          size: 36,
          color: "#5B8FF9",
          type: "iconfont",
          style: {
            lineWidth: 2,
            fill: "#C6E5FF",
          },
          labelCfg: {
            autoRotate: true,
            offset: [60, 10, 10, 10],
            style: {
              fontSize: 14,
            },
          },
        },
        defaultEdge: {
          size: 1,
          color: "#e2e2e2",
          style: {
            lineWidth: 1,
            stroke: "#b5b5b5",
            lineAppendWidth: 10,
          },
        },
      });

      graph.data(_that.tempData);
      graph.render();

      /**
       * 当节点开始被拖拽的时候触发的事件，此事件作用在被拖曳节点上
       */
      graph.on("node:dragstart", function (e) {
        graph.layout();
        refreshDragedNodePosition(e);
      });

      /**
       * 当节点在拖动过程中时触发的事件，此事件作用于被拖拽节点上
       */
      graph.on("node:drag", function (e) {
        refreshDragedNodePosition(e);
      });

      /**
       * 当拖拽完成后触发的事件，此事件作用在被拖曳节点上
       */
      graph.on("node:dragend", function (e) {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });

      function refreshDragedNodePosition(e) {
        const model = e.item.get("model");
        model.fx = e.x;
        model.fy = e.y;
      }
      /**
       * 将实例化的G6，赋给data中的currentGraph
       */
      _that.currentGraph = graph;
      /**
       * 右键点击事件
       */
      // let temporaryData = Object.assign({}, this.drawData); //保存一份所有的原始数据信息
      let temporaryData = JSON.parse(JSON.stringify(this.drawData));
      graph.on("node:contextmenu", (evt) => {
        // console.log(evt)
        evt.preventDefault();
        evt.stopPropagation();
        /**
         * 右键点击时需要将右键菜单区域显示
         * 由于部分节点不需要显示子级节点信息，处理是需要将将查看层级li隐藏掉
         * 右键时使其默认显示，再根据节点信息判断是否显示
         */
        conextMenuContainer.style.left = `${evt.canvasX + 36}px`; //使菜单出现在节点的右侧
        conextMenuContainer.style.top = `${evt.canvasY}px`;
        firstLi.style.display = "block";
        /**
         * 拿到于此节点相关的边的信息,再根据边查找到节点信息，然后添加边、节点
         */
        // console.log(temporaryData)
        let showRelationId = evt.item._cfg.id;
        // console.log(showRelationId)
        let edgeTemp = [];
        temporaryData.edges.forEach((item) => {
          if (item.source === showRelationId) {
            edgeTemp.push(item);
          }
        });
        console.log(edgeTemp);
        let nodeTemp = [];
        temporaryData.nodes.forEach((item) => {
          edgeTemp.forEach((i) => {
            if (i.target === item.id) {
              nodeTemp.push(item);
            }
          });
        });
        console.log(nodeTemp);
        tempObj = evt.item._cfg.model;
        if (edgeTemp.length === 0 && nodeTemp.length === 0) {
          firstLi.style.display = "none";
          _that.$notify.warning({
            title: "提示",
            message: "此节点无子节点信息",
            duration: 3000,
          });
          return;
        }

        /**
         * 右键事件 尝试方法2
         * new  新增判断节点层级字段 siteFlag
         */
        // let hasClickCenter = evt.item._cfg.model.isCenter;
        let isCenterNodes = evt.item._cfg.model.siteFlag;
        let isClickTag = evt.item._cfg.model.isClick;
        if (isCenterNodes === "center") {
          firstLi.style.display = "none";
          return;
        }

        /**
         * 防止多次点击造成重复数据过多，显示出现问题
         * 将当前节点的后拿到的节点及边数据拼接到源数据中
         */
        if (!isClickTag) {
          _that.tempData.nodes = _that.tempData.nodes.concat(nodeTemp);
          _that.tempData.edges = _that.tempData.edges.concat(edgeTemp);
          evt.item._cfg.model.isClick = true;
        }

        console.log(_that.tempData);
      });
      /**
       * 鼠标离开节点区域，取消右键菜单的显示（位置还原）
       */
      graph.on("node:mouseleave", () => {
        conextMenuContainer.style.left = "-300px";
      });

      /**
       * 边的点击事件,点击边动态增加边
       */
      graph.on("edge:dblclick", (ev) => {
        // console.log(ev);
        /**
         * 双击时隐藏默认显示的边
         */
        let hiddenOrgEdge = ev.item;
        hiddenOrgEdge.hide();

        let edgeNum = ev.item._cfg.model.lineNum;
        let edgeSource = ev.item._cfg.model.source;
        let edgeTarget = ev.item._cfg.model.target;
        /**
         * 此处考虑，是否在显示多条边时，将原本的那条线隐藏掉（删除掉数据）
         * 或者新增边时，使数目 -1(循环从1开始)
         * new 将默认显示边隐藏后，不需要-1 操作
         */
        for (let i = 0; i < edgeNum; i++) {
          let moduleEdges = {
            source: edgeSource,
            target: edgeTarget,
            type: "arc",
            curveOffset: 10,
          };
          if (i % 2 === 0) {
            moduleEdges.curveOffset = moduleEdges.curveOffset * (i + 1) * 1;
          } else {
            moduleEdges.curveOffset = moduleEdges.curveOffset * i * -1;
          }

          graph.addItem("edge", moduleEdges);
        }
      });

      /**
       * 点击画布 隐藏详细信息
       */
      graph.on("canvas:click", () => {
        _that.isShowDetails = false;
      });
    },
    getZoomOut() {
      let currentZoom = this.currentGraph.getZoom();
      this.currentGraph.zoomTo(currentZoom + 0.1, this.getViewCenter());
    },
    getZoomIn() {
      const currentZoom = this.currentGraph.getZoom();
      this.currentGraph.zoomTo(currentZoom - 0.1, this.getViewCenter());
    },
    showSubNodes() {
      // console.log("显示二级节点");
      this.currentGraph.destroy();

      this.drawData.nodes.filter((item, index, arr) => {
        if (item.isSubNodes) {
          this.tempData.nodes.push(item);
        }
      });

      /**
       * 利用对象访问属性的方法，判断对象中是否存在某个key。
       * 从而达到去重的目的
       */
      let result = [];
      let tempObj = {};
      for (let i = 0; i < this.tempData.nodes.length; i++) {
        if (!tempObj[this.tempData.nodes[i].id]) {
          result.push(this.tempData.nodes[i]);
          tempObj[this.tempData.nodes[i].id] = true;
        }
      }
      /**
       * 此处为for循环中数组splice方法调用次数有误的解决方法
       * 由于splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。
       * 此方法会改变原数组，意味着原数组的下标会发生变化
       */
      let deleteNum = 1;
      let loop = result.length;
      for (let j = 0; j < loop; j++) {
        if (result[j].isThirdNodes) {
          result.splice(j, deleteNum);
          j--; //改变下标
          loop = loop - deleteNum; // 改变循环长度
        }
      }
      this.tempData.nodes = result;
      this.tempData.edges = this.drawData.edges.slice(
        0,
        this.tempData.nodes.length - 1
      );
      console.log(this.tempData);
      this.initGrahp();
    },
    reFreshNodeOrg() {
      console.log("还原节点");
      /**
       * 还原初始化显示节点信息，需要将此对象置为空
       */
      this.tempData = {
        nodes: [],
        edges: [],
      };
      /**
       * 点击还原节点是，需要将源数据中所以的节点点击标识置为false
       * 否则会出现，点击显示节点后，还原节点后，原节点不显示展开的节点
       */
      this.drawData.nodes.forEach((item) => {
        item.isClick = false;
      });
      setTimeout(() => {
        this.currentGraph.destroy();
        this.getFirstNodes();
        this.initGrahp();
      }, 10);
    },
    showAllViews() {
      this.currentGraph.clear();
      this.currentGraph.destroy();
      this.tempData.nodes = this.drawData.nodes;
      let result = [];
      let tempObj = {};
      for (let k = 0; k < this.tempData.nodes.length; k++) {
        if (!tempObj[this.tempData.nodes[k].id]) {
          result.push(this.tempData.nodes[k]);
          tempObj[this.tempData.nodes[k].id] = true;
        }
      }
      this.tempData.nodes = result;
      this.tempData.edges = this.drawData.edges;
      this.initGrahp();
    },
    getFirstNodes() {
      /**
       * 先将中心节点push进tempData中
       */
      this.drawData.nodes.forEach((item) => {
        if (item.isCenter) {
          this.tempData.nodes.push(item);
        }
        if (item.isFisrtNodes) {
          this.tempData.nodes.push(item);
        }
      });
      /**
       * 以中心节点为source的，都是默认显示的意见节点
       */
      this.drawData.edges.forEach((item) => {
        if (item.source === "node0") {
          this.tempData.edges.push(item);
        }
      });
      console.log(this.tempData);
    },
    refreshViews() {
      /**
       * 将graph实例销毁时，需要销毁画布
       * 否则会造成画布重复渲染，但画布元素未显示的问题
       */
      this.currentGraph.destroy();
      console.log("刷新视图");
      setTimeout(() => {
        this.initGrahp();
      }, 10);
      // this.currentGraph.changeData()
    },

    /**
     * 计算画布的padding值
     */
    getFormatPadding() {
      return Util.formatPadding(this.currentGraph.get("fitViewPadding"));
    },
    /**
     * 画布中心位置
     */
    getViewCenter() {
      const padding = this.getFormatPadding();
      // console.log(padding)
      const graph = this.currentGraph;
      const width = this.currentGraph.get("width");
      const height = graph.get("height");
      return {
        x: (width - padding[2] - padding[3]) / 2 + padding[3],
        y: (height - padding[0] - padding[2]) / 2 + padding[0],
      };
    },
    noRepeatArr(arr) {
      let result = [];
      let tempObj = {};
      for (let i = 0; i < arr.length; i++) {
        if (!tempObj[arr[i].id]) {
          result.push(arr[i]);
          tempObj[arr[i].id] = true;
        }
      }
      return result;
    },
    closeDetail() {
      this.isShowDetails = false;
      this.showNodeDetailsObj = {};
    },
  },
};
</script>

<style scoped>
.main-content-box {
  width: 95%;
  margin: 5px 20px;
}
.demoDiv {
  position: relative;
  padding: 20px;
  border: 1px solid skyblue;
}
.toolDiv {
  width: 50px;
  border: 1px solid #f5f5f5;
  position: absolute;
  z-index: 100;
}
.zoom {
  cursor: pointer;
  border: 1px solid #f5f5f5;
  font-size: 26px;
  background-color: #ffffff;
}
/* 右键菜单及显示详情区域，宽度为屏幕窗口的12%，高度为屏幕窗口的40% */
.showDetails {
  width: 12vw;
  height: 40vh;
  border: 1px solid #f5f5f5;
  box-shadow: -5px 5px 5px #aaaaaa;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 5px;
  overflow-y: auto;
  font-size: 12px;
}
.details-title {
  text-align: left;
}
.closeDetail {
  position: absolute;
  right: 8px;
  top: 18px;
  cursor: pointer;
}
.closeDetail:hover {
  color: #e27e7e;
}
.details-info {
  margin: 0 10px;
  background-color: aquamarine;
}
.details-info-items {
  background-color: #ffffff;
  display: flex;
}
.details-info-items:last-child {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.info-items {
  font-size: 12px;
  color: #545454;
  text-align: left;
}
.info-items-label {
  color: #000000;
  text-align: left;
  width: 65px;
}
.info-items-description {
  height: 100px;
  width: 100%;
  border: 1px solid #d2bebe;
  margin-top: 0px;
  line-height: 24px;
}
/* 右键菜单 */
.demoDiv >>> #contextMenu {
  position: absolute;
  list-style-type: none;
  padding: 10px 8px;
  left: -300px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 14px;
  color: #545454;
  z-index: 2;
}
.demoDiv >>> #contextMenu li {
  cursor: pointer;
  list-style-type: none;
  list-style: none;
  margin-left: 0px;
  margin-top: 5px;
}
.demoDiv >>> #contextMenu li:hover {
  color: #aaa;
}
.title_for_layout {
  position: absolute;
  top: 0;
  left: 100px;
  color: crimson;
}
.demoDiv >>> .g6-edge-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>

