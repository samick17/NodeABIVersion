# node-abi-version 

Get abi version by node/iojs version

## Support the project

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/samick17)
[![Donate](https://img.shields.io/badge/Donate-BuyMeCoffee-Blue.svg)](https://www.buymeacoffee.com/samick)

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```
npm install node-abi-version --save
```

## NPM

 [module](https://www.npmjs.com/package/node-abi-version)

## ChangeLogs

  [Link](./CHANGELOG.md)

## Usage

	var NodeABI = require('node-abi-version');

	NodeABI.getABIVersion();

//   will return abi version by nodejs version.

	NodeABI.getABIVersionByNodeVersion(nodeVersion);

//    will return abi version by specified node version.

	console.log(NodeABI.abiVersionMap);

//  will return map object:
>
>  {

> '10.3.0': '64',
>
> '10.2.1': '64',

> '10.2.0': '64',

>    ...
>  }


> your abi number

> see also [io.js & Node.js Previous Releases](https://nodejs.org/en/download/releases/)


## Dependencies

- [xml-node-parser](https://github.com/samick17/xml-node-parser)

## Dev Dependencies


None

## License

MIT
