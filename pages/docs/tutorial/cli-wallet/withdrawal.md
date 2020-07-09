---
id: Withdrawal
title: 6. Withdrawal
sidebar_label: Withdrawal
description: Gazelle's step-by-step guide for you to build a client wallet to make deposits, transfers, and withdrawals of Ether and ERC20 tokens to/from Plasma chains.
---

In this chapter, we will implement withdrawal functionality to withdraw your tokens from Plasma.

By submitting your correct transaction history, you can withdraw your tokens that are locked in DepositContract on the main chain.

## 6-1. Implement startWithdrawal

You can call the `startWithdrawal` function from the plasma light client.

This allows users to claim how much they have withdrawn and with their transaction history.

[Plasma Light Client API reference | startWithdrawal](/docs/api/Plasma_Light_Client#startwithdrawal)

```javascript
async function startWithdrawal(client, amount) {
  console.log("startWithdrawal:", TOKEN_CONTRACT_ADDRESS, amount)
  await client.startWithdrawal(amount, TOKEN_CONTRACT_ADDRESS)
  await showExitList(client)
}
```

## 6-2. Implement getPendingWithdrawals

You can call the `getPendingWithdrawals` function from the plasma light client.

You can get a list of the exits that the user is currently claiming.

[Plasma Light Client API reference | getPendingWithdrawals](/docs/api/Plasma_Light_Client#getpendingwithdrawals)

```javascript
async function getPendingWithdrawals(client) {
  const exitList = await client.getPendingWithdrawals()
  console.log("exit list:", exitList)
}
```

## 6-3. Implement completeWithdrawal

You can call the `completeWithdrawal` function from the plasma light client.

By specifying the index of exit object from the exitList, you can withdraw the excitable tokens to the main chain.

At this time, the exit must have passed the challenge period.

[Plasma Light Client API reference | completeWithdrawal](/docs/api/Plasma_Light_Client#completewithdrawal)

```javascript
async function completeWithdrawal(client, index) {
  const exitList = await getPendingWithdrawals(client)
  if (exitList[index]) {
    await client.completeWithdrawal(exitList[index])
  }
}
```

## 6-4. Add withdrawal functions to the CLI

To call the `startWithdrawal`, `getPendingWithdrawals` and `completeWithdrawal` functions in the CLI Wallet, add some processing to the ReadLine.

```javascript
function cliWalletReadLine(client) {
  rl.question(">> ", async input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "getpendingwithdrawals":
        await getPendingWithdrawals(client)
        cliWalletReadLine(client)
        break
      case "startwithdrawal":
        await startWithdrawal(client, args[0])
        cliWalletReadLine(client)
        break
      case "completewithdrawal":
        await completeWithdrawal(client, args[0])
        cliWalletReadLine(client)
        break
      default:
        console.log(`${command} is not found`)
        cliWalletReadLine(client)
    }
  })
}
```

## 6-5. Withdrawal Ether

Launch the CLI Wallet and start the withdrawal process!

Start the app with node command and try `startwithdrawal <amount>`.

```
$ node app.js <YOUR PRIVATE KEY>
>> startwithdrawal 10
```

## 6-6. Check your exit list

Let's take a look at exitList to see if the exit has been claimed correctly.

Try `getpendingwithdrawals`.

```
>> getpendingwithdrawals
```

## 6-7. Withdraw your Ether from Plasma

Specify the index number of the exit you want to finalize and pull the token from Plasma!

Try `completewithdrawal <index>`.

```
>> completewithdrawal 0
```

## 6-8. Check your balance

Let's look at the balance using the `getBalance` and `getl1balance` functions we just created to see if we've successfully withdrawn the token!

If the balance has changed correctly, the withdrawal is complete.

```bash
# check L1 balance
>> getl1balance
# check L2 balance
>> getbalance
```

## Final source code

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
const TOKEN_CONTRACT_ADDRESS = config.PlasmaETH
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
  await client.deposit(amount, TOKEN_CONTRACT_ADDRESS)
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
  console.log("transfer:", to, amount)
  await client.transfer(amount, TOKEN_CONTRACT_ADDRESS, to)
}

async function startWithdrawal(client, amount) {
  console.log("startWithdrawal:", TOKEN_CONTRACT_ADDRESS, amount)
  await client.startWithdrawal(amount, TOKEN_CONTRACT_ADDRESS)
  await showExitList(client)
}

async function getPendingWithdrawals(client) {
  const exitList = await client.getPendingWithdrawals()
  console.log("exit list:", exitList)
}

async function completeWithdrawal(client, index) {
  const exitList = await getPendingWithdrawals(client)
  if (exitList[index]) {
    await client.completeWithdrawal(exitList[index])
  }
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
      case "getpendingwithdrawals":
        await getPendingWithdrawals(client)
        cliWalletReadLine(client)
        break
      case "startwithdrawal":
        await startWithdrawal(client, args[0])
        cliWalletReadLine(client)
        break
      case "completewithdrawal":
        await completeWithdrawal(client, args[0])
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

## Tutorial Gazelle CLI Wallet - The End

Congratulations!
Now we've developed a CLI Plasma Wallet with basic functions from deposit to withdrawal!

Once again, this tutorial and the framework is not production-ready yet. Please refrain from using it on the main net until we announce the alpha version and it is ready for production use.

We really appreciate your interest in Gazelle from the early stage and look forward to seeing your next project built with Gazelle.

Please let us know on [Telegram](https://t.me/cryptoeocnomicslab) if you have any questions.

Thank you so much for giving it a try.
