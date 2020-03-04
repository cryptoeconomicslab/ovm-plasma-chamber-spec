# Try Plasma Chamber in local

## Development

### 1. Install

```
npm i @cryptoeconomicslab/plasma-light-client
```

### 2. Instantiate

```typescript
import LightClient from "@cryptoeconomicslab/plasma-light-client";

return new LightClient(
  wallet,
  kvs,
  adjudicationContract,
  depositContractFactory,
  tokenContractFactory,
  commitmentContract,
  ownershipPayoutContract,
  stateManager,
  syncManager,
  checkpointManager,
  config
);
```

### 3. Deposit to Plasma

```typescript
await liteClient.deposit(10, TOKEN_ADDRESS);
```

## Test run

## 1. Get test aggregator

Get [plasma-aggregator](https://github.com/cryptoeconomicslab/wakkanay-plasma-aggregator).

```
git clone git@github.com:cryptoeconomicslab/wakkanay-plasma-aggregator.git
npm i
```

```
docker-compose up
```

## 2. Run your client

```
npm start
```
