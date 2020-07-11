import { run } from "hotloop";

(async () => {
    await run([
        { "path": "./example.bench.ts" },
    ]);
})();
