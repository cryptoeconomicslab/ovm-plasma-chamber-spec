# [framework name] Core Spec

The new framework name is coming soon.

# Introduction

Hello! This document describes Cryptoeconomics Lab's L2 client and framework specification.

### Who should read this document

This document is written about our OVM client core library and spec of OVM contracts. The intended audience of this document are

- Developers who want to integrate our OVM framework to new Layer 1 Blockchain
- Developers who want to contribute to develop our OVM client or support new platforms such as Android or iOS
- Developers who want to contribute to OVM language and Layer 2 smart contract

## Background

### What is OVM?

### Universal Client

### CEL's framework

Since OVM was originally proposed as a concept of shared language for various Layer2 protocols, we have been focusing on implement a concrete system to utilize unique advantages of OVM.
This lead to the advent of [framework name].
[framework name] consists of three main components: OVM contract, OVM client and compiler.

## Contributors

Cryptoeconomics Lab, inc.
OVM was proposed by Plasma Group.

# Core Design

- L1 agnostic design
- Hybrid Layer 2 construction using OVM
- Multi-platform design

Once developers are done writing an application, it will be able to run on various L1 and many platforms.
And also, developers will be required to write less client logic.

**table of contents**

- SDK Spec
- Framework Spec
- L1 Adaptor
- Client Spec
- OVM Spec

## Whole Architecture

## Compatibility

### Serialization

[framework name] uses Ethereum ABI encoding.

### Github repositories of our implementation

