import type { ParamsQuery } from "./buildSearchParams";
import { GLOBAL_CONFIG } from "./config";
import {
  type PrimitivesInUrl,
  decodePrimitive,
  encodeIfStringOrNull,
} from "./encodeDecodePrimitives";

export type parseAndDecodeSearchStringOptions<T> = {
  /** This should be used for user inputs. User's could input numbers, nulls,
   * or booleans breaking the usage of the primitive parser */
  parseAsString?: (keyof T)[];
};

export const parseAndDecodeSearchString = <T>(
  searchParamsString: string,
  { parseAsString }: parseAndDecodeSearchStringOptions<T> = {}
): Partial<T> => {
  const result: Record<string, unknown> = {};
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
    } else if (value && value !== "undefined") {
      if (parseAsString?.includes(key as keyof T)) {
        result[key] = value;
      } else {
        const parsedValue = decodePrimitive(value);

        if (parsedValue === undefined) continue;

        result[key] = parsedValue;
      }
    }
  }

  return result as Partial<T>;
};

export const encodeArrayForUrlParam = (
  values: PrimitivesInUrl[],
  key?: string
): string =>
  !values.length
    ? ""
    : `${key ? `${key}=` : ""}${GLOBAL_CONFIG.arraySeparator}${values
        .map(encodeIfStringOrNull)
        .join(GLOBAL_CONFIG.arraySeparator)}`;

export const buildEncodedSearchString = (
  params: Record<string, PrimitivesInUrl | PrimitivesInUrl[]>
): string => {
  const members = Object.entries(params).sort(([a], [b]) =>
    a.toLowerCase() > b.toLowerCase() ? 1 : -1
  );
  const result: string[] = [];

  for (let i = 0; i < members.length; i++) {
    const [key, value] = members[i];

    if (Array.isArray(value)) {
      // If the array is empty, we don't want to include it in the query string
      if (value.length) {
        result.push(encodeArrayForUrlParam(value, key));
      }
    } else if (value !== undefined && value !== "") {
      result.push(`${key}=${encodeIfStringOrNull(value)}`);
    }
  }

  return `?${result.join("&")}`;
};

/** 
  converts params to a string and replaces all instances of separator then removes any additional commas
  default separator is '_._'
 */
export const parseSeparatorToCommas = (paramsString: string | ParamsQuery) => {
  const stringToParse =
    typeof paramsString !== "string" ? paramsString.toString() : paramsString;
  return stringToParse
    .replaceAll(`=${GLOBAL_CONFIG.arraySeparator}`, "=")
    .replaceAll(GLOBAL_CONFIG.arraySeparator, ",");
};
