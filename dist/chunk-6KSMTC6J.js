import {
  buildSearchParamsQueryString
} from "./chunk-WM2S3RBP.js";
import {
  GLOBAL_CONFIG,
  initializeLoveUrl
} from "./chunk-D4UI23G7.js";

// src/internal/loveUrl.ts
initializeLoveUrl({ _paramsBuilder: buildSearchParamsQueryString });
var loveUrl = (newParams, {
  url,
  currentParams,
  anchor,
  persistAnchor,
  relative = GLOBAL_CONFIG.defaultRelative
} = {}) => {
  let [_url, _currentParams, malformed] = (url || GLOBAL_CONFIG.urlProvider()).split("?");
  if (malformed) {
    throw new Error(
      `Malformed URL detected: ${url || GLOBAL_CONFIG.urlProvider()} 
Url seems to have more than a single query delimiter -> "?"`
    );
  }
  if (relative && !url) {
    const isAbsolute = _url.match(/\w\.\w{3}(\/[\w]+.*$)/);
    if (isAbsolute && isAbsolute[1]) {
      _url = isAbsolute[1];
    }
  }
  let _params = _currentParams && currentParams !== null ? _currentParams : currentParams;
  if (_params && _params[0] === "?") {
    _params = _params.slice(1);
  }
  let newAnchor = "";
  if (anchor) {
    newAnchor = `#${anchor}`;
  }
  if (_params) {
    if (_params.includes("#")) {
      const [paramsWithoutAnchor, existingAnchor] = _params.split("#");
      _params = paramsWithoutAnchor;
      if (persistAnchor && !anchor) {
        newAnchor = `#${existingAnchor}`;
      }
    }
  }
  let newUrl = `${_url}${GLOBAL_CONFIG._paramsBuilder(
    newParams,
    _params
  )}${newAnchor}`;
  return newUrl;
};

export {
  loveUrl
};
