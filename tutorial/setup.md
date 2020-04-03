# Setup

## 1. Aggregator

### Run local aggregator

Get [plasma-aggregator](https://github.com/cryptoeconomicslab/wakkanay-plasma-aggregator).

```bash
$ git clone https://github.com/cryptoeconomicslab/wakkanay-plasma-aggregator.git
$ cd wakkanay-plasma-aggregator
$ cp -p .sample.env .env
$ npm run docker:build
$ npm run docker:start
```

Contracts config file `config.local.json` is generated at the root directory after `npm run docker:build` if absent.

## 2. Application

### Install

To create Plasma CUI Wallet, we first need to install Plasma libraries from npm.
Also, copy `config.local.json` file to your application repository root.

```bash
$ mkdir plasma-wallet
$ cd plasma-wallet
$ npm init
$ npm i ethers
$ npm i @cryptoeconomicslab/eth-plasma-light-client @cryptoeconomicslab/primitives @cryptoeconomicslab/level-kvs
$ cp -p <your wakkanay-plasma-aggregator path>/config.local.json ./config.local.json
```

## Go to the next step!

You have set up your project successfully.

Please go to the [Start Client](/tutorial/start-client.md) step.
