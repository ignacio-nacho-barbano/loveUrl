import { ParamsQuery, ParseOptions, ParamsObject } from "./buildSearchParams";
import { parseAndDecodeSearchString } from "./encodeAndDecodeSearchStrings";

export const parseLoveUrl = <T>(
  params: ParamsQuery,
  { validations, parseAsString }: ParseOptions<T> = {}
): ParamsObject<T> => {
  const paramsObj = parseAndDecodeSearchString<T>(
    typeof params === "string" ? params : params.toString(),
    { parseAsString }
  );

  if (typeof paramsObj !== "object") {
    console.error("Error when parsing params:\n", params);
    return {};
  }

  if (validations) {
    Object.keys(validations).forEach((key) => {
      const prop = paramsObj[key as keyof T];
      const validation = validations[key as keyof T];

      if (prop && !validation?.(prop)) {
        paramsObj[key as keyof T] = undefined;
      }
    });
  }

  return paramsObj as ParamsObject<T>;
};
