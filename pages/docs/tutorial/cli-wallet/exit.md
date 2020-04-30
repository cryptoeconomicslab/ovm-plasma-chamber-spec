---
id: Exit
title: 6. Exit
sidebar_label: Exit
---

In this chapter, we will implement exit functionality to withdraw your tokens from Plasma.

By submitting your correct transaction history, you can withdraw your tokens that are locked in DepositContract on the main chain.

## 6-1. Implement exit

You can call the `exit` function from the plasma light client.

This allows users to claim how much they have withdrawn and with their transaction history.

[Plasma Light Client API reference | exit](/docs/api/Plasma_Light_Client#exit)

```javascript
async function exit(client, amount) {
  console.log("exit:", DEPOSIT_CONTRACT_ADDRESS, amount)
  await client.exit(amount, DEPOSIT_CONTRACT_ADDRESS)
  await getExitList(client)
}
```

## 6-2. Implement getExitList

You can call the `getExitList` function from the plasma light client.

You can get a list of the exits that the user is currently claiming.

[Plasma Light Client API reference | getExitlist](/docs/api/Plasma_Light_Client#getexitlist)

```javascript
async function getExitList(client) {
  const exitList = await client.getExitList()
  console.log("exit list:", exitList)
  return exitList
}
```

## 6-3. Implement finalizeExit

You can call the `finalizeExit` function from the plasma light client.

By specifying the index of exit object from the exitList, you can withdraw the excitable tokens to the main chain.

At this time, the exit must have passed the challenge period.

[Plasma Light Client API reference | finalizeExit](/docs/api/Plasma_Light_Client#finalizeexit)

```javascript
async function finalizeExit(client, index) {
  const exitList = await getExitList(client)
  if (exitList[index]) {
    await client.finalizeExit(exitList[index])
  }
}
```

## 6-4. Add exit functions to the CLI

To call the `exit`, `getExitList` and `finalizeExit` functions in the CLI Wallet, add some processing to the ReadLine.

```javascript
function cliWalletReadLine(client) {
  rl.question(">> ", async input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "getexitlist":
        await getExitList(client)
        cliWalletReadLine(client)
        break
      case "exit":
        await exit(client, args[0])
        cliWalletReadLine(client)
        break
      case "finalizeexit":
        await finalizeExit(client, args[0])
        cliWalletReadLine(client)
        break
      default:
        console.log(`${command} is not found`)
        cliWalletReadLine(client)
    }
  })
}
```

## 6-5. Exit ether

Launch the CLI Wallet and start the exit process!

Start the app with node command and try `exit <amount>`.

```
$ node app.js
>> exit 10
```

## 6-6. Check your exit list

Let's take a look at exitList to see if the exit has been claimed correctly.

Try `getexitlist`.

```
>> getexitlist
```

## 6-7. Withdraw your Ether from Plasma

Specify the index number of the Exit you want to finalize and pull the token from Plasma!

Try `finalizeexit <index>`.

```
>> finalizeexit 0
```

## 6-8. Check your balance

Let's look at the balance using the `getBalance` and `getl1balance` functions we just created to see if we've successfully withdrawn the token!

If the balance has changed correctly, the exit is complete.

```bash
# check l1 balance
>> getl1balance
# check l2 balance
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

// TODO: enter your private key
const PRIVATE_KEY = "ENTER YOUR PRIVATE KEY"
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
  console.log("transfer:", to, amount)
  await client.transfer(amount, DEPOSIT_CONTRACT_ADDRESS, to)
}

async function exit(client, amount) {
  console.log("exit:", DEPOSIT_CONTRACT_ADDRESS, amount)
  await client.exit(amount, DEPOSIT_CONTRACT_ADDRESS)
  await getExitList(client)
}

async function getExitList(client) {
  const exitList = await client.getExitList()
  console.log("exit list:", exitList)
  return exitList
}

async function finalizeExit(client, index) {
  const exitList = await getExitList(client)
  if (exitList[index]) {
    await client.finalizeExit(exitList[index])
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
      case "getexitlist":
        await getExitList(client)
        cliWalletReadLine(client)
        break
      case "exit":
        await exit(client, args[0])
        cliWalletReadLine(client)
        break
      case "finalizeexit":
        await finalizeExit(client, args[0])
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
Now we've developed a CLI Plasma Wallet with basic functions from deposit to exit!

Once again, this tutorial and the framework is not production-ready yet. Please refrain from using it on the main net until we announce the alpha version and it is ready for production use.

We really appreciate your interest in Gazelle from the early stage and look forward to seeing your next project built with Gazelle.

Please let us know on [Telegram](https://t.me/cryptoeocnomicslab) if you have any questions.

Thank you so much for giving it a try.
