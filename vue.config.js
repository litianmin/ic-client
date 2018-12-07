var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('layout',resolve('src/layout'))
      .set('base',resolve('src/base'))
      .set('views',resolve('src/views'))
      .set('static', resolve('src/static'))
  }
}