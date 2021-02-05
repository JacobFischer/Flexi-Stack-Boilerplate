import { isObject } from "../../../src/shared/utils";

describe("isObject", () => {
    it("should be a function", () => {
        expect(typeof isObject).toBe("function");
    });

    it("be callable", () => {
        expect(() => isObject({})).not.toThrow();
    });

    it("should return true for objects", () => {
        expect(isObject({})).toBe(true);

        class TestClass {
            // nothing
        }
        expect(isObject(new TestClass())).toBe(true);
    });

    it("should return false for not objects", () => {
        [null, 1337, () => undefined, 1234n, undefined, "str"].forEach((val) =>
            expect(isObject(val)).toBe(false),
        );
    });
});
