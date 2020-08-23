// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
 
module.exports = {
    extends: ["@rushstack/eslint-config"],
    plugins: ["header"],
    rules: {
        "header/header": [2, "block", "!\n * Copyright (c) <%= author %>. All rights reserved.\n * Licensed under the <%= license %> License.\n "]
    },
};