[OVM client core library](https://github.com/cryptoeconomicslab/wakkanay): L1 agnostic OVM Client.
[Ethereum Client](https://github.com/cryptoeconomicslab/wakkanay-ethereum): Ethereum specific L2 implementation using Client Core.
[Plasma Aggregator](https://github.com/cryptoeconomicslab/wakkanay-plasma-aggregator): Plasma specific transaction aggregator client.
[Contract](https://github.com/cryptoeconomicslab/ovm-contracts): a group of contracts which support OVM’s claim decision.

# Plasma SDK Spec

### Basic APIs

- getBalance

### Send Transaction API

### Query API

TODO: Query API spec

[The previous version of query API](https://github.com/cryptoeconomicslab/plasma-rust-framework/pull/255#discussion_r329358113)

# L1 Adaptor Spec

The main purpose of implementing L1 Adaptor is to support as many Layer 1 blockchains as possible as a mainchain.
Developer can implement L1 Adaptor following interfaces below.

- Coder
- Wallet
- ContractWrapper
- EventWatcher

## Coder

Coder provides Encoder for specific Layer 1 blockchain. Developer can implement Encoding adapted new blockchain.

L1 adaptor must implements Encoder and Decoder for following primitive types.

- Address
- BigNumber
- Bytes
- Tuple
- Struct
- List

## Wallet

Wallet's responsibility is end-users' private key management. Wallet provides a specific way to manage private keys depending on the connected mainchain.

### Wallet Class

## ContractWrapper and EventWatcher

ContractWrapper and EventWatcher provide concrete interface to access L1 Contract.

### AdjudicatorContract Class

### CommitmentContract Class

### DepositContract Class

### ERC20Contract Class

### OwnershipPayout Class

## Examples

- [ethereum](https://github.com/cryptoeconomicslab/wakkanay-ethereum)
- [tezos](https://github.com/cryptoeconomicslab/wakkanay-tezos)

# Client Spec

Design client spec to fit many platforms such as mobile phone, browser, and microcomputer.
https://hackmd.io/3003WCghTou-oXGBcTmuUg?both

## Plasma Light Client API reference

###  deposit

▸ **deposit**(`amount`: number, `depositContractAddress`: string): *Promise‹void›*

Deposit given amount of token to corresponding deposit contract.
this method calls `approve` method of ERC20 contract and `deposit` method
of Deposit contract.

**Parameters:**

| Name                     | Type   | Description                              |
| ------------------------ | ------ | ---------------------------------------- |
| `amount`                 | number | amount to deposit                        |
| `depositContractAddress` | string | deposit contract address to deposit into |

**Returns:** *Promise‹void›*

___

###  transfer

▸ **transfer**(`amount`: number, `depositContractAddressString`: string, `toAddress`: string): *Promise‹void›*

transfer token to new owner. throw if given invalid inputs.

**Parameters:**

| Name                           | Type   | Description        |
| ------------------------------ | ------ | ------------------ |
| `amount`                       | number | amount to transfer |
| `depositContractAddressString` | string | -                  |
| `toAddress`                    | string | -                  |

**Returns:** *Promise‹void›*

___

###  exit

▸ **exit**(`amount`: number, `depositContractAddress`: string): *Promise‹void›*

Withdrawal process starts from calling this method.
Given amount and depositContractAddress, checks if client has sufficient token amount.
If client has sufficient amount, create exitProperty from stateUpdates this client owns,
calls `claimProperty` method on UniversalAdjudicationContract. Store the property in exitList.
User can call `finalizeExit` to withdraw actual token after the exitProperty is decided to true on-chain.

**Parameters:**

| Name                     | Type   | Description                      |
| ------------------------ | ------ | -------------------------------- |
| `amount`                 | number | amount to exit                   |
| `depositContractAddress` | string | deposit contract address to exit |

**Returns:** *Promise‹void›*

___

###  finalizeExit

▸ **finalizeExit**(`exit`: Exit): *Promise‹void›*

Given exit instance, finalize exit to withdraw token from deposit contract.
Client checks if the exitProperty of the exit instance is decided by calling `isDecided` method
of UniversalAdjudicationContract. If the property claim have not been decided yet, call `decideClaimToTrue`.
If the exitProperty had been decided to true, call `finalizeExit` method of corresponding payout contract.

**Parameters:**

| Name   | Type | Description             |
| ------ | ---- | ----------------------- |
| `exit` | Exit | Exit object to finalize |

**Returns:** *Promise‹void›*

___

###  getBalance

▸ **getBalance**(): *Promise‹Array‹object››*

Get current balance of tokens in plasma.
All ERC20 tokens including Peth registered by `registerCustomToken` method or `registerToken` method are included.

**Returns:** *Promise‹Array‹object››*

___

###  getExitlist

▸ **getExitlist**(): *Promise‹Exit[]›*

Get pending exit list

**Returns:** *Promise‹Exit[]›*

___

###  registerCustomToken

*Defined in [LightClient.ts:421](https://github.com/cryptoeconomicslab/wakkanay/blob/a43f185/packages/plasma-light-client/src/LightClient.ts#L421)*

register ERC20 custom token.
ERC20 contract wrapper is passed directly. This method should be used
when you want to use custom IERC20 contract. PETH contract use this method.

**Parameters:**

| Name              | Type             | Description               |
| ----------------- | ---------------- | ------------------------- |
| `erc20Contract`   | IERC20Contract   | IERC20Contract instance   |
| `depositContract` | IDepositContract | IDepositContract instance |

**Returns:** *void*

___

###  registerToken

▸ **registerToken**(`erc20ContractAddress`: string, `depositContractAddress`: string): *void*

register ERC20 token. use default ERC20 contract wrapper

**Parameters:**

| Name                     | Type   | Description                                               |
| ------------------------ | ------ | --------------------------------------------------------- |
| `erc20ContractAddress`   | string | ERC20 token address to register                           |
| `depositContractAddress` | string | deposit contract address connecting to tokenAddress above |

**Returns:** *void*

___

## Plasma Aggregator API reference

Plasma Aggregator is an actor to collect Layer2 transactions and calculate merkle root, submit it to CommitmentContract. Aggregator has several HTTP API endpoints.

### POST send_tx
This is used to submit transaction to aggregator. Client can send multiple transactions at once.

#### Parameters
| key  | value           | description                               |
| ---- | --------------- | ----------------------------------------- |
| data | `Array<string>` | Array of hex string of Transaction object |


#### Response status code
- STATUS 201: successfully created
- STATUS 422: when invalid transaction or insufficient fund


### GET sync_state
This is used to sync client state with aggregator state. Fetch related stateUpdates from aggregator.

#### Parameters
| key         | value    | description           |
| ----------- | -------- | --------------------- |
| blockNumber | `number` | Block number to fetch |
| address     | `string` | client's address      |


#### Response status code
- 200: returns array of state update hex string
- 400: Invalid address format

### GET block
This is used to fetch plasma block from aggregator.

#### Parameters
| key         | value    | description           |
| ----------- | -------- | --------------------- |
| blockNumber | `number` | Block number to fetch |


#### Response status code
- 200: returns hex string of encoded block
- 404: block not found

### GET inclusion_proof
This is used to fetch inclusion proof of state update.

#### Parameters
| key         | value    | description                                  |
| ----------- | -------- | -------------------------------------------- |
| blockNumber | `number` | Block number the state update is included at |
| stateUpdate | `string` | hex string of encoded state update           |


#### Response status code
- 200: returns hex string of encoded inclusion proof
- 404: inclusion proof not found


# OVM Spec

## Overview

OVM is abstraction of L2 dispute logic.
Dapps developers will only have to write property to define dispute logic to develop a scalable dapp using Layer 2 protocols.
Every property is claimed to the same Contract called Adjudication Contract. Properties are written by predicate logic and it can prove to true or false under dispute logic.
For example, users deposit their assets to Deposit Contract and finally withdraw assets from Deposit Contract. In this scenario, Property stands for the condition which users can withdraw money from Deposit Contract.
later in this document, we will describe how you can implement this kind of contract on the OVM.

### Property

Property stands for dispute logic and we can claim every Properties to Adjudicator Contract. Property has its predicate address and array of input.

e.g.) This claim stands for the preimage of hash doesn't exist.

```
PreimageNotExists(hash) := Not(∃preimage ∈ Bytes(): IsValidPreimage(hash, preimage))
```

In this case, the PreimageNotExists(hash) property is like following structure.

```
{
  predicateAddress: Not.address,
  inputs: [{
    predicateAddress: ThereExists.address,
    inputs: ["preimage", {
      predicateAddress: IsValidPreimage,
      inputs: [hash, "preimage"]
    }]
  }]
}
```

e.g.) Plasma Checkpoint Property stands for history of StateUpdate is valid.

```
Checkpoint(su) := ∀b < B: ∀su ∈ SU(): su().
```

#### Inputs of Property

| Primitive Type | size | description                              |
| -------------- | ---- | ---------------------------------------- |
| Address        | 20   | encoded by L1 specific Coder             |
| Bytes          | 20-  | bytes                                    |
| Integer        | 32   | encoded by L1 specific Coder             |
| Property       |      | Nested property will be encoded by Coder |
| Range          | 64   | encoded by L1 specific Coder             |
| Constant       | 1-19 | "C" + bytes(constant value)              |
| Label          | 1-19 | "L" + bytes                              |
| Variable       | 1-19 | "V" + bytes(variable name)               |

### Decider and Quantifier

We are using quantifier elimination method to make OVM contract implementation simple.
There are 2 rules. So everything is decider in our implementation.

| original proposition    | eliminated                                  |
| ----------------------- | ------------------------------------------- |
| ∀b∈Quantifier(a):Foo(b) | ∀b∈Bytes(a):Not(Quantifier(b, a)) or Foo(b) |
| ∃b∈Quantifier(a):Foo(b) | ∃b∈Bytes(a):Quantifier(b, a) and Foo(b)     |

### Local information

Deciders use local information to make a decision.

# Contract Spec

## Adjudacation Contract

### claimProperty

Claims property and instantiate new challenge game.

### isDecided

Gets the result of whether the claim has been decided or not.

### decideClaimToTrue

Sets the game decision true when its dispute period has already passed.

### decideClaimToFalse

Sets the game decision false when its challenge has been evaluated to true.

### removeChallenge

Removes a challenge when its decision has been evaluated to false.

### setPredicateDecision

This is called by Predicate. It sets a game decision. For example, you know signature of `IsValidSignature(message, address, signature)`, you can set the game decision true which has this claim through `IsValidSignature` predicate.

### challenge

Adds a new challenge game. AC must check the challenge is valid of the parent game.

## Predicate

### Required functions of each Predicate

- isValidChallenge
- decide

isValidChallenge validates valid child node of game tree. I explain game tree.

This is "challenge rule table" defining `challenge` function which applies the challenge table below recursively.
For example, `challenge(¬p) = p`.

#### Valid Challenge

| A             | challengeInput | B                               |
| ------------- | -------------- | ------------------------------- |
| ¬p            | ∅              | B,p                             |
| p0 ∧p1        | i ∈ {0,1}      | B,¬pi \| challenge(pi)          |
| p0 ∨p1        | ∅              | B,¬p0 ∧¬p1                      |
| ∃x ∈ X : p(x) | ∅              | B, ∀x ∈ X : ¬p(x)               |
| ∀x ∈ X : p(x) | t∈X            | B, ¬p(x/t) \| challenge(p(x/t)) |

If we have `∀x ∈ X : ∀y ∈ Y : p(x, y)`, challenge is `¬p(x/s,y/t)`.
"|" means if left isn't atomic.

#### Immediately decide table

| original      | witness | condition                     |
| ------------- | ------- | ----------------------------- |
| P_0 ∨ P_1     | i       | `decide(p_i)`                 |
| ¬¬P           | ∅       | `decide(P)`                   |
| ∃x ∈ X : p(x) | t∈X     | `decide(p(x/t))`              |
| P_0 ∧ P_1     | ∅       | `decide(P_0) and decide(P_1)` |

### Deposit Contract example

An example of Plasma deposit contract.
Deposit contract provides checkpoint property.

```
deposit(amount: uint256, initialStateObject: Property) {
  Range range = calculateNextRange(amount);
  stateUpdate = StateUpdate(range, initialStateObject)
  Property checkpointProperty = checkpoint(range, block_number, stateUpdate)
  storeProperty(checkpointProperty)
}
```

You can see description [here](https://github.com/cryptoeconomicslab/ovm-contracts/blob/master/contracts/DepositContract.sol#L55).

### Commitment Contract

Commitment contract provides StateUpdate property.

```
verify_inclusion(state_update): bool {
  return MerkleTree[state_update.block_number].checkMembership(state_update)
}
```

(TODO: write description)

## Plasma Predicate

We can construct Plasma Predicate from atomic predicates.

Plasma predicate can be instantiate as StateObject. StateObject is Property and its inputs differs by each Plasma Predicate.

e.g.) OwnershipPredicate has only owner address in 0 index of inputs.

#### StateUpdate

```
struct StateUpdate {
  blockNumber: Integer,
  tokenAddress: Address,
  range: Range,
  stateObject: Property
}

Property({
  address: StateUpdate.address,
  inputs: [depositContractAddress, range, blockNumber, stateObject]
})
```

### Ownership Predicate

```
Ownership(owner, tx) := ∃sig ∈ Bytes(), IsValidSignature(tx, owner, sig).
```

#### Required functions of predicate

- isValidChallenge
- decide
- finalizeExit

(TODO: write description about finalizeExit of Plasma Predicate)

### Payout Contract

# Domain Specific Language

Predicate Logic

```
Ownership(owner, tx) := ∃sig ∈ Bytes(), IsValidSignature(tx, owner, sig).
```

DSL

```
def ownership(owner, tx) := SignedBy(tx, owner)
```

### Compiling Property

We can compile big property to small single property, and also we can build library for complex property such as atomic swap.

#### Why compile?

To avoid big property, we need a wrapped decider synthesized by multiple deciders.
However, developers don't want to write specific decider by Solidity in manually because it takes much time and can cause trivial bug.
OVM compiler, hence, should compile complex decider which is composed from multiple deciders to one decider.

#### How compile

https://hackmd.io/@syuhei/rySwGUOvS

#### Custome generator

If you want to support a new Layer1 protocol, you can develop specific generators following [generator interface](https://github.com/cryptoeconomicslab/ovm-compiler/blob/master/packages/generator/src/CodeGenerator.ts) and [abstract syntax tree](https://github.com/cryptoeconomicslab/ovm-compiler/blob/master/packages/transpiler/src/CompiledPredicate.ts) of DSL.
We can demonstrate two examples of the generator in https://github.com/cryptoeconomicslab/ovm-compiler/tree/master/packages, Solidity-generator and Ethereum-generator, which generates EVM bytecode.

## Reference

### Atomic Predicates

- Equal(a, b)
- IsLessThan(num, upperBound)
- IsValidSignature(message, signature, publicKey, verifierKey)
- IsValidHash(hash, preimage)
- IsContained(sub: Range, range: Range)
- VerifyInclusion(leaf, token, range, root, inclusion_proof)
- IsSameAmount(amount, range)
- VerifyConcat(bytes, a, b)
- VerifyRoot(root, address, block_number)

### Library

- SignedBy(message, publicKey, verifierKey)
- IncludedAt(leaf, token, range, root)

### Quantifier

- LessThan(upperBound)
- Root(address, block_number)
- Concat(a, b)
- Hash(preimage)
- Range(start, end)
- SU(block_number, token, range?)
- Tx(token, range, block_number)

# Challenges

- L2 fee mechanism
- In the case of that clients discard and update local information(O.Rollup)
- circular reference property
