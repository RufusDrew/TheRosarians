const manifestJSON = require("./public/manifest.json");
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
};

module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },

  runtimeCompiler: true,

  pwa: {
    background_color: manifestJSON.background_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "service-worker.js",
      exclude: [/_redirects$/],
    },
  },
};
