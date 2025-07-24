import {
  SUSPICIOUS_PATTERN
} from "./chunk-RKREI7DL.mjs";

// src/internal/encodeDecodePrimitives.ts
var decodePrimitive = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value === "undefined") return void 0;
  const number = Number(value);
  if (!Number.isNaN(number)) return number;
  let decoded = decodeURIComponent(value.replaceAll("+", " "));
  console.log(value);
  if (SUSPICIOUS_PATTERN.test(value)) {
    return void 0;
  }
  return decoded;
};
var encodeIfStringOrNull = (value) => {
  if (typeof value === "string" || value === null)
    return encodeURIComponent(value);
  return value;
};

export {
  decodePrimitive,
  encodeIfStringOrNull
};
