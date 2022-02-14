module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": ["react-app", "prettier", "eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
    }
};