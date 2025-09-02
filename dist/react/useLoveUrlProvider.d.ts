import * as react_jsx_runtime from 'react/jsx-runtime';
import { LoveUrlConfig } from '../internal/config.js';
import { PropsWithChildren } from 'react';
import '../buildSearchParams-I55RwR-S.js';
import '../internal/encodeDecodePrimitives.js';

type LoveUrlProviderProps = {
    options: Partial<LoveUrlConfig>;
};
type LoveUrlContextApi = {};
declare const useLoveUrlProvider: () => LoveUrlContextApi;
declare const LoveUrlProvider: ({ options, children }: LoveUrlProviderProps & PropsWithChildren) => react_jsx_runtime.JSX.Element;

export { type LoveUrlContextApi, LoveUrlProvider, type LoveUrlProviderProps, useLoveUrlProvider };
