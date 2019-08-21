export const CONFIG_FILE_NAME = 'tsconfig.json'
export const CONFIG = `{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015"]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}`
