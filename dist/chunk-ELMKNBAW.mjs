import {
  parseAndDecodeSearchString
} from "./chunk-TX3VNHBK.mjs";

// src/internal/parseLoveUrl.ts
var parseLoveUrl = (params, { validations, parseAsString } = {}) => {
  const paramsObj = parseAndDecodeSearchString(
    typeof params === "string" ? params : params.toString(),
    { parseAsString }
  );
  if (typeof paramsObj !== "object") {
    console.error("Error when parsing params:\n", params);
    return {};
  }
  if (validations) {
    Object.keys(validations).forEach((key) => {
      const prop = paramsObj[key];
      const validation = validations[key];
      if (prop && !validation?.(prop)) {
        paramsObj[key] = void 0;
      }
    });
  }
  return paramsObj;
};

export {
  parseLoveUrl
};
