import type { ParamsQuery } from "./buildSearchParams";
import { type PrimitivesInUrl } from "./encodeDecodePrimitives";
export type parseAndDecodeSearchStringOptions<T> = {
    /** This should be used for user inputs. User's could input numbers, nulls,
     * or booleans breaking the usage of the primitive parser */
    parseAsString?: (keyof T)[];
};
export declare const parseAndDecodeSearchString: <T>(searchParamsString: string, { parseAsString }?: parseAndDecodeSearchStringOptions<T>) => Partial<T>;
export declare const encodeArrayForUrlParam: (values: PrimitivesInUrl[], key?: string) => string;
export declare const buildEncodedSearchString: (params: Record<string, PrimitivesInUrl | PrimitivesInUrl[]>) => string;
/**
  converts params to a string and replaces all instances of separator then removes any additional commas
  default separator is '_._'
 */
export declare const parseSeparatorToCommas: (paramsString: string | ParamsQuery) => string;
