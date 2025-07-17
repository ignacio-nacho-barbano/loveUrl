export type PrimitivesInUrl = string | number | boolean | null | undefined;
export declare const decodePrimitive: (value: string) => PrimitivesInUrl;
export declare const encodeIfStringOrNull: (value: PrimitivesInUrl) => PrimitivesInUrl;
