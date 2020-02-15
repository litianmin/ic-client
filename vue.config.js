var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: "/dist/",
  devServer: {
    proxy: {
      "/api": {
        // target: 'http://icoming.top:8888',
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },



  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('layout',resolve('src/layout'))
      .set('base',resolve('src/base'))
      .set('views',resolve('src/views'))
      .set('static', resolve('src/static'))
      .set('common',resolve('src/common'))

      
      config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
      //const svgRule = config.module.rule('svg')
      //svgRule.uses.clear()
      config.module
        .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include
        .add(resolve('src/icons')) //处理svg目录
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })

  },

}