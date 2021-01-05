<!--
 * @Autor: fanmm
 * @Date: 2020-10-28 09:18:17
 * @LastEditors: fanmm
 * @LastEditTime: 2020-11-24 16:34:07
-->
<template>
  <div class="virtual-list">
    <!-- <h1>虚拟列表</h1> -->
    <div>
      <table style="width:100%;">
        <thead>
          <tr>
            <th>序号</th>
            <th>内容</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="container"
      ref="container"
      :style="`height:${container.height}px`"
      @scroll="test"
    >
      <table>
        <tbody
          :style="
            `height:${li.height * list.length}px;padding-top:${li.height *
              pos}px`
          "
        >
          <tr
            :style="`height:${li.height}px;`"
            v-for="item of showList"
            :key="item"
          >
            <td>{{ item }}</td>
            <td>{{ item }}</td>
            <td>
              <div>
                <button>换肤</button>
                <button>重置</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div
      class="container"
      ref="container"
      :style="`height:${container.height}px`"
      @scroll="test"
    >
      <ul
        :style="
          `height:${li.height * list.length}px;padding-top:${li.height * pos}px`
        "
      >
        <li
          :style="`height:${li.height}px`"
          v-for="item of showList"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import Test from '../mixins/test'
export default {
  mixins:[Test],
  data() {
    return {
      list: [], // 贼大的数组
      li: {
        // 列表项信息
        height: 50
      },
      container: {
        // 容器信息
        height: 500
      },
      pos: 1, // 第一排显示的元素的下标
      MAX_NUM: 1, // 在容器内最多显示几个列表项
      timer: null, // 定时器
      carriedOut: true, // 能不能执行操作
      timer2: null,
      test1:'测试'
    };
  },
  mounted() {
    // 创建一个贼大的数据数组
    for (let i = 0; i < 100000; i++) {
      this.list.push(i);
    }
    this.test();
    // window.addEventListener("resize",function(){
    //   console.log("111111111111111111111111")
    // })
  },
  computed: {
    // 用于渲染在页面上的数组
    showList() {
      // 根据计算出来的 第一排元素的下标,和最多显示多少个  用slice实现截取数组
      //   let startDex = this.pos == 0 ? this.pos : this.pos - 1;
      let arr = this.list.slice(this.pos, this.pos + this.MAX_NUM);
      //   console.log(arr);
      return arr;
    }
  },
  methods: {
      //防抖
    // test() {
    //   if (this.timer2) {
    //     clearTimeout(this.timer2);
    //   }

    //   this.timer2 = setTimeout(() => {
    //     this.pos = Math.round(scrollTop / li.height);
    //   }, 50);
    // },

    test() {
      // 节流
      if (this.carriedOut) {
        // 容器跟里面的列表项
        const { container, li } = this;
        // 计算可视区域最多能显示多少个li
        this.MAX_NUM = Math.ceil(container.height / li.height);
        // 获取 overflow:scroll 的元素已滚动的高度
        if (this.timer2) {
          clearTimeout(this.timer2);
        }
        this.timer2 = setTimeout(() => {
          let scrollTop = this.$refs.container.scrollTop;
          // 计算当前处于第一排的元素的下标
          this.pos = Math.round(scrollTop / li.height);
        }, 50);
        // 下方节流操作
        this.carriedOut = false;
        this.timer = setTimeout(() => {
          this.carriedOut = true;
          clearTimeout(this.timer);
        }, 50);
      }
    }
  }
};
</script>
<style lang="scss">
.virtual-list {
  text-align: center;
  .container {
    overflow: scroll;
    border: 1px solid red;
  }
}
table {
  width: 100%;
  border-spacing: 0px;
  border-collapse: collapse;
}

table th,
table td {
  height: 50px;
  text-align: center;
  border: 1px solid gray;
}

table thead {
  color: white;
  background-color: #38f;
}

table tbody {
  display: block;
}
table thead tr,
table tbody tr {
  box-sizing: border-box;
  table-layout: fixed;
  display: table;
  width: 100%;
}

table tbody tr:nth-of-type(odd) {
  background: #eee;
}

table tbody tr:nth-of-type(even) {
  background: #fff;
}

table tbody tr td {
  border-bottom: none;
}
</style>