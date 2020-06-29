---
id: protocol-and-framework-spec
title: Protocol and Framework Spec
sidebar_label: Protocol and Framework Spec
---

## Introduction

Welcome to the documentation for Gazelle, an open-source Dapps development framework. This documentation consists of two parts.

1. **Blockchain with fraud-proof scaling solutions in big picture**: documentation[link of the page] that describes how public blockchains securely scale with fraud-proof technology in general. This page is for those that want to start with gaining a big picture of Gazelle's underlying scaling technology.
2. **Gazelle documentation**: documentation[link of the page] that describes how Gazelle works and specifications for its main components. This is mainly for the developers who are contributing to Gazelle's open-source development.

   Specific motivation is to provide inforamtion with

   - Developers who can contribute to integration of Gazelle into new blockchains.
   - Developers who can contribute to Gazelle's client development and new platform suppot such as Android and iOS.
   - Developers who can contribute to development of predicate DSL and Gazelle smart contracts.

## Blockchain with fraud-proof scaling solutions in big picture

### Basic Terminologies

- **Merkle tree**: a data structure that allows efficient and secure verification of large data, only requiring $log(n)$ of computation where n is the number of leaf nodes in the tree. It is important to highlight that in Plasma, Merkle tree's every leaf node is labled with **a hash of off-chain transactions** offloaded from the mainchain.
- **Merkle inclusion proof**: **a list of hash**, which proves that a particular off-chain transaction was actually included in a Merkle tree. Aggregator gives a Merkle inclusion proof to L2 clients. L2 clients use **Merkle inclusion proof and corresponding Merkle root** to check whether a transaction has actually been included or not. Data size of Merkle inclusion proof and the computation to check the inclusion are both $log(n)$ where n is the number of leaf nodes in the tree.
- **Interactive dispute game**: a game played between a claim prover and its opponent. The game is judged by a smart conract using the on-chain data and proofs submitted by Plasma clients.
- **Dispute period**: period that the dispute game is played. Users have to wait this period to withdraw their assets.

### Scaling solutions powered by fraud-proof scheme

### Plasma 　

Plasma is a blockchain scaling design which significantly reduces the gas cost per transaction.
Using Plasma, transactions are not directly submitted to the mainchain, but to a **transaction aggregator**, also known as an **operator**, who later submits them hashed into 32 bytes data. Aggregator computes the root hash of a Merkle tree in which every leaf node is labeled with a hash of state from off-loaded transactions and commits the root hash to the mainchain.

