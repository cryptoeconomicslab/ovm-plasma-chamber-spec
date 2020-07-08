---
id: Transfer
title: 5. Transfer
sidebar_label: Transfer
description: Gazelle's step-by-step guide for you to build a client wallet to make deposits, transfers, and withdrawals of Ether and ERC20 tokens to/from Plasma chains.
---

In this chapter, we'll be implementing remittances on Plasma.

## 5-1. Implement transfer

You can call the `transfer` method from the plasma light client.

You can easily send the tokens on Plasma by simply passing the amount you want to send, DepositContractAddress and the recipient as arguments!

[Plasma Light Client API reference | transfer](/docs/api/Plasma_Light_Client#transfer)

```javascript
async function transfer(client, amount, to) {
  console.log("transfer:", amount, to)
  await client.transfer(amount, DEPOSIT_CONTRACT_ADDRESS, to)
}
```

## 5-2. Add transfer function to the CLI

To call the `transfer` function in the CLI Wallet, add some processing to the ReadLine.

```javascript
function cliWalletReadLine(client) {
  rl.question(">> ", async input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "transfer":
        await transfer(client, args[0], args[1])
        cliWalletReadLine(client)
        break
      default:
        console.log(`${command} is not found`)
        cliWalletReadLine(client)
    }
  })
}
```

## 5-3. Transfer ether

Now, let's launch the CLI Wallet and actually make the transfer!

Please enter `transfer <amount> <to>` and transfer Ether to the other party.

```
$ node app.js <YOUR PRIVATE KEY>
>> transfer 10 0xf17f52151EbEF6C7334FAD080c5704D77216b732
```

## 5-4. Check your balance

If your balance is down, you've probably succeeded in transferring the money!

```
$ node app.js <YOUR PRIVATE KEY>
>> getbalance
```

## 5-5. Check recipient balance

You can confirm the success of the transfer by changing the private key to the recipient's and starting the wallet.

```
$ node app.js <RECIPIENT PRIVATE KEY>
>> getbalance
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

async function transfer(client, amount, to) {
  console.log("transfer:", amount, to)
  await client.transfer(amount, DEPOSIT_CONTRACT_ADDRESS, to)
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
      case "transfer":
        await transfer(client, args[0], args[1])
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

Now you can transfer funds in Plasma chain!

In the last chapter, we'll be working on withdrawing some tokens back to the main chain.

Move on to the [6. Exit](Exit) step.
