# declass

> Statically analyze HTML to detect potential class groupings

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

## Install

Install using npm or yarn:

```bash
npm i declass
# or
yarn add declass
```

Import into your Node.js project:

```js
// CommonJS
const { declass } = require('declass')

// ESM
import { declass } from 'declass'
```

## Usage


```ts
declass(html)
```

```js
[
  "class": "duration-200 group-hover:opacity-100 transition-opacity",
  "uses": [
    "<div class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 absolute top-4 right-6 cursor-pointer" data-v-cc3a34da="">",
    "<img src=\\"https://avatars3.githubusercontent.com/u/2781561?v=4&s=24\\" alt=\\"Troy Morehouse\\" width=\\"24\\" height=\\"24\\" class=\\"relative inline-block rounded-full text-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100\\" data-v-cc3a34da=\\"\\">",
    ...
  ],
  ...
]
```
(see [test snapshot](./test/__snapshots__/index.test.ts.snap))


## License

MIT. Made with 💖

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/declass?style=flat-square
[npm-version-href]: https://npmjs.com/package/declass

[npm-downloads-src]: https://img.shields.io/npm/dm/declass?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/declass

[github-actions-src]: https://img.shields.io/github/workflow/status/nuxt-contrib/declass/ci/master?style=flat-square
[github-actions-href]: https://github.com/nuxt-contrib/declass/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/gh/nuxt-contrib/declass/master?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-contrib/declass
