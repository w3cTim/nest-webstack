module.exports = {
  configureWebpack: (config) => {
    config.externals = {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
    }
  },
  chainWebpack: (config) => {
    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: ['//unpkg.com/element-ui@2.4.5/lib/theme-chalk/index.css', 'http://at.alicdn.com/t/font_1949907_usyu3f16zc.css'],
      js: [
        '//unpkg.com/vue@2.6.11/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        '//unpkg.com/vue-router@3.2.0/dist/vue-router.min.js',
        '//unpkg.com/element-ui@2.4.5/lib/index.js',
      ],
    }
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap((args) => {
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })
  },
  publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
}
