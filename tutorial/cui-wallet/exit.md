# 6. Exit

In this chapter, we will implement exit to withdraw your tokens from Plasma.

By submitting your correct transaction history, you can withdraw your tokens that are locked in DepositContract on Layer1.

## 6-1. Implement exit

You can call the `exit` function from the plasma light client.

This allows users to claim how much they have withdrawn and with their transaction history.

[Plasma Light Client API reference | exit](/API/plasma-light-client.md#exit)

```javascript
async function exit(client, amount) {
  console.log("exit:", DEPOSIT_CONTRACT_ADDRESS, amount);
  await client.exit(amount, DEPOSIT_CONTRACT_ADDRESS);
  await showExitList(client);
}
```

## 6-2. Implement getExitList

You can call the `getExitList` function from the plasma light client.

You can get a list of the exits that the user is currently claiming.

[Plasma Light Client API reference | getExitlist](/API/plasma-light-client.md#getexitlist)

```javascript
async function getExitList(client) {
  const exitList = await client.getExitList();
  console.log("exit list:", exitList);
}
```

## 6-3. Implement finalizeExit

You can call the `finalizeExit` function from the plasma light client.

By specifying the index of the exit that you want to withdraw from the exit list, you can withdraw the tokens to Layer1.

At this time, the exit must have passed the challenge period.

[Plasma Light Client API reference | finalizeExit](/API/plasma-light-client.md#finalizeexit)

```javascript
async function finalizeExit(client, index) {
  const exitList = await getExitList(client);
  if (exitList[index]) {
    await client.finalizeExit(exitList[index]);
  }
}
```

## 6-4. Add exit functions to the CUI

To call the `exit`, `getExitList` and `finalizeExit` functions in the CUI Wallet, add some processing to the ReadLine.

```javascript
function cuiWalletReadLine(client) {
  rl.question(">> ", async (input) => {
    const args = input.split(/\s+/);
    const command = args.shift();
    switch (command) {
      case "getexitlist":
        await getExitList(client);
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

## 6-5. Exit ether

Launch the CUI Wallet and start the exit process!

Start the app with node command and try typing `exit <amount>`.

```
$ node app.js
>> exit 10
```

## 6-6. Check your exit list

Let's show the Exit List to see if the Exit has been claimed correctly.

Try typing `getexitlist`.

```
>> getexitlist
```

## 6-7. Withdraw your ether from Plasma

Specify the index number of the Exit you want to finalize and pull the token from Plasma!

Try typing `finalizeexit <index>`.

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

async function getExitList(client) {
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
      case "getexitlist":
        await getExitList(client);
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

</details>

## Tutorial [framework name] CUI Wallet - The End

Congratulations!
Now we've developed a CUI Plasma Wallet with basic functions from deposit to exit!

Once again, this tutorial is very simple implementation. This wallet is not near production quality. We need a lot more work to make it ready for the Mainnet usage.

By the way, we really appriciate your interest in [framework name].
Looking forward to seeing your next project running on [framework name].

Please let us know on [Telegram](https://t.me/cryptoeocnomicslab) if you have any questions.

Thank you so much for giving it a try.
