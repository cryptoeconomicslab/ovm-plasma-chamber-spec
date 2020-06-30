---
id: OGS
title: Optinmistic Game Semantics
sidebar_label: Optimistic Game Semantics
---

## What is OGS?

Optimistic Game Semantics is an abstraction scheme for fraud-proof scaling solution's dispute games. OGS supports every Layer2 fraud-proof solution in design. Using OGS, you can define the validity of a state and its transition by writing a claim in the form of predicate logic proposition. Propositions are sent to the on-chain **Predicate Evaluation Contract** when users want to exit their assets or create checkpoint of the state. PEC evaluates propositions to true or false after exchanging arguments written in OGS, in other words, playing an **interactive dispute game**.

## Plasma in OGS

For example, let's say a proposition claims that you have an asset X in Plasma. Then, Predicate Evaluation Contract will check whether or not you actually have the asset X based on the submitted evidence such as signature, transactions, or Merkle inclusion proof. **The greatness of OGS is that it enables both smart contracts and client devicese to evaluate a claim following the same rule.** As the name says, OGS is **a new shared language that defines the sematics of the dispute games for fraud-proof**. Therefore, now it is possible to express many parts of the Plasma system, such as check points, exits, ownership states, and atomic swaps, using OGS propositions. That makes the development a lot simpler and brings a composability to Gazelle applications.
