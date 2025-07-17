import type { buildSearchParamsQueryString } from "./buildSearchParams";

export type LoveUrlConfig = {
  /** build relative urls by default when called without specifying a full url or domain */
  defaultRelative: boolean;
  /** used to identify arrays and separate array members; by default an array will be comma separated which can cause issues in some browsers when combined with strings with commas; also if there's a single entry; it's impossible to know that the original data format was an array; this ensures data and type consistency */
  arraySeparator: string;
  /** Source for the current url, by default it is the window.location object; if you use SSR provide a function to get an object of the same format on the server */
  defaultLocationProvider: () => Location;
  /** custom params builder; provided through dependency injection for testing purposes.  */
  _paramsBuilder: typeof buildSearchParamsQueryString;
};

export const defaultConfig: LoveUrlConfig = {
  defaultRelative: true,
  defaultLocationProvider: () => window.location,
  arraySeparator: "_._",
  _paramsBuilder: (() => {
    throw "params builder not initialized";
  }) as LoveUrlConfig["_paramsBuilder"],
};

/** Config memory object */
export let GLOBAL_CONFIG: LoveUrlConfig = defaultConfig;

export function initializeLoveUrl(userConfig: Partial<LoveUrlConfig>) {
  GLOBAL_CONFIG = {
    ...GLOBAL_CONFIG,
    ...userConfig,
  };
}
