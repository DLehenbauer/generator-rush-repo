import { benchmark } from "hotloop";
import { example } from "../../src";

benchmark("example()", () => {
    return example();
});
