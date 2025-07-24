import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  buildNewParamsObject,
  buildSearchParamsQueryString,
} from "../dist/internal/buildSearchParams";
import { loveUrl, initializeLoveUrl, parseLoveUrl } from "../dist";

describe("buildSearchParams utils", () => {
  const newParamsObj = {
    override1: "New String here!✅",
    override2: 10,
    override3: true,
    override4: undefined,
    "query-string": "searching",
    NUMBER_X: 1,
    useValue: true,
    someValues: ["a,~1", "b,~2", "c,.__3", "😎", 6, 7],
    undef: undefined,
  };
  const newParams = buildSearchParamsQueryString(newParamsObj);
  const prevParamsObj = {
    override1: "override",
    override2: 5,
    override3: false,
    override4: ["hi"],
    anArray: [1, 2, 3, "a", "b"],
    special: true,
    example: "STRIIIING,  soome 🔥!",
  };

  const pathname = "/example/some-url/";
  const prevParams = buildSearchParamsQueryString(prevParamsObj);
  const absoluteUrl = `https://website.com${pathname}${prevParams}#deps-web`;

  describe("parseLoveUrl", () => {
    const values = parseLoveUrl<typeof newParamsObj>(newParams);

    test("it removes undefined", () => {
      expect(!("undef" in values)).toBe(true);
      expect(!("override4" in values)).toBe(true);
    });

    describe("when using options", () => {
      test("it parses values as arrays when joined by coma", () => {
        const { someValues = [] } =
          parseLoveUrl<typeof newParamsObj>(newParams);

        expect(someValues[0]).toBe("a,~1");
        expect(someValues[1]).toBe("b,~2");
        expect(someValues[2]).toBe("c,.__3");
        expect(someValues[3]).toBe("😎");
        expect(someValues[4]).toBe(6);
        expect(someValues[5]).toBe(7);
      });

      test("it parses values as arrays even when there is a single member on the array", () => {
        const params = buildSearchParamsQueryString({
          ...newParamsObj,
          someValues: ["a-1"],
        });
        const values = parseLoveUrl<typeof newParamsObj>(params);

        expect(values.someValues?.[0]).toBe("a-1");
      });

      test("it parses single values with commas as single values ", () => {
        const params = buildSearchParamsQueryString({
          ...newParamsObj,
          someValues: ["a-1, b-2"],
        });
        const values = parseLoveUrl<typeof newParamsObj>(params);

        expect(values.someValues?.[0]).toBe("a-1, b-2");
      });

      test("it parses multiple value with comas correctly", () => {
        const params = buildSearchParamsQueryString({
          ...newParamsObj,
          someValues: ["a-1, b-2", "the great, tiger"],
        });

        const values = parseLoveUrl<typeof newParamsObj>(params);

        expect(values.someValues?.[0]).toBe("a-1, b-2");
        expect(values.someValues?.[1]).toBe("the great, tiger");
      });

      describe("validations", () => {
        test("it allows valid values to pass", () => {
          const parsedParams = parseLoveUrl<typeof newParamsObj>(newParams, {
            validations: {
              someValues: (values) => (values as string[]).includes("a,~1"),
            },
          });

          expect(parsedParams).toEqual(newParamsObj);
        });

        test("it removes invalid values", () => {
          const parsedParams = parseLoveUrl<typeof newParamsObj>(newParams, {
            validations: {
              // This should fail, we don't have this value on the newParamsObj
              someValues: (values) => (values as string[]).includes("🔫"),
            },
          });

          const expectedResult = { ...newParamsObj };

          // @ts-expect-error
          // biome-ignore lint/performance/noDelete: testing
          delete expectedResult.someValues;

          expect(parsedParams).toEqual(expectedResult);
        });

        test("it allows for using default values when the validations fails", () => {
          const { NUMBER_X = 10 } = parseLoveUrl<typeof newParamsObj>(
            "NUMBER_X=1",
            {
              validations: {
                // This should fail, we don't have this value on the newParamsObj
                NUMBER_X: (number) => (number as number) > 500,
              },
            }
          );

          expect(NUMBER_X).toEqual(10);
        });
      });
    });
  });

  describe("buildSearchParamsObject", () => {
    test("It removes undefined values on old params", () => {
      expect(
        buildNewParamsObject({ ...newParamsObj }, "someUndefined=undefined")
      ).toEqual({
        ...newParamsObj,
      });
    });

    test("It removes undefined values on new params", () => {
      expect(
        buildNewParamsObject({ ...newParamsObj, someUndefined: undefined })
      ).toEqual(newParamsObj);
    });

    test("It overrides values from old params when provided undefined", () => {
      const result = { ...prevParamsObj, ...newParamsObj };

      // @ts-expect-error we want to delete, we know is wrong.
      // biome-ignore lint/performance/noDelete: <explanation>
      delete result.override1;
      // @ts-expect-error we want to delete, we know is wrong.
      // biome-ignore lint/performance/noDelete: <explanation>
      delete result.override2;

      expect(
        buildNewParamsObject(
          { ...newParamsObj, override1: undefined, override2: undefined },
          prevParams
        )
      ).toEqual(result);
    });

    test("It works with pre existing urlSearchParams instances", () => {
      expect(
        buildNewParamsObject(
          { ...newParamsObj, someUndefined: undefined },
          prevParams
        )
      ).toEqual({ ...prevParamsObj, ...newParamsObj });
    });

    test("It preserves current params with when those have string format", () => {
      expect(
        buildNewParamsObject(
          { ...newParamsObj, someUndefined: undefined },
          prevParams
        )
      ).toEqual({
        ...prevParamsObj,
        ...newParamsObj,
      });
    });

    test("It works with all types of params & casing", () => {
      expect(buildNewParamsObject(newParamsObj)).toEqual(newParamsObj);
    });

    test("It preserves current params with when those have string format", () => {
      expect(buildNewParamsObject(newParamsObj, prevParams)).toEqual({
        ...prevParamsObj,
        ...newParamsObj,
      });
    });

    test("It preserves current params when those have SearchParams format", () => {
      expect(buildNewParamsObject(newParamsObj, prevParams)).toEqual({
        ...prevParamsObj,
        ...newParamsObj,
      });
    });

    test("It does add empty strings", () => {
      expect(
        buildNewParamsObject({ ...newParamsObj, special: "" }, prevParamsObj)
      ).toEqual({ ...prevParamsObj, ...newParamsObj, special: "" });
    });

    test("It does add null values", () => {
      expect(
        buildNewParamsObject({ ...newParamsObj, special: null }, prevParams)
      ).toEqual({ ...prevParamsObj, ...newParamsObj, special: null });
    });

    test("It does add 0 values", () => {
      expect(
        buildNewParamsObject({ ...newParamsObj, special: 0 }, prevParams)
      ).toEqual({ ...prevParamsObj, ...newParamsObj, special: 0 });
    });

    test("It overrides pre-exiting params with new ones", () => {
      expect(
        buildNewParamsObject(
          { ...newParamsObj, special: 0, example: "Another string" },
          prevParams
        )
      ).toEqual({
        ...prevParamsObj,
        ...newParamsObj,
        special: 0,
        example: "Another string",
      });
    });
  });

  describe("buildSearchParamsQueryString util", () => {
    test("It deletes undefined values when given an object as previous params", () => {
      expect(
        buildSearchParamsQueryString(
          { ...newParamsObj, special: undefined },
          prevParams
        )
      ).toBe(
        "?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&useValue=true"
      );
    });

    test("It overrides pre existing values", () => {
      expect(
        buildSearchParamsQueryString(
          { ...newParamsObj, special: 0, example: "Another string" },
          prevParams
        )
      ).toBe(
        "?anArray=_._1_._2_._3_._a_._b&example=Another%20string&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=0&useValue=true"
      );
    });

    test("It deletes preserves boolean values even when those are false", () => {
      expect(
        buildSearchParamsQueryString(
          { ...newParamsObj, special: false },
          prevParams
        )
      ).toBe(
        "?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=false&useValue=true"
      );
    });

    test("it builds the params calling buildSearchParamsQueryString with the right params", () => {
      expect(
        buildSearchParamsQueryString(
          { ...newParamsObj, special: undefined },
          prevParams
        )
      ).toBe(
        "?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&useValue=true"
      );
    });
  });

  describe("loveUrl util", () => {
    beforeEach(() => {
      initializeLoveUrl({
        urlProvider: () => absoluteUrl,
      });
    });

    test("It grabs the current params from the URL when the currentParams is undefined", () => {
      expect(loveUrl(newParamsObj)).toBe(
        `${pathname}?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=true&useValue=true`
      );
    });

    test("It appends the params using a ?", () => {
      expect(loveUrl(newParamsObj)).toBe(
        `${pathname}?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=true&useValue=true`
      );
    });

    test("It uses current params if passed on the URL", () => {
      expect(
        loveUrl(
          { otherOne: 5 },
          { url: `${pathname}?someParam=true`, anchor: "some-anchor" }
        )
      ).toBe(`${pathname}?otherOne=5&someParam=true#some-anchor`);
    });

    test("It uses current params if passed on the URL even when current params are also passed", () => {
      expect(
        loveUrl(
          { otherOne: 5 },
          {
            url: `${pathname}?someParam=true#old-anchor`,
            currentParams: "?someParam=false&otherOne=6",
            anchor: "some-anchor",
          }
        )
      ).toBe(`${pathname}?otherOne=5&someParam=true#some-anchor`);
    });

    test("It uses the passed hash", () => {
      expect(loveUrl(newParamsObj, { anchor: "idString" })).toBe(
        `${pathname}?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=true&useValue=true#idString`
      );
    });

    test("It deletes the existing hash by default", () => {
      /* This behavior differs from the one applied to there params were by default
    state is preserved because we don't want to scroll back to an element when a param changes */

      expect(loveUrl(newParamsObj)).toBe(
        `${pathname}?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=true&useValue=true`
      );
    });

    test("It deletes the existing hash by default when passed on the url param", () => {
      expect(loveUrl(newParamsObj, { url: absoluteUrl })).toBe(
        `${pathname}?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=true&useValue=true`
      );
    });

    test("It deletes the existing hash when passed an empty string", () => {
      expect(loveUrl(newParamsObj, { url: absoluteUrl, anchor: "" })).toBe(
        `${pathname}?anArray=_._1_._2_._3_._a_._b&example=STRIIIING%2C%20%20soome%20%F0%9F%94%A5!&NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&special=true&useValue=true`
      );
    });

    test("it does not preserve the current params when passed null", () => {
      expect(loveUrl(newParamsObj, { currentParams: null })).toBe(
        `${pathname}?NUMBER_X=1&override1=New%20String%20here!%E2%9C%85&override2=10&override3=true&query-string=searching&someValues=_._a%2C~1_._b%2C~2_._c%2C.__3_._%F0%9F%98%8E_._6_._7&useValue=true`
      );
    });

    test.skip("it builds the params calling buildSearchParamsQueryString with the right params", () => {
      const mock = vi.fn();
      initializeLoveUrl({ _paramsBuilder: mock });
      loveUrl(newParamsObj);
      expect(mock).toHaveBeenCalledWith(newParamsObj, null);
      initializeLoveUrl({ _paramsBuilder: buildSearchParamsQueryString });
    });
  });
});
