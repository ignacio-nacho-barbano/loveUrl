type PrimitivesInUrl = string | number | boolean | null | undefined;
declare const decodePrimitive: (value: string) => PrimitivesInUrl;
declare const encodeIfStringOrNull: (value: PrimitivesInUrl) => PrimitivesInUrl;

export { type PrimitivesInUrl, decodePrimitive, encodeIfStringOrNull };
