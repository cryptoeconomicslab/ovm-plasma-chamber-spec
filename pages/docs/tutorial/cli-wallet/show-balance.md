---
id: Show_Balance
title: 4. Show balance
sidebar_label: Show balance
---

In this chapter, we will implement the methods to check the balances in the main chain and Plasma chain.

Let's see if you deposited successfully!

## 4-1. Implement to get your L2 balance

Just call the `getBalance` function of the plasma light client to easily check your balance.

[Plasma Light Client API reference | getBalance](/docs/api/Plasma_Light_Client#getbalance)

```javascript
async function getBalance(client) {
  const balance = await client.getBalance()
  console.log(
    `${client.address}: ${ethers.utils.formatEther(
      balance[0].amount.toString()
    )} ETH`
  )
}
```

## 4-2. Implement to get your L1 balance

In order to make sure that your main chain balance has been properly reduced after the deposit, you should also prepare a method to obtain the main chain balance.

```javascript
async function getL1Balance(client) {
  const balance = await wallet.getBalance()
  console.log(
    `${client.address}: ${ethers.utils.formatEther(balance.toString())} ETH`
  )
}
```

## 4-3. Add getBalance functions to the CLI

To call the `getBalance` function in the CLI Wallet, add some processing to the ReadLine.

```javascript
function cliWalletReadLine(client) {
  rl.question(">> ", async input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "getbalance":
        await getBalance(client)
        cliWalletReadLine(client)
        break
      case "getl1balance":
        await getL1Balance(client)
        cliWalletReadLine(client)
        break
      default:
        console.log(`${command} is not found`)
        cliWalletReadLine(client)
    }
  })
}
```

## 4-4. Check your L2 balance

Launch the CLI Wallet and check your balance of Layer2!

Start the app with the node command and try `getbalance`.

```
$ node app.js <YOUR PRIVATE KEY>
>> getbalance
```

## 4-5. Check your L1 balance

Also, check your balance in the main chain was reduced.

Try `getl1balance`.

```
$ node app.js <YOUR PRIVATE KEY>
>> getl1balance
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
const DEPOSIT_CONTRACT_ADDRESS = config.payoutContracts.DepositContract
const wallet = new ethers.Wallet(
  PRIVATE_KEY,
  new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function deposit(client, amount) {
  console.log("deposit:", amount)
  await client.deposit(amount, DEPOSIT_CONTRACT_ADDRESS)
}

async function getBalance(client) {
  const balance = await client.getBalance()
  console.log(
    `${client.address}: ${ethers.utils.formatEther(
      balance[0].amount.toString()
    )} ETH`
  )
}

async function getL1Balance(client) {
  const balance = await wallet.getBalance()
  console.log(
    `${client.address}: ${ethers.utils.formatEther(balance.toString())} ETH`
  )
}

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

function cliWalletReadLine(client) {
  rl.question(">> ", async input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "deposit":
        await deposit(client, args[0])
        cliWalletReadLine(client)
        break
      case "getbalance":
        await getBalance(client)
        cliWalletReadLine(client)
        break
      case "getl1balance":
        await getL1Balance(client)
        cliWalletReadLine(client)
        break
      case "quit":
        console.log("Bye.")
        rl.close()
        process.exit()
      default:
        console.log(`${command} is not found`)
        cliWalletReadLine(client)
    }
  })
}

async function main() {
  const client = await startLightClient()
  cliWalletReadLine(client)
}

main()
```

</details>

## Go to the next step!

Now that you've checked your balance and confirmed that the token has been properly deposited to Plasma, right?

In the next chapter, we'll be transferring tokens on Plasma!

Move on to the [5. Transfer](Transfer) step.
