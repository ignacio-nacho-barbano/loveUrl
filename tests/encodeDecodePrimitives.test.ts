import { describe, test, expect } from "vitest";
import {
  decodePrimitive,
  encodeIfStringOrNull,
} from "../dist/internal/encodeDecodePrimitives";

describe("primitive encoding & decoding", () => {
  describe("decodePrimitive", () => {
    test("it successfully decodes all types of accepted primitives", () => {
      expect(decodePrimitive("true")).toBe(true);
      expect(decodePrimitive("false")).toBe(false);
      expect(decodePrimitive("null")).toBe(null);
      expect(decodePrimitive("21")).toBe(21);
      expect(decodePrimitive("5.14031")).toBe(5.14031);
      expect(decodePrimitive(encodeURIComponent("Hi-21"))).toBe("Hi-21");
      expect(
        decodePrimitive(encodeURIComponent("Some $#21 string %$#@! !!!"))
      ).toBe("Some $#21 string %$#@! !!!");
    });
  });
  describe("encodeIfStringOrNull", () => {
    test("it successfully decencodesodes all types of accepted primitives", () => {
      expect(encodeIfStringOrNull(true)).toBe(true);
      expect(encodeIfStringOrNull(false)).toBe(false);
      expect(encodeIfStringOrNull(null)).toBe("null");
      expect(encodeIfStringOrNull(21)).toBe(21);
      expect(encodeIfStringOrNull(5.14031)).toBe(5.14031);
      expect(encodeIfStringOrNull("Hi-21")).toBe(encodeURIComponent("Hi-21"));
      expect(encodeIfStringOrNull("Some $#21 string %$#@! !!!")).toBe(
        encodeURIComponent("Some $#21 string %$#@! !!!")
      );
    });
  });
});
