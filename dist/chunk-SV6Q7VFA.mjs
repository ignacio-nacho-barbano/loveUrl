import {
  GLOBAL_CONFIG
} from "./chunk-DMGKTHOH.mjs";
import {
  decodePrimitive,
  encodeIfStringOrNull
} from "./chunk-GCZVDRH3.mjs";

// src/internal/encodeAndDecodeSearchStrings.ts
var parseAndDecodeSearchString = (searchParamsString, { parseAsString } = {}) => {
  const result = {};
  const _searchString = searchParamsString.startsWith("?") ? searchParamsString.slice(1) : searchParamsString;
  const members = _searchString.split("&");
  for (let i = 0; i < members.length; i++) {
    const [key, value] = members[i].split("=");
    if (value?.startsWith(GLOBAL_CONFIG.arraySeparator)) {
      result[key] = value.split(GLOBAL_CONFIG.arraySeparator).map(decodePrimitive).slice(1);
    } else if (value && value !== "undefined") {
      if (parseAsString?.includes(key)) {
        result[key] = value;
      } else {
        const parsedValue = decodePrimitive(value);
        if (parsedValue === void 0) continue;
        result[key] = parsedValue;
      }
    }
  }
  return result;
};
var encodeArrayForUrlParam = (values, key) => !values.length ? "" : `${key ? `${key}=` : ""}${GLOBAL_CONFIG.arraySeparator}${values.map(encodeIfStringOrNull).join(GLOBAL_CONFIG.arraySeparator)}`;
var buildEncodedSearchString = (params) => {
  const members = Object.entries(params).sort(
    ([a], [b]) => a.toLowerCase() > b.toLowerCase() ? 1 : -1
  );
  const result = [];
  for (let i = 0; i < members.length; i++) {
    const [key, value] = members[i];
    if (Array.isArray(value)) {
      if (value.length) {
        result.push(encodeArrayForUrlParam(value, key));
      }
    } else if (value !== void 0 && value !== "") {
      result.push(`${key}=${encodeIfStringOrNull(value)}`);
    }
  }
  return `?${result.join("&")}`;
};
var parseSeparatorToCommas = (paramsString) => {
  const stringToParse = typeof paramsString !== "string" ? paramsString.toString() : paramsString;
  return stringToParse.replaceAll(`=${GLOBAL_CONFIG.arraySeparator}`, "=").replaceAll(GLOBAL_CONFIG.arraySeparator, ",");
};

export {
  parseAndDecodeSearchString,
  encodeArrayForUrlParam,
  buildEncodedSearchString,
  parseSeparatorToCommas
};
