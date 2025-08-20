import { b as buildSearchParamsQueryString } from '../buildSearchParams-CoXCbsqo.js';
import './encodeDecodePrimitives.js';

type LoveUrlConfig = {
    defaultRelative: boolean;
    arraySeparator: string;
    urlProvider: () => string;
    _paramsBuilder: typeof buildSearchParamsQueryString;
};
declare const defaultConfig: LoveUrlConfig;
declare let GLOBAL_CONFIG: LoveUrlConfig;
declare function initializeLoveUrl(userConfig: Partial<LoveUrlConfig>): void;

export { GLOBAL_CONFIG, type LoveUrlConfig, defaultConfig, initializeLoveUrl };
