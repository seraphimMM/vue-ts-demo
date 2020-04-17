let pro = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    // dev环境是否自动打开浏览器
    open: !pro,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // 配置dev proxy table
    proxy: null
  },

  configureWebpack: config => {
    //配置别名等放到这里

    // 用以解决在chrome sources中vue文件生成带hash而无法找准文件的问题
    if (!pro) {
      config.output.devtoolModuleFilenameTemplate = info => {
        const resPath = info.resourcePath
        if ((/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) || /node_modules/.test(resPath)) {
          return `webpack:///${resPath}?${info.hash}`
        }
        return `webpack:///${resPath.replace('./src', 'my-code/src')}`
      }
    }
  }
}