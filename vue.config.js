// eslint-disable-next-line prettier/prettier
module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/registerServiceWorker.ts",
    },
  },
};
