import { describe, it, expect } from "vitest";

const regex =
  /<script\b[^>]*>|javascript:|on\w+=|eval\(|setTimeout\(|setInterval\(/i;

describe("suspiciousPattern regex", () => {
  it("matches <script> tags", () => {
    expect(regex.test("<script>alert(1)</script>")).toBe(true);
  });

  it("matches javascript: URI", () => {
    expect(regex.test('javascript:alert("x")')).toBe(true);
  });

  it("matches inline event handlers", () => {
    expect(regex.test('<img src="x" onerror="alert(1)">')).toBe(true);
    expect(regex.test('onclick="doSomething()"')).toBe(true);
  });

  it("matches eval usage", () => {
    expect(regex.test('eval("something")')).toBe(true);
  });

  it("matches setTimeout usage", () => {
    expect(regex.test('setTimeout("alert(1)", 1000)')).toBe(true);
  });

  it("matches setInterval usage", () => {
    expect(regex.test('setInterval("alert(1)", 1000)')).toBe(true);
  });

  it("does not match harmless input", () => {
    expect(regex.test("hello world")).toBe(false);
    expect(regex.test("<div>safe</div>")).toBe(false);
    expect(regex.test("click here to continue")).toBe(false);
  });

  it("matches case-insensitively", () => {
    expect(regex.test("<ScRiPt>alert()</ScRiPt>")).toBe(true);
    expect(regex.test("JaVaScRiPt:alert(1)")).toBe(true);
  });
});
