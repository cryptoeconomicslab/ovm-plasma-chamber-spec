---
id: Main_Components
title: Main Components of Gazelle
sidebar_label: Main Components of Gazelle
---

## On-chain and off-chain predicates

### Predicate Compiler

To avoid claiming a big-sized property to Predicate Evaluation Contract, which would require more gas cost, developers would want smaller-sized predicates that can compose a complex property. However, manually writing specific, small predicates in Solidity would be time-consuming and might cause trivial bugs. Predicate Compiler[link], hence, is there to compile complex, big property to piecies of simpler predicates.
Also, you can utilize Predicate Compiler to build a library for complex properties such as a property for atomic swap.

### On-chain predicate evaluation

Predicate Evaluation Contract evaluates each building-block predicate that composes a claimed property when a property is claimed to on-chain contracts. For example in Plasma, property is calimed to PEC when a user tries to withdraw their off-chain assets to the mainchain or a user tries to challenge fraudulent exits. The evaluation is completed after a week of dispute period.
By evaluating each predicate for challenged property, PEC proves the invalidity of the state in the property as a whole. Then, users will be able to withdraw their deposited funds to the mainchain after a week.
