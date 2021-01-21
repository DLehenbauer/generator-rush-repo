// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
    extends: ["@rushstack/eslint-config/profile/node"],
    plugins: ["header", "prettier"],
    rules: {
        "header/header": [
            "error",
            "block",
            "!\n * Copyright (c) <%= author %>. All rights reserved.\n * Licensed under the <%= license %> License.\n ",
            /* newLines: */ 2, // '\n\n' = 1 blank line after block comment
        ],
        "prettier/prettier": "error",
    },
};
