# Gnar CLI

The easiest way to adorn your applications with Gnarly Opinions&trade;

# Usage

Gnar-cli can be installed most easily with brew:

```bash
$ brew tap TheGnarCo/gnar
$ brew install gnar
```

You can also use your favorite NPM package manager:

```js
yarn global add gnar-cli
npm install -g gnar-cli
```

This will make the `gnar` executable available in your terminal.

## Commands

There are two commands provided by `Gnar-cli`: `init` and `add`.

### gnar init

You can use `init` to greenfield new projects with specific frameworks.

```bash
$ gnar init rails new-app
```

This is equivalent to running `rails new new-app <gnarly config options here>`.

Right now, `init` supports `rails`.

### gnar add

You can use `add` to configure already-existing projects with specific configurations for specific dependencies.

```bash
$ gnar add eslint
```

This will add `eslint` to the `package.json` of the local project, as well as modifying it with Gnarly Opinions.

Right now, `add` supports `eslint` and `prettier`.

## Configs

Configuration information and opinons for these commands are maintained by the [`.gnarrc`](https://github.com/TheGnarCo/.gnarrc) repo. PR's Welcome!

## Developing

Gnar-CLI is powered by [TypeScript] which means the project has to be compiled before being run.

1. Run `yarn` to install dependencies
1. Run `yarn build:watch` to start the TypeScript compiler in watch mode.
1. Run `yarn dev` to run the local build of the application

[typescript]: https://www.typescriptlang.org/

## Publishing

See [PUBLISHING.md](PUBLISHING.md)

## About The Gnar Company

![The Gnar Company](https://avatars0.githubusercontent.com/u/17011419?s=100&v=4)

If you’re ready to dream it, we’re ready to build it. The Gnar is a custom software company ready to tackle your biggest challenges. Visit [The Gnar Company website](https://www.thegnar.com/) to learn more about us or [contact us](https://www.thegnar.com/contact) to see how we can help design and develop your product.
