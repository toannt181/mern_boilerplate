module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "func-names": 0,
      "no-console": 0,
      "no-bitwise": 0,
      "import/no-dynamic-require": 0,
      "global-require": 0,
      "semi": 0,
      "camelcase": 0,
      "arrow-body-style": 0
    }
};