import { type parseAndDecodeSearchStringOptions } from "./encodeAndDecodeSearchStrings";
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
export declare const parseSearchParams: <T>(params: ParamsQuery, { validations, parseAsString }?: ParseOptions<T>) => ParamsObject<T>;
/**
 * ## Use this to build a new params object
 * **Undefined** values will be removed, use that to delete a param
 * @param newParams new params to be assigned, re assigned, or deleted
 * @param current your useSearchParams
 * @returns URLSearchParams
 */
export declare const buildNewParamsObject: <T>(newParams: ParamsObject<T>, current?: ParamsQuery | ParamsObject | null) => ParamsObject<T>;
/**
 * ## Use this to create a new params string
 * * **Undefined** values will be removed, use that to delete a param
 * @param newParams new params to be assigned, re assigned, or deleted
 * @param current your useSearchParams
 */
export declare const buildSearchParamsQueryString: <T>(newParams: ParamsObject<T>, current?: ParamsQuery | ParamsObject | null) => string;
