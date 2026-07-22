const nextConfig = require("eslint-config-next/core-web-vitals");

module.exports = [
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];