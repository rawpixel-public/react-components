# react-components

![tests](https://github.com/rawpixel-public/react-components/workflows/tests/badge.svg?branch=master)

rawpixel React component library.

## Install

The library is published to GitHub packages, so the host app will need an `.npmrc`
file defined to indicate where to look for the `@rawpixel-public` packages.

```text
# .npmrc contents
@rawpixel-public:registry=https://npm.pkg.github.com
```

Then add the package via npm/yarn.

```bash
npm install --save @rawpixel-public/react-components
```

Ensure `peerDependencies` specified are also installed.

## Usage

```jsx
import React, { Component } from "react";

import MyComponent from "@rawpixel-public/rawpixel-components";

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

## Development

Clone the repository and install dependencies via `yarn`, in both the root
directory and `./storybook`

```bash
yarn install
cd storybook && yarn install
```

To develop components locally within this repository, you can use Storybook.

```bash
# watch changes in ./src
yarn start
# starts storybook development server @ http://localhost:6006
cd storybook && yarn start
```

Alternatively, you could use `npm link` from your host application to link
`@rawpixel-public/react-components` to your local instance of this repository, then
develop the component from the host application.

In order to ensure your component can be imported, you need to implement at
least one of the following:

`import` and `export` your component from `./src/index.js`. This means apps can
import the component like this:

```jsx
import { MyComponent } from "@rawpixel-public/react-components";

const Example = () => (
  <div>
    <MyComponent />
  </div>
);
```

Or, update `rollup.config.js` to include the file separately in the `input`
config array to generate it's own file. This would allow imports like this,
which may be preferable for code-splitting:

```jsx
import MyComponent from "@rawpixel-public/react-components/dist/my-component";

const Example = () => (
  <div>
    <MyComponent />
  </div>
);
```

## Publishing

### Package

Ensure you have configured your development environment to [publish to GitHub packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#publishing-a-package).

Then increment version and publish (example below).

```bash
# npm
npm version minor # increment minor version, tag and commit
npm publish # publish 

# yarn
yarn publish --minor # tags, commits and publishes
```

### Documentation

Exports the Storybook site statically and publishes to GitHub pages.

```bash
yarn deploy
```

## License

MIT © [RawPixel](https://www.rawpixel.com)
