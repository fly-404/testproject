<!--
 * @Autor: fanmm
 * @Date: 2021-04-26 13:45:28
 * @LastEditors: fanmm
 * @LastEditTime: 2021-05-12 14:19:50
-->
<template>
  <div class="contoner">
    <div class="con_left">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
    <div class="con_right">
      <el-form :model="ruleForm" ref="ruleForm" :inline="true">
        <el-form-item label="节点名称：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属单位：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>

        <el-form-item label="节点ID：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>

        <el-form-item label="父节点ID：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定设备通道：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定设备地址：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定设备名称：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="节点启用状态：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="节点创建时间：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
        <el-form-item label="节点修改时间：">
          <el-input v-model="ruleForm.FZSL" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        FZSL:""
      },
      setting: {
        view: {
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,
          selectedMulti: false,
        },
        edit: {
          drag: {
            autoExpandTrigger: true,
            isCopy: true,
            isMove: true,
            prev: true,
            inner: true,
            next: true,
          },
          // enable: true,
          // showRemoveBtn: false,
          // showRenameBtn: false
          enable: true,
          editNameSelectAll: true,
          showRemoveBtn: true,
          showRenameBtn: true,
        },
        data: {
          simpleData: {
            enable: true,
          },
        },
        callback: {
          // beforeDrag: this.beforeDrag,
          // beforeDrop: this.beforeDrop,
          // beforeDragOpen: beforeDragOpen,
          // onDrag: onDrag,
          // onDrop: onDrop,
          // onExpand: onExpand
          // beforeEditName: this.beforeEditName,
          beforeRemove: this.beforeRemove,
          beforeRename: this.beforeRename,
        },
      },
      zNodes: [
        { id: 1, pId: 0, name: "随意拖拽 1", open: true },
        { id: 11, pId: 1, name: "随意拖拽 1-1" },
        { id: 12, pId: 1, name: "随意拖拽 1-2", open: true },
        { id: 121, pId: 12, name: "随意拖拽 1-2-1" },
        { id: 122, pId: 12, name: "随意拖拽 1-2-2" },
        { id: 123, pId: 12, name: "随意拖拽 1-2-3" },
        { id: 13, pId: 1, name: "禁止拖拽 1-3", open: true, drag: false },
        { id: 131, pId: 13, name: "禁止拖拽 1-3-1", drag: false },
        { id: 132, pId: 13, name: "禁止拖拽 1-3-2", drag: false },
        { id: 133, pId: 13, name: "随意拖拽 1-3-3" },
        { id: 2, pId: 0, name: "随意拖拽 2", open: true },
        { id: 21, pId: 2, name: "随意拖拽 2-1" },
        {
          id: 22,
          pId: 2,
          name: "禁止拖拽到我身上 2-2",
          open: true,
          drop: false,
        },
        { id: 221, pId: 22, name: "随意拖拽 2-2-1" },
        { id: 222, pId: 22, name: "随意拖拽 2-2-2" },
        { id: 223, pId: 22, name: "随意拖拽 2-2-3" },
        { id: 23, pId: 2, name: "随意拖拽 2-3",isParent:true },
      ],
      newCount: 1,
      curSrcNode: null,
    };
  },
  mounted() {
    this.initA();
  },
  methods: {
    initA() {
      $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    },
    addHoverDom(treeId, treeNode) {
      let that = this;
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
        return;
      var addStr =
        "<span class='button add' id='addBtn_" +
        treeNode.tId +
        "' title='add node' onfocus='this.blur();'></span>";

      //   sObj.after(addStr);
      var mStr =
        "<span  class='cut' id='diyBtn_" +
        treeNode.tId +
        "_cut' > cut </span>" +
        "<span  class='paste' id='diyBtn_" +
        treeNode.tId +
        "_paste' > paste </span>";
      sObj.after(mStr + addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      var btn2 = $("#diyBtn_" + treeNode.tId + "_cut");
      var btn3 = $("#diyBtn_" + treeNode.tId + "_paste");
      if (btn)
        btn.bind("click", function () {
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          zTree.addNodes(treeNode, {
            id: 100 + that.newCount,
            pId: treeNode.id,
            name: "new node" + that.newCount++,
          });
          return false;
        });
      if (btn2)
        btn2.bind("click", function () {
          var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            nodes = zTree.getSelectedNodes();
          if (nodes.length == 0) {
            that.$message.error("请先选择一条数据");
          }
          that.setCurSrcNode(nodes[0]);
          return false;
        });
      if (btn3)
        btn3.bind("click", function () {
          if (!that.curSrcNode) {
            that.$message.error("请先剪切一条数据");
          }
          that.paste();
          return false;
        });
    },
    removeHoverDom(treeId, treeNode) {
      $("#addBtn_" + treeNode.tId)
        .unbind()
        .remove();
      $("#diyBtn_" + treeNode.tId + "_cut")
        .unbind()
        .remove();
      $("#diyBtn_" + treeNode.tId + "_paste")
        .unbind()
        .remove();
    },
    //捕获节点被拖拽
    beforeDrag(treeId, treeNodes) {
      for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
          return false;
        }
      }
      return true;
    },
    //捕获节点拖拽操作结束
    beforeDrop(treeId, treeNodes, targetNode, moveType) {
      
      return targetNode ? targetNode.drop !== false : true;
    },
    //删除之前
    beforeRemove(treeId, treeNode) {
      // className = (className === "dark" ? "":"dark");
      // showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
      // var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      // zTree.selectNode(treeNode);
      // return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    },
    //修改名字之前
    beforeRename(treeId, treeNode, newName) {
      console.log(treeId, treeNode, newName);
      // className = (className === "dark" ? "":"dark");
      // showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
      // if (newName.length == 0) {
      // 	setTimeout(function() {
      // 		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      // 		zTree.cancelEditName();
      // 		alert("节点名称不能为空.");
      // 	}, 0);
      // 	return false;
      // }
      return true;
    },
    //剪切
    setCurSrcNode(treeNode) {
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      if (this.curSrcNode) {
        delete this.curSrcNode.isCur;
        this.curSrcNode = null;
      }
      this.curSrcNode = treeNode;
      if (!treeNode) return;
      this.curSrcNode.isCur = true;
      zTree.cancelSelectedNode();
    },
    //粘贴
    paste() {
      var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        targetNode = nodes.length > 0 ? nodes[0] : null;
      if (this.curSrcNode === targetNode) {
        alert("不能移动，源节点 与 目标节点相同");
        return;
      } else if (
        (!!targetNode && this.curSrcNode.parentTId === targetNode.tId) ||
        (!targetNode && !this.curSrcNode.parentTId)
      ) {
        alert("不能移动，源节点 已经存在于 目标节点中");
        return;
      } else {
        targetNode = zTree.moveNode(targetNode, this.curSrcNode, "inner");
        if (!targetNode) {
          alert("剪切失败，源节点是目标节点的父节点");
        }
        targetNode = this.curSrcNode;
      }
      this.setCurSrcNode();
      delete targetNode.isCur;
      zTree.selectNode(targetNode);
    },
  },
};
</script>
<style lang="scss" >
@import "~@/plugins/zTreeStyle.css";
.ztree li span.button.add {
  margin-left: 2px;
  margin-right: -1px;
  background-position: -144px 0;
  vertical-align: top;
  *vertical-align: middle;
}
.contoner {
  width: 100%;
  height: 100%;
  background: url("~@/assets/tj_bj.png") no-repeat center / 100% 100%;
  display: flex;
  .con_left {
    width: 40%;
    border: 1px solid #fff;
  }
  .con_right {
    width: 60%;
    border: 1px solid red;
  }
}
.ztree {
  
  padding: 0.1rem;
  color: #fff;
  font-size: 16px;
  li {
    a {
      color: #fff;
    }
    a.curSelectedNode {
      background-color: #13c988;
      color: #fff;
      border: 1px #13c988 solid;
      opacity: 1;
    }
  }
}
.con_right{
  width: 100%;
  .el-form--inline {
    text-align: left;
     .el-form-item {
      width: 50%;
      margin-right: 0;
      .el-form-item__label {
        width: 30%;
        vertical-align: middle;
        font-size: 0.18rem;
        color: #ffffff;
        line-height: 0.5rem;
        padding: 0 0.12rem 0 0;
      }
      .el-form-item__content {
        width: 60%;
        vertical-align: middle;
        line-height: 0.5rem;
        .el-input,
        .el-select {
          width: 100%;
          font-size: 0.18rem;
          .el-select__caret {
            font-size: 0.14rem;
            width: 0.25rem;
          }
          .el-input__icon {
            line-height: 0.5rem;
          }
        }
        .el-input--prefix {
          .el-input__inner {
            padding: 0 0.3rem;
          }
          .el-input__prefix {
            left: 0.05rem;
            .el-input__icon {
              width: 0.25rem;
            }
          }
        }
        .el-input__inner {
          background-color: #1e5ea5;
          border-radius: 0.04rem;
          border: 0.01rem solid #008ffd;
          box-sizing: border-box;
          color: #ffffff;
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.15rem;
        }
        .el-textarea__inner {
          padding: 0.05rem 0.15rem;
          font-size: inherit;
          color: #ffffff;
          background-color: #1e5ea5;
          background-image: none;
          border: 0.01rem solid #008ffd;
          border-radius: 0.04rem;
        }
      }
    }
   
  }
  
}
</style>