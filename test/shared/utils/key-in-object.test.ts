import { isKeyIn } from "../../../src/shared/utils";

describe("isKeyIn", () => {
    it("should be a function", () => {
        expect(typeof isKeyIn).toBe("function");
    });

    it("be callable", () => {
        expect(() => isKeyIn({}, "key")).not.toThrow();
    });

    [false, true].forEach((checkKeyType) => {
        const kt = <T>(keyType: T) => (checkKeyType ? keyType : undefined);

        it(`should return true for keys${
            checkKeyType ? " and keyType" : ""
        }`, () => {
            const val = Symbol("val");
            expect(isKeyIn({ key: val }, "key", kt("symbol"))).toBe(true);

            /** Just a test function. */
            function testFunction() {
                // pass
            }
            expect(isKeyIn(testFunction, "name", kt("string"))).toBe(true);

            class TestClass {
                key = 1337;
            }
            expect(isKeyIn(new TestClass(), "key", kt("number"))).toBe(true);
        });

        it(`should return false for missing keys${
            checkKeyType ? " and keyType" : ""
        }`, () => {
            const kt = <T>(keyType: T) => (checkKeyType ? keyType : undefined);

            expect(isKeyIn({}, "key", kt("symbol"))).toBe(false);

            /** Just a test function. */
            function testFunction() {
                // pass
            }
            expect(isKeyIn(testFunction, "nope", kt("string"))).toBe(false);

            class TestClass {
                key = 1337;
            }
            expect(isKeyIn(new TestClass(), "nope", kt("number"))).toBe(false);
        });
    });
});
