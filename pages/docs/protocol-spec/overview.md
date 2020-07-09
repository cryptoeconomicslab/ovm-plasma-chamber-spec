---
id: Overview
title: High-level Overview of Fraud-proof
sidebar_label: High-level Overview of Fraud-proof
---

**Protocol Spec** pages describe how public blockchains securely scale with fraud-proof technology in general. This page is for those that want to start with looking at a bigger picture of Gazelle's underlying scaling technology.

## Basic Terminologies

- **Merkle tree**: a data structure that allows efficient and secure verification of large data, only requiring `log(n)` of computation where n is the number of leaf nodes in the tree. It is important to highlight that in Plasma, Merkle tree's every leaf node is labled with **a hash of off-chain transactions** offloaded from the mainchain.
- **Merkle inclusion proof**: **a list of hash**, which proves that a particular off-chain transaction was actually included in a Merkle tree. Aggregator gives a Merkle inclusion proof to L2 clients. L2 clients use **Merkle inclusion proof and corresponding Merkle root** to check whether a transaction has actually been included or not. Data size of Merkle inclusion proof and the computation to check the inclusion are both `log(n)` where n is the number of leaf nodes in the tree.
- **Interactive dispute game**: a game played between a claim prover and its opponent. The game is judged by a smart conract using the on-chain data and proofs submitted by Plasma clients.
- **Dispute period**: period that the dispute game is played. Users have to wait this period to withdraw their assets.
