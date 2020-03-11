# Try [framework name] in local

Quick start of [framework name] in your laptop.
You can create an secure and scalable Plasma application by reading this document.

## Setup aggregator

### 1. Get test aggregator

Get [plasma-aggregator](https://github.com/cryptoeconomicslab/wakkanay-plasma-aggregator).

```
git clone git@github.com:cryptoeconomicslab/wakkanay-plasma-aggregator.git
npm i
```

You can start the Plasma transaction aggregator and contract in your laptop by Docker Compose.

```
docker-compose up
```

### 2. Get out.config.json

```
cat /build/out.config.json
```

## Create your application

### 1. Install

To start Plasma transfer, we first need to install Plasma libraries from npm.

```
npm i ethers
npm i @cryptoeconomicslab/eth-plasma-light-client @cryptoeconomicslab/primitives @cryptoeconomicslab/level-kvs
```

Copy out.config.json generated in previous section from `wakkanay-plasma-aggregator`.

### 2. Instantiate

You can instantiate light client object using Wallet class of ethers.js.

```typescript
import * as ethers from "ethers";
import { Bytes } from "@cryptoeconomicslab/primitives";
import { LevelKeyValueStore } from "@cryptoeconomicslab/level-kvs";
import initializeLightClient from "@cryptoeconomicslab/eth-plasma-light-client";

import * as deciderConfig from "./out.config.json";
const DEPOSIT_CONTRACT_ADDRESS =
  deciderConfig.payoutContracts["DepositContract"];

const kvs = new LevelKeyValueStore(Bytes.fromString("plasma_light_client"));
const wallet = new ethers.Wallet(
  privateKey,
  ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
);
const client = await initializeLightClient({
  wallet,
  kvs,
  deciderConfig
});
```

### 4. Get balance

You can get balance on Plasma.

```typescript
const balance = await liteClient.getBalance();
console.log(balance);
```

### 4. Deposit to Plasma

You can deposit L1 token to Plasma.

```typescript
await liteClient.deposit(10, DEPOSIT_CONTRACT_ADDRESS);
```

### 5. Transfer

You can make your first Plasma transaction!

```typescript
await liteClient.transfer(10, DEPOSIT_CONTRACT_ADDRESS, to);
```

## Tips

Do you want to run client on browser?
You can choose IndexedDb for client database.

```typescript
import { IndexedDbKeyValueStore } from "@cryptoeconomicslab/indexeddb-kvs";
```
