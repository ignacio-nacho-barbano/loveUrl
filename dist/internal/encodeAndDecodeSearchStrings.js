import { GLOBAL_CONFIG } from "./config";
import { decodePrimitive, encodeIfStringOrNull, } from "./encodeDecodePrimitives";
export const parseAndDecodeSearchString = (searchParamsString, { parseAsString } = {}) => {
    const result = {};
    const _searchString = searchParamsString.startsWith("?")
        ? searchParamsString.slice(1)
        : searchParamsString;
    const members = _searchString.split("&");
    for (let i = 0; i < members.length; i++) {
        const [key, value] = members[i].split("=");
        if (value?.startsWith(GLOBAL_CONFIG.arraySeparator)) {
            result[key] = value
                .split(GLOBAL_CONFIG.arraySeparator)
                .map(decodePrimitive)
                .slice(1);
        }
        else if (value && value !== "undefined") {
            if (parseAsString?.includes(key)) {
                result[key] = value;
            }
            else {
                result[key] = decodePrimitive(value);
            }
        }
    }
    return result;
};
export const encodeArrayForUrlParam = (values, key) => !values.length
    ? ""
    : `${key ? `${key}=` : ""}${GLOBAL_CONFIG.arraySeparator}${values
        .map(encodeIfStringOrNull)
        .join(GLOBAL_CONFIG.arraySeparator)}`;
export const buildEncodedSearchString = (params) => {
    const members = Object.entries(params).sort(([a], [b]) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
    const result = [];
    for (let i = 0; i < members.length; i++) {
        const [key, value] = members[i];
        if (Array.isArray(value)) {
            // If the array is empty, we don't want to include it in the query string
            if (value.length) {
                result.push(encodeArrayForUrlParam(value, key));
            }
        }
        else if (value !== undefined && value !== "") {
            result.push(`${key}=${encodeIfStringOrNull(value)}`);
        }
    }
    return `?${result.join("&")}`;
};
/**
  converts params to a string and replaces all instances of separator then removes any additional commas
  default separator is '_._'
 */
export const parseSeparatorToCommas = (paramsString) => {
    const stringToParse = typeof paramsString !== "string" ? paramsString.toString() : paramsString;
    return stringToParse
        .replaceAll(`=${GLOBAL_CONFIG.arraySeparator}`, "=")
        .replaceAll(GLOBAL_CONFIG.arraySeparator, ",");
};
