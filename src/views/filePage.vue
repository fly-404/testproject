<!--
 * @Autor: fanmm
 * @Date: 2020-12-07 18:01:26
 * @LastEditors: fanmm
 * @LastEditTime: 2020-12-10 11:49:28
-->
<template>
  <div>
    <iframe  name = "iframeChild" id = "iframeChild" src="http://192.168.1.105:9090/flws/display/child?ft=T_YQ&userCode=442000111&ftVal=442000111201703045610&st=T_YQ"
            width="100%" height="300"
            frameborder="0" scrolling="no" ref="iframeDom"
    ></iframe>
    <div class="manual_wrap active" @touchmove.prevent  v-show="showData">
       
      <turn
        :width="manualWidth"
        ref="turn"
        :height="manualHeight"
        :data="manuals"
        :zdex = "zdex"
        @change="handleTurnChange"
        @tap="handleToggleControl"
        @turning="handleTurning"
        @prev="handleTurPrev"
        @next="handleTurnNext"
      >
      </turn>
    </div>
  </div>
</template>
<script>
import turn from "./fpage.vue";
import axios from 'axios'
export default {
  components: { turn },
  data() {
    return {
      showData: true,
      manualWidth: 300,
      manualHeight: 400,
      manuals: [
        {
          picture_image:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2600216442,2384386498&fm=15&gp=0.jpg",
        },
        {
          picture_image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg",
        },
        {
          picture_image:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2600216442,2384386498&fm=15&gp=0.jpg",
        },
        {
          picture_image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg",
        },
      ],
      currentIndex: 1,
      zdex:true
    };
  },
  mounted(){
   
  },
  methods: {
    //翻到指定页面：
    handleSwitchManual(index) {
      if (index === this.currentIndex) return;
      this.$refs["turn"].toPage(index);
      this.currentIndex = index;
      this.goods_id = this.manuals[this.currentIndex].goods_id;
      this.show = false;
    },
    handleTurnChange() {
      console.log("change");
      this.zdex=true;
    },
    handleToggleControl() {
      console.log("control");
    },
    handleTurning() {
      console.log("turn");
    },
    handleTurPrev() {
      console.log("prev");
    },
    handleTurnNext() {
      console.log("next");
    },
    
  },
};
</script>
<style lang="scss" scoped>
.manual_wrap {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
  -webkit-transition: opacity ease 0.5s;
  transition: opacity ease 0.5s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}

.active {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
</style>