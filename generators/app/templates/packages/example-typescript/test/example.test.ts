import { strict as assert } from "assert";
import { example } from "../src";

describe("example()", () => {
    test("returns a number", () => {
        assert.equal(typeof example(), "number");
    });
});
