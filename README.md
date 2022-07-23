# type-magic

Typescript utility library for working with the MTG color identity system

## Installation

```bash
$ npm install type-magic
```

## Usage

```typescript
// Use the ColorIdentityString type
// It's a string in the /w?u?b?r?g?/ format
const myId: ColorIdentityString = 'wubrg'
const myOtherId: ColorIdentityString = 'wbg'
const myThirdId: ColorIdentityString = ''
// const doesntCompile: ColorIdentityString = 'xyz' // Error!

// Use the static ColorIdentity API to work with color identity strings
ColorIdentity.add('wub', 'brg') // returns 'wubrg'
ColorIdentity.contains('wubr', 'br') // returns true
ColorIdentity.lt('u', 'ub') // returns true
ColorIdentity.components('wub') // returns ['', 'w', 'u', 'b']
ColorIdentity.subColorIdentities('wg') // returns ['', 'g', 'w', 'wg']

// Create objects using Constructor or ColorIdentity.parse(...)
const myObj = new ColorIdentity('wubrg') // only accepts ColorIdentityString input
const myOtherObj = ColorIdentity.parse('wubrg') // accepts any string input and throws if invalid
const myThirdObj = ColorIdentity.parse('invalid') // Error!

// Modify and query ColorIdentity objects using the fluent interface API
myObj
  .subtract(ColorIdentity.FULL)
  .add('wbg')
  .subtract('b')
  .subColorIdentities() // ['', 'g', 'w', 'wg']

// Use the cid function for convenience:
// It is a shortcut that accepts either 
// - a valid color identity string
// - or a typescript template strings array, but without strong typing

// function syntax:
const myCid = cid('wubrg')
// const doesntCompile = cid('not a CI string') // Error!

// template strings array syntax:
const myOtherCid = cid`wubrg`
const myThirdCid = cid`will compile but throw error`
```

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