![](https://i.imgur.com/bAqdgPc.png)
Transaction aggregator recieves all the off-chain transactions off-loaded from the mainchain and generates a Merkle tree, putting all the transactions' hash in the Merkle tree leaves.

With transaction aggregator submitting a Merkle root to the mainchain at a regular time interval, **users can protect their assets using their local information** such as signed transactions and Merkle inclusion proofs.

#### Designs that give Plasma self-custody

##### Design that invalidates fraudulent exits to the mainchain

When a malicious party tries to withdraw someone else's assets to the mainchain, users have to **challenge the fraudulent exit** such as exits of already spent coin and coins that has invalid transaction history to protect their assets. By challenging, honest users prevent its exit. Honest users have to be online at an application built with Plasma at least once a dispute period to detect malicious actions and prevent their assets from being stolen.

##### Design that invalidates fraudulent off-chain transactions in Plasma

Plasma clients automatically detect fraudulent transaction with invalid transaction history and reject the state transition when receiving assets off-chain.

#### Design that reduces client verification costs

##### Range assigned to your offchain assets

When users deposit their assets into a Plasma chain, deposit contract assigns a specific **range** that represents the amount of assets. For example, if you deposit 3 ETH, range defined by `start` value and `end` value, say 1 and 4, are assigned to the deposited 3 ETH. Then, your ownership will be tied to any slot (one slot represents 1 ETH in this case, but it should actually be much smaller in real implementations) within 1 to 4. When users make a transfer of any amount assets less than or equal to 3 ETH, new ownership will be assigned to the range that represents the amount transfered. With this idea of defragmentation of the deposited assets, separated ranges with one owner can be reordered adjancent and “merged” into a single larger range, when users transfer the assets to different owner.
This system significantly reduces the amount of data each Plasma client must store for the state verification, since users only have to track the ranges that they own.

##### Light Clients powered by Merkle Interval Tree

[Chart to describe Merkle Interval Tree]
For the transaction aggregation, Gazelle utilizes **Merkle Interval Tree**, a binary tree that has special leaf node labelling to reduce clients' verification costs. Here are Merkle Interval Tree's special rules for labelling its leaf nodes.

1. Merkle Interval Tree's leaf nodes are labeled with **a state made by an off-chain transaction and the range that is transacted**. The range is specified by `start` and `end`value.
2. Merkle Interval Tree does not include any two different transactions which refrence an **overlapped range**.
   By defining unique ranges that is used in the off-chain transactions, Plasma Clients only have to track the transactions that are related to themselves. This is the advent of Layer2 **LightClient**, which carries some of the transaction they would need in comparison to full nodes carrying all the transaction history.

### OGS

#### What is OGS?

Optimistic Game Semantics is an abstraction scheme for fraud-proof scaling solution's dispute games. OGS supports every Layer2 fraud-proof solution in design. Using OGS, you can define the validity of a state and its transition by writing a claim in the form of predicate logic proposition. Propositions are sent to the on-chain **Predicate Evaluation Contract** when users want to exit their assets or create checkpoint of the state. PEC evaluates propositions to true or false after exchanging arguments written in OGS, in other words, playing an **interactive dispute game**.

#### Plasma in OGS

For example, let's say a proposition claims that you have an asset X in Plasma. Then, Predicate Evaluation Contract will check whether or not you actually have the asset X based on the submitted evidence such as signature, transactions, or Merkle inclusion proof. **The greatness of OGS is that it enables both smart contracts and client devicese to evaluate a claim following the same rule.** As the name says, OGS is **a new shared language that defines the sematics of the dispute games for fraud-proof**. Therefore, now it is possible to express many parts of the Plasma system, such as check points, exits, ownership states, and atomic swaps, using OGS propositions. That makes the development a lot simpler and brings a composability to Gazelle applications.

## Gazelle Documentation

### Gazelle in a nutshell

![](https://i.imgur.com/dl7Irwd.png)

### Features of Gazelle

#### L1 agnostic design

Using Gazelle, you can build application on top of a variety of blockchain. Gazelle currently supports Ethereum and Tezos.

#### Composability of multiple off-chain solutions

If you are an application developer, you probably understand that the composability of applications plays a huge role in the development. As above section about OGS explained, Gazelle made it possible to build scalable blockchain applications using multiple off-chain scaling solutions, such as Plasma, State channels, and Optimistic Rollup, employing OGS. This feature makes your blockchain application more general and flexibility.

### Main Components of Gazelle

#### On-chain and off-chain predicates

##### Predicate Compiler

To avoid claiming a big-sized property to Predicate Evaluation Contract, which would require more gas cost, developers would want smaller-sized predicates that can compose a complex property. However, manually writing specific, small predicates in Solidity would be time-consuming and might cause trivial bugs. Predicate Compiler[link], hence, is there to compile complex, big property to piecies of simpler predicates.
Also, you can utilize Predicate Compiler to build a library for complex properties such as a property for atomic swap.

##### On-chain predicate evaluation

**Predicate Evaluation Contract** evaluates each building-block predicate that composes a claimed property when a property is claimed to on-chain contracts. For example in Plasma, property is calimed to PEC when a user tries to withdraw their off-chain assets to the mainchain or a user tries to challenge fraudulent exits. The evaluation is completed after a week of dispute period.
By evaluating each predicate for challenged property, PEC proves the invalidity of the state in the property as a whole. Then, users will be able to withdraw their deposited funds to the mainchain after a week.
