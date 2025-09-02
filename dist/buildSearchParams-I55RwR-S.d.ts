import { PrimitivesInUrl } from './internal/encodeDecodePrimitives.js';

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
declare const buildNewParamsObject: <T>(newParams: ParamsObject<T>, current?: ParamsQuery | ParamsObject | null) => ParamsObject<T>;
declare const buildSearchParamsQueryString: <T>(newParams: ParamsObject<T>, current?: ParamsQuery | ParamsObject | null) => string;

export { type ParamsObject as P, type ParamsQuery as a, type ParseOptions as b, buildSearchParamsQueryString as c, parseAndDecodeSearchString as d, encodeArrayForUrlParam as e, buildEncodedSearchString as f, parseSeparatorToCommas as g, buildNewParamsObject as h, type parseAndDecodeSearchStringOptions as p };
