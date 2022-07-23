# type-magic

Typescript utility library for working with the MTG color identity system

## Installation

```bash
$ npm install type-magic
```

## Usage

TODO

## Development

The `package.json` contains a `scripts` section with tools needed for development.
After cloning this repository, use a package manager of your choice to install
the dependencies (e.g. `npm install`).

### `clean`

Deletes the `dist/` and `coverage/` directories that are generated when building or testing
the project.

### `build`

Builds the project using `tsc`.
This build is used for active development and debugging purposes.

### `build:prod`

Builds the project, but swaps out the build configuration file (`tsconfig.prod.json`).
This build is used for public releases of this library.

### `test`

Runs all tests for the project with code coverage using `jest`.

### `test:watch`

Starts the `jest` unit test runner in watch mode.

### `lint`

Scans all typescript files for linting errors as specified in `.eslintrc.js`.

### `lint:fix`

Runs the `lint` check and fixes each error if possible.

### `prepublish`

An `npm` hook that is invoked whenever a version of this library is about to be `npm publish`ed.
