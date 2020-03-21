# Try [framework name] in local
Quick start of [framework name] on your laptop.
You can create a secure and scalable Plasma application by reading this document.
This quick start using Typescript SDK, you need the latest version of Node.js.

## Prerequistes
- Python2.7
- Node v10.x
- Docker  

## Setup aggregator

### 1. Get test aggregator

Get [plasma-aggregator](https://github.com/cryptoeconomicslab/wakkanay-plasma-aggregator).

```
$ git clone git@github.com:cryptoeconomicslab/wakkanay-plasma-aggregator.git
$ cd wakkanay-plasma-aggregator
$ npm i
```

You can start the Plasma transaction aggregator and contract in your laptop by Docker Compose.

```
$ cp .sample.env .env
$ docker-compose up
```

### 2. Get out.config.json

```
cat contract/build/out.config.json
```

## Create your application

### 1. Install

To start Plasma transfer, we first need to install Plasma libraries from npm.  
copy out.config.json file to your application repository root.

```
npm i ethers
npm i @cryptoeconomicslab/eth-plasma-light-client @cryptoeconomicslab/primitives @cryptoeconomicslab/level-kvs
```

Copy out.config.json generated in previous section from `wakkanay-plasma-aggregator`.

### 2. Instantiate

You can instantiate light client object using Wallet class of ethers.js.

```javascript
const ethers = require("ethers");
const { Bytes } = require("@cryptoeconomicslab/primitives");
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs");
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default;

const config = require("./out.config.json");

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
    aggregatorEndpoint: "http://localhost:3000"
  });
}

main()
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
const config = require("./out.config.json");
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
