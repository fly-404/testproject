const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
        plugins: [
            new PrerenderSPAPlugin({
                // 生成文件的路径，也可以与webpakc打包的一致。
                // 下面这句话非常重要！！！
                // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                staticDir: path.join(__dirname,'./dist'),
                // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                routes: ['/', '/about','/animation'],
                // 这个很重要，如果没有配置这段，也不会进行预编译
                renderer: new Renderer({
                    inject: {
                        foo: 'bar'
                    },
                    headless: false,
                    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                    renderAfterDocumentEvent: 'render-event'
                })
            }),
        ],
    };
}
};