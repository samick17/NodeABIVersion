# node-abi-version 

Get abi version by node/iojs version

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```
npm install node-abi-version --save
```

## ChangeLogs

#### 2019/10/26

1. Update abi version map for latest: Node.js: 13.0.1(abi: 79)
2. Move xml-node-parser to devDeps.

#### 2019/06/22

1. Update abi version map for latest: Node.js: 12.4.0(abi: 72)

#### 2019/01/20

1. Update abi version map for latest: Node.js: 11.7.0(abi: 67)

#### 2018/11/02

1. Update abi version map for latest: Node.js: 11.1.0(abi: 67)

#### 2018/08/15

1. Update abi version map for latest: Node.js: 10.8.0(abi: 64)

#### 2018/07/31

1. Update abi version map for latest: Node.js: 10.7.0(abi: 64)

#### 2018/07/15

1. Update abi version map for latest: Node.js: 10.6.0(abi: 64)

#### 2018/06/02
 
1. bugfix: some of wrong abi version(6.x.x), reported by 
**KSR YASUDA**.
2. replace module htmlparser2 with xml-node-parser
3. update abi version map for latest: Node.js 10.3.0(abi: 64)

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
