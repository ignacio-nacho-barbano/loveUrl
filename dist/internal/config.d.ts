import type { buildSearchParamsQueryString } from "./buildSearchParams";
export type LoveUrlConfig = {
    /** build relative urls by default when called without specifying a full url or domain */
    defaultRelative: boolean;
    /** used to identify arrays and separate array members; by default an array will be comma separated which can cause issues in some browsers when combined with strings with commas; also if there's a single entry; it's impossible to know that the original data format was an array; this ensures data and type consistency */
    arraySeparator: string;
    /** Source for the current url, by default it is the window.location.href; if you use SSR provide a function to get an object of the same format on the server */
    urlProvider: () => string;
    /** custom params builder; provided through dependency injection for testing purposes.  */
    _paramsBuilder: typeof buildSearchParamsQueryString;
};
export declare const defaultConfig: LoveUrlConfig;
/** Config memory object */
export declare let GLOBAL_CONFIG: LoveUrlConfig;
export declare function initializeLoveUrl(userConfig: Partial<LoveUrlConfig>): void;
