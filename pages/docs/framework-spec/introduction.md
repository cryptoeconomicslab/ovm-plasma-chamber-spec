---
id: Introduction
title: Gazelle Spec Introduction
sidebar_label: Gazelle Spec Introduction
---

**Framework Spec** pages describe how Gazelle works in detail and addresses its main components' specifications. This is mainly for the developers who would like to contribute to Gazelle's open-source development.

Specific motivation is to provide inforamtion with

- Developers who can contribute to integration of new blockchains as a main chain.
- Developers who can contribute to Gazelle's client development and new platform support such as Android and iOS.
- Developers who can contribute to development of predicate DSL and Gazelle smart contracts.

## Gazelle in a nutshell

![gazelle-image](/img/docs/gazelle.png)

## Features of Gazelle

- **L1 agnostic design**

Using Gazelle, you can build application on top of a variety of blockchain. Gazelle currently supports Ethereum and Tezos.

- **Composability of multiple off-chain solutions**

If you are an application developer, you probably understand that the composability of applications plays a huge role in the development. As above section about OGS explained, Gazelle made it possible to build scalable blockchain applications using multiple off-chain scaling solutions, such as Plasma, State channels, and Optimistic Rollup, employing OGS. This feature makes your blockchain application more general and flexibility.
