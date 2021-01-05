import Vue from "vue";
import 'babel-polyfill'
import App from "./App.vue";
import store from "./store";
import echarts from "echarts"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
 require("./mock")
import print from '@/utils/print.js'
import "./assets/fonts/iconfont.css"
Vue.use(print)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount("#app");
