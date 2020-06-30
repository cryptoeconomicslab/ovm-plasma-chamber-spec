---
id: Introduction
title: Introduction
sidebar_label: Introduction
---

Gazelle is a scaling technology for blockchain based on Plasma and Optimistic Game Semantics(OGS). Current scope of its functionality includes transfer of WrappedETH[^1] and ERC20 tokens.

<a href="https://www.plasma.io/plasma.pdf" target="_blank" rel="noopener">
  Plasma
</a> is a second layer scaling solution which introduces&nbsp;
<b>
  transaction aggregator
</b> who recieves all the transactions happend off-chain and generate a merkle tree with all the transactions' hash as leaves of the tree. By submitting root of the tree to the main-chain periodically, all the users are assured to protect their assets on Plasma. If you want to know a lot more about plasma, we recommend reading&nbsp;
<a href="https://www.learnplasma.org/en/" target="_blank" rel="noopener">
  Learn Plasma
</a>.
<br />
<br />
<a
  href="https://plasma.group/optimistic-game-semantics.pdf"
  target="_blank"
  rel="noopener"
>
  Optimistic Game Semantics(OGS)
</a>
&nbsp;is the abstraction of dispute game, designed to support Layer 2 protocols using fraud-proof.
Dispute game is written by Predicate logic as proposition.
Every proposition is claimed to the same smart contract called Adjudication Contract.
They can prove as true or false by exchanging arguments under the rule of OGS.
For example, it's a proposition that the claim you have an asset in Plasma.
The great point of OGS is providing the way to evaluate claims under the same rules for both smart contracts and client devices.
We are able to represent many parts of the Plasma system in OGS propositions and make the system simpler.

<!-- TODO: where do we put the link to Plasma? -->

Gazelle provides several useful APIs for DApp developers to make use of scalability of Plasma. Basic API includes `deposit`, `transfer` and `exit`. Detailed API can be found [here](api/Plasma_Light_Client).

[^1]: Wrapped ETH(or WETH) is an ERC20 token that represents ETH one-to-one. The reason why you need WETH is to handle ETH in the same manner as ERC20 token in Smart Contract. Users can convert their ETH to WETH and convert back anytime by WETH Smart Contract.