// src/internal/config.ts
var defaultConfig = {
  defaultRelative: true,
  urlProvider: () => window.location.href,
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
