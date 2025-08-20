import {
  __spreadValues
} from "./chunk-5JBD5THX.js";

// src/internal/config.ts
var defaultConfig = {
  defaultRelative: true,
  urlProvider: () => {
    var _a, _b;
    const currentURL = (_b = (_a = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : _a.location) == null ? void 0 : _b.href;
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
  GLOBAL_CONFIG = __spreadValues(__spreadValues({}, GLOBAL_CONFIG), userConfig);
}

export {
  defaultConfig,
  GLOBAL_CONFIG,
  initializeLoveUrl
};
