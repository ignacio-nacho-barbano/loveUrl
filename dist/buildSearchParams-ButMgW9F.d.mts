import { PrimitivesInUrl } from './internal/encodeDecodePrimitives.mjs';

type parseAndDecodeSearchStringOptions<T> = {
    parseAsString?: (keyof T)[];
};
declare const parseAndDecodeSearchString: <T>(searchParamsString: string, { parseAsString }?: parseAndDecodeSearchStringOptions<T>) => Partial<T>;
declare const encodeArrayForUrlParam: (values: PrimitivesInUrl[], key?: string) => string;
declare const buildEncodedSearchString: (params: Record<string, PrimitivesInUrl | PrimitivesInUrl[]>) => string;
declare const parseSeparatorToCommas: (paramsString: string | ParamsQuery) => string;

type ParamsObject<T = Record<string, unknown>> = Partial<T>;
type ParamsQuery = URLSearchParams | string;
type ParseOptions<T> = {
    validations?: Partial<Record<keyof T, (value: unknown) => boolean>>;
} & parseAndDecodeSearchStringOptions<T>;
declare const parseSearchParams: <T>(params: ParamsQuery, { validations, parseAsString }?: ParseOptions<T>) => ParamsObject<T>;
declare const buildNewParamsObject: <T>(newParams: ParamsObject<T>, current?: ParamsQuery | ParamsObject | null) => ParamsObject<T>;
declare const buildSearchParamsQueryString: <T>(newParams: ParamsObject<T>, current?: ParamsQuery | ParamsObject | null) => string;

export { type ParamsObject as P, parseAndDecodeSearchString as a, buildSearchParamsQueryString as b, buildEncodedSearchString as c, parseSeparatorToCommas as d, encodeArrayForUrlParam as e, type ParamsQuery as f, type ParseOptions as g, parseSearchParams as h, buildNewParamsObject as i, type parseAndDecodeSearchStringOptions as p };
