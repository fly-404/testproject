import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Animation from "../views/animation.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },{
    path: "/list",
    name: "list",
    component: ()=>import("../views/list.vue")
  },{
    path: "/barrage",
    name: "barrage",
    component: ()=>import("../views/Barrage.vue")
  },{
    path: "/canvas",
    name: "canvas",
    component: ()=>import("../views/canvas.vue")
  },{
    path: "/animation",
    name: "animation",
    component: Animation
  },{
    path: "/echarts1",
    name: "echarts1",
    component: ()=>import("../views/echarts1.vue")
  },{
    path: "/mock",
    name: "mock",
    component: ()=>import("../views/mock.vue")
  },{
    path: "/attrs",
    name: "attrs",
    component: ()=>import("../views/attrs.vue")
  },{
    path: "/regExp",
    name: "regExp",
    component: ()=>import("../views/regExp.vue")
  },{
    path: "/css3",
    name: "css3",
    component: ()=>import("../views/css3.vue")
  },{
    path: "/shape",
    name: "shape",
    component: ()=>import("../views/shape.vue")
  },{
    path: "/bar",
    name: "bar",
    component: ()=>import("../views/chart.vue")
  },{
    path: "/huan",
    name: "huan",
    component: ()=>import("../views/huan.vue")
  },{
    path: "/filepage",
    name: "filepage",
    component: ()=>import("../views/filePage.vue")
  },{
    path: "/pdf",
    name: "pdf",
    component: ()=>import("../views/pdf.vue")
  },{
    path: "/rate",
    name: "rate",
    component: ()=>import("../components/rate/index.vue")
  },{
    path: "/ztree",
    name: "ztree",
    component: ()=>import("../views/zTree.vue")
  },{
    path: "/g6",
    name: "g6",
    component: ()=>import("../views/g6.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
