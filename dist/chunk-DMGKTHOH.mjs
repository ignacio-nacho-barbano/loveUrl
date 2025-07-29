// src/internal/config.ts
var defaultConfig = {
  defaultRelative: true,
  urlProvider: () => {
    const currentURL = globalThis?.window?.location?.href;
    if (currentURL) return currentURL;
    console.warn(
      "loveurl: warning.\n Please define a urlProvider in the config; default window object is not available. \n This usually happens in the context of a SSR project."
    );
    return "/";
  },
  arraySeparator: "_._",
  _paramsBuilder: () => {
    throw "params builder not initialized";
  }
};
var GLOBAL_CONFIG = defaultConfig;
function initializeLoveUrl(userConfig) {
  GLOBAL_CONFIG = {
    ...GLOBAL_CONFIG,
    ...userConfig
  };
}

export {
  defaultConfig,
  GLOBAL_CONFIG,
  initializeLoveUrl
};
