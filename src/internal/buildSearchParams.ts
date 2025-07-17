import { isUndefined, omitBy } from "lodash-es";
import {
  buildEncodedSearchString,
  parseAndDecodeSearchString,
  type parseAndDecodeSearchStringOptions,
} from "./encodeAndDecodeSearchStrings";

export type ParamsObject<T = Record<string, unknown>> = Partial<T>;
export type ParamsQuery = URLSearchParams | string;

export type ParseOptions<T> = {
  validations?: Partial<Record<keyof T, (value: unknown) => boolean>>;
} & parseAndDecodeSearchStringOptions<T>;

/** ## Use this together with useSearchParams or any page's params
 * ### Code sample:
 * ```tsx
 * const params = useSearchParams<{name: string, age: number}>();
 * const {name, age} = parseSearchParams(params);
 * ```
 * ### Advantages:
 * - You can type it
 * - You can destructure params
 * - Components will update when any member changes (because you use params here)
 */
export const parseSearchParams = <T>(
  params: ParamsQuery,
  { validations, parseAsString }: ParseOptions<T> = {}
): ParamsObject<T> => {
  const paramsObj = parseAndDecodeSearchString<T>(
    typeof params === "string" ? params : params.toString(),
    { parseAsString }
  );

  if (typeof paramsObj !== "object") {
    console.error("Error when parsing params:\n", params);
    return {};
  }

  if (validations) {
    Object.keys(validations).forEach((key) => {
      const prop = paramsObj[key as keyof T];
      const validation = validations[key as keyof T];

      if (prop && !validation?.(prop)) {
        paramsObj[key as keyof T] = undefined;
      }
    });
  }

  return paramsObj as ParamsObject<T>;
};

/**
 * ## Use this to build a new params object
 * **Undefined** values will be removed, use that to delete a param
 * @param newParams new params to be assigned, re assigned, or deleted
 * @param current your useSearchParams
 * @returns URLSearchParams
 */
export const buildNewParamsObject = <T>(
  newParams: ParamsObject<T>,
  current?: ParamsQuery | ParamsObject | null
): ParamsObject<T> => {
  let currentObject: ParamsObject = {};

  if (current) {
    currentObject =
      typeof current === "string" || ("get" in current && "append" in current)
        ? parseSearchParams(current as ParamsQuery)
        : (current as ParamsObject);
  }

  return omitBy(
    {
      ...currentObject,
      ...newParams,
    },
    isUndefined
  ) as ParamsObject<T>;
};

/**
 * ## Use this to create a new params string
 * * **Undefined** values will be removed, use that to delete a param
 * @param newParams new params to be assigned, re assigned, or deleted
 * @param current your useSearchParams
 */
export const buildSearchParamsQueryString = <T>(
  newParams: ParamsObject<T>,
  current?: ParamsQuery | ParamsObject | null
): string => {
  return buildEncodedSearchString(
    buildNewParamsObject(newParams, current) as Record<string, string>
  );
};
