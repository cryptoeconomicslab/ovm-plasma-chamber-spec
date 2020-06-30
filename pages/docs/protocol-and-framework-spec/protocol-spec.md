---
id: Protocol-Spec
title: Protocol Spec
sidebar_label: Protocol Spec
---

**Introduction**

Welcome to the documentation for Gazelle, an open-source dapps development framework. This documentation consists of two pages.

1. **High-level overview of the fraud-proof scaling solutions**: describes how public blockchains securely scale with fraud-proof technology in general. This page is for those that want to start with looking at a bigger picture of Gazelle's underlying scaling technology.
2. **Gazelle documentation**: describes how Gazelle works and its specifications for the main components. This is mainly for the developers who are contributing to Gazelle's open-source development.

   Specific motivation is to provide inforamtion with

   - Developers who can contribute to integration of new blockchains as a main chain.
   - Developers who can contribute to Gazelle's client development and new platform support such as Android and iOS.
   - Developers who can contribute to development of predicate DSL and Gazelle smart contracts.

## High-level overview of the fraud-proof scaling solutions

### Basic Terminologies

- **Merkle tree**: a data structure that allows efficient and secure verification of large data, only requiring $log(n)$ of computation where n is the number of leaf nodes in the tree. It is important to highlight that in Plasma, Merkle tree's every leaf node is labled with **a hash of off-chain transactions** offloaded from the mainchain.
- **Merkle inclusion proof**: **a list of hash**, which proves that a particular off-chain transaction was actually included in a Merkle tree. Aggregator gives a Merkle inclusion proof to L2 clients. L2 clients use **Merkle inclusion proof and corresponding Merkle root** to check whether a transaction has actually been included or not. Data size of Merkle inclusion proof and the computation to check the inclusion are both log(n) where n is the number of leaf nodes in the tree.
- **Interactive dispute game**: a game played between a claim prover and its opponent. The game is judged by a smart conract using the on-chain data and proofs submitted by Plasma clients.
- **Dispute period**: period that the dispute game is played. Users have to wait this period to withdraw their assets.

### Scaling solutions powered by fraud-proof scheme

#### Plasma 　

Plasma is a blockchain scaling design which significantly reduces the gas cost per transaction.
Using Plasma, transactions are not directly submitted to the mainchain, but to a **transaction aggregator**, also known as an **operator**, who later submits them hashed into 32 bytes data. Aggregator computes the root hash of a Merkle tree in which every leaf node is labeled with a hash of state from off-loaded transactions and commits the root hash to the mainchain.

![plasma-image](/img/docs/plasma.png)
Transaction aggregator recieves all the off-chain transactions off-loaded from the mainchain and generates a Merkle tree, putting all the transactions' hash in the Merkle tree leaves.

With transaction aggregator submitting a Merkle root to the mainchain at a regular time interval, **users can protect their assets using their local information** such as signed transactions and Merkle inclusion proofs.

##### Designs that give Plasma self-custody

**Design that invalidates fraudulent exits to the mainchain**

When a malicious party tries to withdraw someone else's assets to the mainchain, users have to **challenge the fraudulent exit** such as exits of already spent coin and coins that has invalid transaction history to protect their assets. By challenging, honest users prevent its exit. Honest users have to be online at an application built with Plasma at least once a dispute period to detect malicious actions and prevent their assets from being stolen.

**Design that invalidates fraudulent off-chain transactions in Plasma**

Plasma clients automatically detect fraudulent transaction with invalid transaction history and reject the state transition when receiving assets off-chain.

##### Design that reduces client verification costs

**Range assigned to your offchain assets**

When users deposit their assets into a Plasma chain, deposit contract assigns a specific **range** that represents the amount of assets. For example, if you deposit 3 ETH, range defined by `start` value and `end` value, say 1 and 4, are assigned to the deposited 3 ETH. Then, your ownership will be tied to any slot (one slot represents 1 ETH in this case, but it should actually be much smaller in real implementations) within 1 to 4. When users make a transfer of any amount assets less than or equal to 3 ETH, new ownership will be assigned to the range that represents the amount transfered. With this idea of defragmentation of the deposited assets, separated ranges with one owner can be reordered adjancent and “merged” into a single larger range, when users transfer the assets to different owner.
This system significantly reduces the amount of data each Plasma client must store for the state verification, since users only have to track the ranges that they own.

**Light Clients powered by Merkle Interval Tree**

For the transaction aggregation, Gazelle utilizes **Merkle Interval Tree**, a binary tree that has special leaf node labelling to reduce clients' verification costs. Here are Merkle Interval Tree's special rules for labelling its leaf nodes.

1. Merkle Interval Tree's leaf nodes are labeled with **a state made by an off-chain transaction and the range that is transacted**. The range is specified by `start` and `end`value.
2. Merkle Interval Tree does not include any two different transactions which refrence an **overlapped range**.
   By defining unique ranges that is used in the off-chain transactions, Plasma clients only have to track the transactions that are related to themselves. This is the advent of Layer2 **Light clients**, which carry some of the transactions they would need, in comparison to full nodes carrying all the transaction history.

### OGS

#### What is OGS?

Optimistic Game Semantics is an abstraction scheme for fraud-proof scaling solution's dispute games. OGS supports every Layer2 fraud-proof solution in design. Using OGS, you can define the validity of a state and its transition by writing a claim in the form of predicate logic proposition. Propositions are sent to the on-chain **Predicate Evaluation Contract** when users want to exit their assets or create checkpoint of the state. PEC evaluates propositions to true or false after exchanging arguments written in OGS, in other words, playing an **interactive dispute game**.

#### Plasma in OGS

For example, let's say a proposition claims that you have an asset X in Plasma. Then, Predicate Evaluation Contract will check whether or not you actually have the asset X based on the submitted evidence such as signature, transactions, or Merkle inclusion proof. **The greatness of OGS is that it enables both smart contracts and client devicese to evaluate a claim following the same rule.** As the name says, OGS is **a new shared language that defines the sematics of the dispute games for fraud-proof**. Therefore, now it is possible to express many parts of the Plasma system, such as check points, exits, ownership states, and atomic swaps, using OGS propositions. That makes the development a lot simpler and brings a composability to Gazelle applications.
