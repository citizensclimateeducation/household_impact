module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:prettier/recommended",
        "prettier/flowtype",
        "prettier/react",
        "prettier/standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "globalReturn": true,
            "generators": false,
            "objectLiteralDuplicateProperties": false,
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};