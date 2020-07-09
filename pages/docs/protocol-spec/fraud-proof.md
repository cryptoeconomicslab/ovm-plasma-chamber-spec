---
id: Fraud_Proof
title: Scaling Solutions Powered by Fraud-proof
sidebar_label: Scaling Solutions Powered by Fraud-proof
---

## Plasma 　

Plasma is a blockchain scaling design which significantly reduces the gas cost per transaction.
Using Plasma, transactions are not directly submitted to the mainchain, but to a **transaction aggregator**, also known as an **operator**, who later submits them hashed into 32 bytes data. Aggregator computes the root hash of a Merkle tree in which every leaf node is labeled with a hash of state from off-loaded transactions and commits the root hash to the mainchain.

![plasma-image](/img/docs/plasma.png)
Transaction aggregator recieves all the off-chain transactions off-loaded from the mainchain and generates a Merkle tree, putting all the transactions' hash in the Merkle tree leaves.

With transaction aggregator submitting a Merkle root to the mainchain at a regular time interval, **users can protect their assets using their local information** such as signed transactions and Merkle inclusion proofs.

### Designs that give Plasma self-custody

- Design that invalidates fraudulent exits to the mainchain

When a malicious party tries to withdraw someone else's assets to the mainchain, users have to **challenge the fraudulent exit** such as exits of already spent coin and coins that has invalid transaction history to protect their assets. By challenging, honest users prevent its exit. Honest users have to be online at an application built with Plasma at least once a dispute period to detect malicious actions and prevent their assets from being stolen.

- Design that invalidates fraudulent off-chain transactions in Plasma

Plasma clients automatically detect fraudulent transaction with invalid transaction history and reject the state transition when receiving assets off-chain.

### Design that reduces client verification costs

- Range assigned to your offchain assets

When users deposit their assets into a Plasma chain, deposit contract assigns a specific **range** that represents the amount of assets. For example, if you deposit 3 ETH, range defined by `start` value and `end` value, say 1 and 4, are assigned to the deposited 3 ETH. Then, your ownership will be tied to any slot (one slot represents 1 ETH in this case, but it should actually be much smaller in real implementations) within 1 to 4. When users make a transfer of any amount assets less than or equal to 3 ETH, new ownership will be assigned to the range that represents the amount transfered. With this idea of defragmentation of the deposited assets, separated ranges with one owner can be reordered adjancent and merged into a single larger range, when users transfer the assets to different owner.
This system significantly reduces the amount of data each Plasma client must store for the state verification, since users only have to track the ranges that they own.

- Light Clients powered by Merkle Interval Tree

For the transaction aggregation, Gazelle utilizes **Merkle Interval Tree**, a binary tree that has special leaf node labelling to reduce clients' verification costs. Here are Merkle Interval Tree's special rules for labelling its leaf nodes.

1. Merkle Interval Tree's leaf nodes are labeled with **a state made by an off-chain transaction and the range that is transacted**. The range is specified by `start` and `end`value.
2. Merkle Interval Tree does not include any two different transactions which refrence an **overlapped range**.
   By defining unique ranges that is used in the off-chain transactions, Plasma clients only have to track the transactions that are related to themselves. This is the advent of Layer2 **Light clients**, which carry some of the transactions they would need, in comparison to full nodes carrying all the transaction history.
