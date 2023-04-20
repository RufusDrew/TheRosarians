module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  pwa: {
    name: 'Rosarians App',
    themeColor: '#1DA3E3',
    msTileColor: '#17DDE3',
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#0E7EC7'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
      
    }
},
};