# 6. Exit

In this chapter, we will implement exit to withdraw ether from Plasma.

## 6-1. Implement exit

You can call the `exit`, `getExitList` and `finalizeExit` method from plasma light client.

[Plasma Light Client API reference | exit](/API/plasma-light-client.md#exit)

[Plasma Light Client API reference | getExitlist](/API/plasma-light-client.md#getexitlist)

[Plasma Light Client API reference | finalizeExit](/API/plasma-light-client.md#finalizeexit)

```javascript
async function exit(client, amount) {
  console.log("exit:", DEPOSIT_CONTRACT_ADDRESS, amount);
  await client.exit(amount, DEPOSIT_CONTRACT_ADDRESS);
  await showExitList(client);
}

async function showExitList(client) {
  const exitList = await client.getExitList();
  console.log("exit list:", exitList);
}

async function finalizeExit(client, index) {
  const exitList = await getExitList(client);
  if (exitList[index]) {
    await client.finalizeExit(exitList[index]);
  }
}

function cuiWalletReadLine(client) {
  rl.question(">> ", async (input) => {
    const args = input.split(/\s+/);
    const command = args.shift();
    switch (command) {
      case "showexitlist":
        await showExitList(client);
        cuiWalletReadLine(client);
        break;
      case "exit":
        await exit(client, args[0]);
        cuiWalletReadLine(client);
        break;
      case "finalizeexit":
        await finalizeExit(client, args[0]);
        cuiWalletReadLine(client);
        break;
      default:
        console.log(`${command} is not found`);
        cuiWalletReadLine(client);
    }
  });
}
```

## 6-2. Exit ether

Please enter `exit <amount>` and exit ether from Plasma.

```
$ node app.js
>> exit 10
```

## 6-3. Check your exit list

Please enter `showexitlist` and show your pending exit list.

```
$ node app.js
>> showexitlist
```

## 6-4. Withdraw your ether from Plasma

Please enter `finalizeexit [index]` and withdraw your ether from Plasma.

```
$ node app.js
>> finalizeexit 0
```

## 6-5. Check your balance

```bash
$ node app.js
# check l1 balance
>> getl1balance
# check l2 balance
>> getbalance
```

## This is the source code right now

```javascript
const readline = require("readline");
const ethers = require("ethers");
const { Bytes } = require("@cryptoeconomicslab/primitives");
const { LevelKeyValueStore } = require("@cryptoeconomicslab/level-kvs");
const initializeLightClient = require("@cryptoeconomicslab/eth-plasma-light-client")
  .default;

// TODO: enter your private key
const PRIVATE_KEY = "ENTER YOUR PRIVATE KEY";
const config = require("./config.local.json");
const DEPOSIT_CONTRACT_ADDRESS = config.payoutContracts.DepositContract;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function deposit(client, amount) {
  console.log("deposit:", amount);
  await client.deposit(amount, DEPOSIT_CONTRACT_ADDRESS);
}

async function getBalance(client) {
  const balance = await client.getBalance();
  console.log(`${client.address}:`, balance);
}

async function getL1Balance(client) {
  const balance = await client.wallet.getL1Balance();
  console.log(`${client.address}:`, balance.value.raw, balance.symbol);
}

async function transfer(client, amount, to) {
  console.log("transfer:", to, amount);
  await client.transfer(amount, DEPOSIT_CONTRACT_ADDRESS, to);
}

async function exit(client, amount) {
  console.log("exit:", DEPOSIT_CONTRACT_ADDRESS, amount);
  await client.exit(amount, DEPOSIT_CONTRACT_ADDRESS);
  await showExitList(client);
}

async function showExitList(client) {
  const exitList = await client.getExitList();
  console.log("exit list:", exitList);
}

async function finalizeExit(client, index) {
  const exitList = await getExitList(client);
  if (exitList[index]) {
    await client.finalizeExit(exitList[index]);
  }
}

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
    aggregatorEndpoint: "http://127.0.0.1:3000",
  });
  await lightClient.start();
  return lightClient;
}

function cuiWalletReadLine(client) {
  rl.question(">> ", async (input) => {
    const args = input.split(/\s+/);
    const command = args.shift();
    switch (command) {
      case "deposit":
        await deposit(client, args[0]);
        cuiWalletReadLine(client);
        break;
      case "getbalance":
        await getBalance(client);
        cuiWalletReadLine(client);
        break;
      case "getl1balance":
        await getL1Balance(client);
        cuiWalletReadLine(client);
        break;
      case "transfer":
        await transfer(client, args[0], args[1]);
        cuiWalletReadLine(client);
        break;
      case "showexitlist":
        await showExitList(client);
        cuiWalletReadLine(client);
        break;
      case "exit":
        await exit(client, args[0]);
        cuiWalletReadLine(client);
        break;
      case "finalizeexit":
        await finalizeExit(client, args[0]);
        cuiWalletReadLine(client);
        break;
      case "quit":
        console.log("Bye.");
        rl.close();
        process.exit();
      default:
        console.log(`${command} is not found`);
        cuiWalletReadLine(client);
    }
  });
}

async function main() {
  const client = await startLightClient();
  cuiWalletReadLine(client);
}

main();
```

## Tutorial [framework name] CUI Wallet - The End

This tutorial is very simple implementation. This wallet is not near production quality we need a lot more work to make it ready for the Mainnet usage.

By the way, we really appriciate your interest in [framework name].
Looking forward to seeing your next project running on [framework name].

Please let us know on [Telegram](https://t.me/cryptoeocnomicslab) if you have any questions.