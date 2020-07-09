---
id: Setup
title: 1. Setup
sidebar_label: Setup
description: Gazelle's step-by-step guide for you to build a client wallet to make deposits, transfers, and withdrawals of Ether and ERC20 tokens to/from Plasma chains.
---

Now, let's develop the Plasma Wallet!

In this chapter, we will start the transaction aggregator required to run Plasma and install the Library required for the Wallet Application.

## 1-1. Transaction Aggregator

### Run local aggregator

Get the aggregator from [here](https://github.com/cryptoeconomicslab/gazelle/releases/tag/v0.4.1).

And then, start it with Docker.

```bash
$ git clone -b v0.4.1 https://github.com/cryptoeconomicslab/gazelle.git
$ cd gazelle
$ npm run docker:build
$ npm run docker:cp
$ npm run docker:start
```

Contracts config file `config.local.json` is generated at the root directory after `npm run docker:build` f you have not installed them yet.

## 1-2. Application

### Install

Install the following libraries using npm to enable fund transfers in Plasma.

Copy `config.local.json` file to your application repository root.

```bash
$ mkdir plasma-wallet
$ cd plasma-wallet
$ npm init
$ npm i ethers
$ npm i leveldown
$ npm i @cryptoeconomicslab/eth-plasma-light-client@0.4.1 @cryptoeconomicslab/primitives @cryptoeconomicslab/level-kvs
$ cp -p <your gazelle path>/integration-test/aggregator/src/config.local.json ./config.local.json
```

### Prepare the ReadLine for CLI application

This is the initial settings of ReadLine, which is required to implement an interactive CLI Wallet.

```javascript
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function cliWalletReadLine() {
  rl.question(">> ", input => {
    const args = input.split(/\s+/)
    const command = args.shift()
    switch (command) {
      case "quit":
        console.log("Bye.")
        rl.close()
        process.startWithdrawal()
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

## Go to the next step!

The setup is now complete.

Move on to the [2. Start client](Start_Client) step.
