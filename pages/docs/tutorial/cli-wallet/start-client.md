---
id: Start_Client
title: 2. Start client
sidebar_label: Start client
description: Gazelle's step-by-step guide for you to build a client wallet to make deposits, transfers, and withdrawals of Ether and ERC20 tokens to/from Plasma chains.
---

In this chapter, we will start the light client with Plasma.

Once this chapter is complete, you will be able to easily communicate with the Plasma Aggregator.

## 2-1. Implement to start client

You can instantiate light client with

- `Wallet` class of `ethers.js`
- Database to use
- Configuration file
- Aggregator endpoint

```javascript
const ethers = require("ethers")
const leveldown = require("leveldown")
const { Bytes } = require("@cryptoeconomicslab/primitives")
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs")
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default

// TODO: Please enter your private key when you start the application.
const PRIVATE_KEY = process.argv[2] || ""
if (!PRIVATE_KEY) {
  throw "Please set your private key"
}
const config = require("./config.local.json")
const wallet = new ethers.Wallet(
  PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
)

async function startLightClient() {
  const dbName = wallet.address
  const kvs = new LevelKeyValueStore(
    Bytes.fromString(dbName),
    leveldown(dbName)
  )
  const lightClient = await initializeLightClient({
    wallet,
    kvs,
    config,
    aggregatorEndpoint: "http://127.0.0.1:3000"
  })
  await lightClient.start()
  return lightClient
}
```

## Current source code

<details>
<summary>Click here</summary>

```javascript
const readline = require("readline")
const ethers = require("ethers")
const leveldown = require("leveldown")
const { Bytes } = require("@cryptoeconomicslab/primitives")
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs")
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default

// TODO: Please enter your private key when you start the application.
const PRIVATE_KEY = process.argv[2] || ""
if (!PRIVATE_KEY) {
  throw "Please set your private key"
}
const config = require("./config.local.json")
const wallet = new ethers.Wallet(
  PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function startLightClient() {
  const dbName = wallet.address
  const kvs = new LevelKeyValueStore(
    Bytes.fromString(dbName),
    leveldown(dbName)
  )
  const lightClient = await initializeLightClient({
    wallet,
    kvs,
    config,
    aggregatorEndpoint: "http://127.0.0.1:3000"
  })
  await lightClient.start()
  return lightClient
}

function cliWalletReadLine() {
  rl.question(">> ", async input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "quit":
        console.log("Bye.")
        rl.close()
        process.exit()
      default:
        console.log(`${command} is not found`)
        cliWalletReadLine()
    }
  })
}

function main() {
  cliWalletReadLine()
}

main()
```

</details>

## Go to the next step!

You have started plasma light client successfully.

This makes it easy to communicate with Plasma using some of the client's methods.

Move on to the [3. Deposit](Deposit) step.
