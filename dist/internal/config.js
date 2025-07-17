export const defaultConfig = {
    defaultRelative: true,
    defaultLocationProvider: () => window.location,
    arraySeparator: "_._",
    _paramsBuilder: (() => {
        throw "params builder not initialized";
    }),
};
/** Config memory object */
export let GLOBAL_CONFIG = defaultConfig;
export function initializeLoveUrl(userConfig) {
    GLOBAL_CONFIG = {
        ...GLOBAL_CONFIG,
        ...userConfig,
    };
}
