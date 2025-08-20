import { SUSPICIOUS_PATTERN } from "./regex";

export type PrimitivesInUrl = string | number | boolean | null | undefined;

export const decodePrimitive = (value: string): PrimitivesInUrl => {
  if (value === "true") return true;

  if (value === "false") return false;

  if (value === "null") return null;

  if (value === "undefined") return undefined;

  const number = Number(value);

  if (!Number.isNaN(number)) return number;

  // ReplaceAll is not available
  let decoded = decodeURIComponent(value.split("+").join(" "));

  console.log(value);

  if (SUSPICIOUS_PATTERN.test(value)) {
    return undefined;
  }

  return decoded;
};

export const encodeIfStringOrNull = (
  value: PrimitivesInUrl
): PrimitivesInUrl => {
  if (typeof value === "string" || value === null)
    return encodeURIComponent(value as string);

  return value;
};
