export const CONFIG_FILE_NAME = 'tslint.json'
export const CONFIG = `{
  "extends": ["tslint:recommended", "tslint-react"],
  "linterOptions": {
    "exclude": ["node_modules/**"]
  },
  "rules": {
    "arrow-parens": [true, "ban-single-arg-parens"],
    "interface-name": [true, "never-prefix"],
    "interface-over-type-literal": false,
    "jsx-boolean-value": [true, "never"],
    "jsx-no-multiline-js": false,
    "object-literal-key-quotes": false,
    "ordered-imports": false,
    "quotemark": [true, "single", "jsx-double"],
    "semicolon": [true, "never"],
    "member-ordering": [
      true,
      {
        "order": [
          "public-constructor",
          "public-instance-field"
        ]
      }
    ],
    "trailing-comma": [
      true,
      {
        "esSpecCompliant": true,
        "multiline": {
          "arrays": "always",
          "functions": "always",
          "objects": "always",
          "typeLiterals": "ignore"
        }
      }
    ],
    "variable-name": [
      true,
      "allow-leading-underscore",
      "allow-pascal-case",
      "ban-keywords",
      "check-format"
    ]
  }
}`
