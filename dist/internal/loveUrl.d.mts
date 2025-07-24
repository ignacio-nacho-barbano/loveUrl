import { P as ParamsObject } from '../buildSearchParams-Dt3CHWZL.mjs';
import './encodeDecodePrimitives.mjs';

type LoveUrlOptions = {
    currentParams?: string | null | undefined;
    anchor?: string | null;
    persistAnchor?: boolean;
    url?: string;
    relative?: boolean;
};
declare const loveUrl: <T>(newParams: ParamsObject<T>, { url, currentParams, anchor, persistAnchor, relative, }?: LoveUrlOptions) => string;
type LoveUrlParams<T> = Parameters<typeof loveUrl<T>>;

export { type LoveUrlOptions, type LoveUrlParams, loveUrl };
