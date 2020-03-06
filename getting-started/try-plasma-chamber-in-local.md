# Try Plasma Chamber in local

Quick start of Plasma Chamber in your laptop.

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
npm i @cryptoeconomicslab/plasma-light-client @cryptoeconomicslab/eth-contract @cryptoeconomicslab/eth-wallet @cryptoeconomicslab/primitives @cryptoeconomicslab/level-kvs
```

Copy out.config.json generated in previous section from `wakkanay-plasma-aggregator`.

### 2. Instantiate

You can instantiate light client object using Wallet class of ethers.js.

```typescript
import * as ethers from "ethers";
import { EthWallet } from "@cryptoeconomicslab/eth-wallet";
import { Address, Bytes } from "@cryptoeconomicslab/primitives";
import { LevelKeyValueStore } from "@cryptoeconomicslab/level-kvs";
import {
  DepositContract,
  ERC20Contract,
  CommitmentContract,
  AdjudicationContract,
  OwnershipPayoutContract,
  PETHContract
} from "@cryptoeconomicslab/eth-contract";
import LightClient from "@cryptoeconomicslab/plasma-light-client";
import * as deciderConfig from "./out.config.json";

const witnessDb = new LevelKeyValueStore(
  Bytes.fromString("plasma_light_client")
);
const wallet = new EthWallet(
  new ethers.Wallet(
    privateKey,
    ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  )
);
const adjudicationContract = new AdjudicationContract(
  Address.from(deciderConfig.adjudicationContract),
  eventDb,
  signer
);
function depositContractFactory(address) {
  return new DepositContract(address, eventDb, signer);
}
function tokenContractFactory(address) {
  return new ERC20Contract(address, signer);
}
const commitmentContract = new CommitmentContract(
  Address.from(deciderConfig.commitmentContract),
  eventDb,
  signer
);
const ownershipPayoutContract = new OwnershipPayoutContract(
  Address.from(deciderConfig.payoutContracts["OwnershipPayout"]),
  signer
);

const client = await LightClient.initialize({
  wallet,
  witnessDb,
  adjudicationContract,
  depositContractFactory,
  tokenContractFactory,
  commitmentContract,
  ownershipPayoutContract,
  deciderConfig
});

client.registerCustomToken(
  new PETHContract(Address.from(deciderConfig.PlasmaETH), signer),
  depositContractFactory(
    Address.from(deciderConfig.payoutContracts["DepositContract"])
  )
);
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
await liteClient.deposit(10, TOKEN_ADDRESS);
```

### 5. Transfer

You can make your first Plasma transaction!

```typescript
await liteClient.transfer(10, to);
```
