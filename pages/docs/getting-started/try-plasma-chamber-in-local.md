---
id: Try_Gazelle_In_Local
title: Try Gazelle in local
sidebar_label: Try Gazelle in local
---

Following this document, you will be able to build secure and scalable Dapps using Plasma.
For this quick start document using Typescript SDK, you need Node.js with the version later than v.10.x.

## Prerequisites

- Python2.7
- Node v10.x
- Docker

## Setup aggregator

### 1. Run test aggregator

Get Plasma aggregator from [wakkanay repository](https://github.com/cryptoeconomicslab/wakkanay).

```bash
$ git clone https://github.com/cryptoeconomicslab/wakkanay.git
$ cd wakkanay
$ npm run docker:build
$ npm run docker:cp
$ npm run docker:start
```

Contracts config file `config.local.json` is generated at the root directory after `npm run docker:build` f you have not installed them yet.

## Create your application

### 1. Install

Install the following libraries using npm to enable fund transfers in Plasma.

- @cryptoeconomicslab/eth-plasma-light-client
  - A client for communication between Plasma and Application.
- @cryptoeconomicslab/primitives
  - A primitive type to be handled on OVM.
- @cryptoeconomicslab/level-kvs
  - A database used by the Client.

```bash
$ npm i ethers
$ npm i @cryptoeconomicslab/eth-plasma-light-client @cryptoeconomicslab/primitives @cryptoeconomicslab/level-kvs
```

Copy `config.local.json` file to your application repository root.

```
$ cp -p <your wakkanay path>/integration-test/aggregator/src/config.local.json ./config.local.json
```

### 2. Instantiate

You can instantiate light client object using Wallet class of ethers.js.

```javascript
const ethers = require("ethers");
const { Bytes } = require("@cryptoeconomicslab/primitives");
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs");
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default;

const config = require("./config.local.json");

async function main() {
  const kvs = new LevelKeyValueStore(Bytes.fromString("plasma_light_client"));
  const wallet = new ethers.Wallet(
    "your private key here",
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  );
  const lightClient = await initializeLightClient({
    wallet,
    kvs,
    config,
    aggregatorEndpoint: "http://localhost:3000",
  });
  await lightClient.start();
}

main();
```

Do you want to run client on browser? You can choose IndexedDb for client database.

```javascript
const { IndexedDbKeyValueStore } = require("@cryptoeconomicslab/indexeddb-kvs");
```

### 3. Get balance

You can get balance on Plasma.

```javascript
const balance = await lightClient.getBalance();
console.log("balance", balance);
```

### 4. Deposit to Plasma

Let's deposit L1 token to Plasma.
Plasma requires a contract to deposit L1 tokens to Plasma.
You can get default Deposit Contract for ETH.

```javascript
const config = require("./config.local.json");
// Get default Deposit Contract address
const DEPOSIT_CONTRACT_ADDRESS = config.payoutContracts.DepositContract;
```

Deposit 10 wei to Plasma.

```javascript
await lightClient.deposit(10, DEPOSIT_CONTRACT_ADDRESS);
```

### 5. Transfer

You can make your first Plasma transaction!

```javascript
await lightClient.transfer(10, DEPOSIT_CONTRACT_ADDRESS, to);
```

### 6. Exit and withdraw assets from Plasma

Start exit your asset from Plasma.

```javascript
await lightClient.exit(10, DEPOSIT_CONTRACT_ADDRESS);
const exitList = await lightClient.getExitList();
console.log("new exits", exitList);
```

After dispute period, you can withdraw your asset to Ethereum.

```javascript
const exitList = await lightClient.getExitList();
if (exitList[0]) {
  await lightClient.finalizeExit(exitList[0]);
}
```
