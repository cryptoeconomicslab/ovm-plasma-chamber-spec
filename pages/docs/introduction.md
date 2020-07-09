---
id: Introduction
title: Introduction
sidebar_label: Introduction
---

Welcome to the documentation for Gazelle, an open-source dapps framework.
Currently supported functionality includes transfer of WrappedETH[^1] and ERC20 tokens.

Gazelle provides dapps developers with several useful APIs, which make use Plasma's nearly inifinite scalability. Basic API includes `deposit`, `transfer` and `exit`. Detailed API can be found [here](api/Plasma_Light_Client).

[^1]: Wrapped ETH(WETH) is an ERC20 token that represents ETH in exactly the same amount. The reason why you need WETH is to handle ETH in the same manner as ERC20 token in smart contracts. Users can convert their ETH to WETH and convert back to ETH anytime by the WETH smart contract.
