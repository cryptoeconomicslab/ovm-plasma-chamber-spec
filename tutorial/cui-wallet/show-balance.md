# 4. Show balance

In this chapter, we will implement the methods to check the balance of Layer1 and Layer2.

Let's check to see if the deposit we just made was successful!

## 4-1. Implement to get your l2 balance

Just call the `getBalance` function of the plasma light client to easily check your balance.

[Plasma Light Client API reference | getBalance](/API/plasma-light-client.md#getbalance)

```javascript
async function getBalance(client) {
  const balance = await client.getBalance();
  console.log(`${client.address}:`, balance);
}
```

## 4-2. Implement to get your l1 balance

In order to make sure that your Layer1 balance has been properly reduced after the deposit, you should also prepare a method to obtain the Layer1 balance.

```javascript
async function getL1Balance(client) {
  const balance = await client.wallet.getL1Balance();
  console.log(`${client.address}:`, balance.value.raw, balance.symbol);
}
```

## 4-3. Add getBalance functions to the CUI

To call the `getBalance` function in the CUI Wallet, add some processing to the ReadLine.

```javascript
function cuiWalletReadLine(client) {
  rl.question(">> ", async (input) => {
    const args = input.split(/\s+/);
    const command = args.shift();
    switch (command) {
      case "getbalance":
        await getBalance(client);
        cuiWalletReadLine(client);
        break;
      case "getl1balance":
        await getL1Balance(client);
        cuiWalletReadLine(client);
        break;
      default:
        console.log(`${command} is not found`);
        cuiWalletReadLine(client);
    }
  });
}
```

## 4-4. Check your l2 balance

Launch the CUI Wallet and check your balance of Layer2!

Start the app with the node command and try typing `getbalance`.

```
$ node app.js
>> getbalance
```

## 4-5. Check your l1 balance

Also, check to see if your balance in Layer1 is decreasing.

Try typing `getl1balance`.

```
$ node app.js
>> getl1balance
```

## Current source code

<details>
<summary>Click here</summary>

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

</details>

## Go to the next step!

Now that you've checked your balance and confirmed that the token has been properly deposited to Plasma, right?

In the next chapter, we'll be transferring tokens on Plasma!

Move on to the [5. Transfer](/tutorial/transfer.md) step.
