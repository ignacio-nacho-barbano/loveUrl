import { isUndefined, omitBy } from "lodash-es";
import { buildEncodedSearchString, parseAndDecodeSearchString, } from "./encodeAndDecodeSearchStrings";
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
export const parseSearchParams = (params, { validations, parseAsString } = {}) => {
    const paramsObj = parseAndDecodeSearchString(typeof params === "string" ? params : params.toString(), { parseAsString });
    if (typeof paramsObj !== "object") {
        console.error("Error when parsing params:\n", params);
        return {};
    }
    if (validations) {
        Object.keys(validations).forEach((key) => {
            const prop = paramsObj[key];
            const validation = validations[key];
            if (prop && !validation?.(prop)) {
                paramsObj[key] = undefined;
            }
        });
    }
    return paramsObj;
};
/**
 * ## Use this to build a new params object
 * **Undefined** values will be removed, use that to delete a param
 * @param newParams new params to be assigned, re assigned, or deleted
 * @param current your useSearchParams
 * @returns URLSearchParams
 */
export const buildNewParamsObject = (newParams, current) => {
    let currentObject = {};
    if (current) {
        currentObject =
            typeof current === "string" || ("get" in current && "append" in current)
                ? parseSearchParams(current)
                : current;
    }
    return omitBy({
        ...currentObject,
        ...newParams,
    }, isUndefined);
};
/**
 * ## Use this to create a new params string
 * * **Undefined** values will be removed, use that to delete a param
 * @param newParams new params to be assigned, re assigned, or deleted
 * @param current your useSearchParams
 */
export const buildSearchParamsQueryString = (newParams, current) => {
    return buildEncodedSearchString(buildNewParamsObject(newParams, current));
};
