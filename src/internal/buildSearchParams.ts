import { isUndefined, omitBy } from "lodash-es";
import {
  buildEncodedSearchString,
  type parseAndDecodeSearchStringOptions,
} from "./encodeAndDecodeSearchStrings";
import { parseLoveUrl } from "./parseLoveUrl";

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
        ? parseLoveUrl(current as ParamsQuery)
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
