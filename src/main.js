import Vue from "vue";
import 'babel-polyfill'
import App from "./App.vue";
import store from "./store";
import "./style/reset.css"
import "./style/index.css"
import echarts from "echarts"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
 require("./mock")
import print from '@/utils/print.js'
import "./assets/fonts/iconfont.css"
//===============================ztree------------------------------------
import "./plugins/jquery-1.4.4.min.js"
import "./plugins/jquery.ztree.core.min.js"
import "./plugins/jquery.ztree.excheck.min.js"
import "./plugins/jquery.ztree.exedit.min.js"
Vue.use(print)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

// AES加密
import { encrypt, decrypt } from '@/utils/encryp.js';
Vue.prototype.$encrypt = encrypt
Vue.prototype.$decrypt = decrypt

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
