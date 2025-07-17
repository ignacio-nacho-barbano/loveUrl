import { describe, expect, test } from "vitest";
import {
  buildEncodedSearchString,
  parseAndDecodeSearchString,
} from "../dist/internal/encodeAndDecodeSearchStrings";
import { GLOBAL_CONFIG } from "../dist";

describe("Encode decode search string", () => {
  const decoded = {
    num: 5,
    str: "Hi 🛑 !!!! ,,, super good, blabla",
    truthy: true,
    falsy: false,
    nil: null,
  };

  const dirtyObj = {
    ...decoded,
    emp: "",
    und: undefined,
  };

  const encoded =
    "?falsy=false&nil=null&num=5&str=Hi%20%F0%9F%9B%91%20!!!!%20%2C%2C%2C%20super%20good%2C%20blabla&truthy=true";

  const dirtyString = `${encoded}&emp=&und=undefined`;

  const decodedWithArray = {
    mixArr: [
      1,
      3.14,
      true,
      false,
      null,
      "Hi 🛑 !!!! ,,, super good, blabla",
      "bye, 🛑",
    ],
  };

  const encodedWithArray =
    "?mixArr=_._1_._3.14_._true_._false_._null_._Hi%20%F0%9F%9B%91%20!!!!%20%2C%2C%2C%20super%20good%2C%20blabla_._bye%2C%20%F0%9F%9B%91";

  describe("buildEncodedSearchString", () => {
    test("it encodes all types of accepted primitives", () => {
      expect(buildEncodedSearchString(dirtyObj)).toBe(encoded);
    });

    test("it encodes array and joins them by comma", () => {
      const result = buildEncodedSearchString(decodedWithArray);

      expect(result.split(GLOBAL_CONFIG.arraySeparator).length).toBe(8);
      expect(result).toEqual(encodedWithArray);
    });

    test("it sorts the keys", () => {
      const result = buildEncodedSearchString({
        b: 5,
        c: 5,
        d: 1,
        z: "",
        zz: "12",
        a: 2,
      });
      expect(result).toEqual("?a=2&b=5&c=5&d=1&zz=12");
    });
  });

  describe("parseAndDecodeSearchString", () => {
    test("it decodes all types of accepted primitives", () => {
      expect(parseAndDecodeSearchString(encoded)).toEqual(decoded);
    });

    test("it removes unwanted empty and undefined values", () => {
      expect(parseAndDecodeSearchString(dirtyString)).toEqual(decoded);
    });

    test("it decodes arrays", () => {
      expect(parseAndDecodeSearchString(encodedWithArray)).toEqual(
        decodedWithArray
      );
    });

    test("it decodes the specified keys as strings when requested to do so", () => {
      expect(
        parseAndDecodeSearchString(encoded, {
          parseAsString: ["num", "truthy", "nil"],
        })
      ).toEqual({ ...decoded, num: "5", truthy: "true", nil: "null" });
    });
  });
});
