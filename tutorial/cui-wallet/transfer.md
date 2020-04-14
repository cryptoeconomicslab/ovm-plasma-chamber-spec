# 5. Transfer

In this chapter, we'll be implementing remittances on Plasma.

## 5-1. Implement transfer

You can call the `transfer` method from the plasma light client.

You can easily send the tokens on Plasma by simply passing the amount you want to send, DepositContractAddress and the recipient as arguments!

[Plasma Light Client API reference | transfer](/API/plasma-light-client.md#transfer)

```javascript
async function transfer(client, amount, to) {
  console.log("transfer:", to, amount);
  await client.transfer(amount, DEPOSIT_CONTRACT_ADDRESS, to);
}
```

## 5-2. Add transfer function to the CUI

To call the `transfer` function in the CUI Wallet, add some processing to the ReadLine.

```javascript
function cuiWalletReadLine(client) {
  rl.question(">> ", async (input) => {
    const args = input.split(/\s+/);
    const command = args.shift();
    switch (command) {
      case "transfer":
        await transfer(client, args[0], args[1]);
        cuiWalletReadLine(client);
        break;
      default:
        console.log(`${command} is not found`);
        cuiWalletReadLine(client);
    }
  });
}
```

## 5-3. Transfer ether

Now, let's launch the CUI Wallet and actually make the transfer!

Please enter `transfer <amount> <to>` and transfer ether to the other party.

```
$ node app.js
>> transfer 10 0xf17f52151EbEF6C7334FAD080c5704D77216b732
```

## 5-4. Check your balance

If your balance is down, you've probably succeeded in transferring the money!

\* If you can, launch another Wallet at the destination address and check the balance. That's more certain.

```
$ node app.js
>> getbalance
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

async function transfer(client, amount, to) {
  console.log("transfer:", to, amount);
  await client.transfer(amount, DEPOSIT_CONTRACT_ADDRESS, to);
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

Now you can transfer the token on Plasma!

In the last chapter, we'll be working on withdrawing tokens to Layer1.

Move on to the [6. Exit](/tutorial/exit.md) step.
