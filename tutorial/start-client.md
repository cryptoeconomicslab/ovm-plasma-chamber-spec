# Start plasma-light-client

## 1. Start client

You can instantiate light client object using `Wallet` class of `ethers.js`.

```javascript
const ethers = require("ethers");
const { Bytes } = require("@cryptoeconomicslab/primitives");
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs");
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default;

// TODO: enter your private key
const PRIVATE_KEY = "ENTER YOUR PRIVATE KEY";
const config = require("./config.local.json");

async function startLightClient() {
  const kvs = new LevelKeyValueStore(Bytes.fromString("plasma_light_client"));
  const wallet = new ethers.Wallet(
    PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  );
  const lightClient = await initializeLightClient({
    wallet,
    kvs,
    config,
    aggregatorEndpoint: "http://127.0.0.1:3000"
  });
  await lightClient.start();
  return lightClient;
}
```

## This is the source code right now

```javascript
const ethers = require("ethers");
const { Bytes } = require("@cryptoeconomicslab/primitives");
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs");
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default;

// TODO: enter your private key
const PRIVATE_KEY = "ENTER YOUR PRIVATE KEY";
const config = require("./config.local.json");

async function startLightClient() {
  const kvs = new LevelKeyValueStore(Bytes.fromString("plasma_light_client"));
  const wallet = new ethers.Wallet(
    PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  );
  const lightClient = await initializeLightClient({
    wallet,
    kvs,
    config,
    aggregatorEndpoint: "http://127.0.0.1:3000"
  });
  await lightClient.start();
  return lightClient;
}
```

## Go to the next step!

You have started plasma light client successfully.

Please go to the [Deposit]() step.
