---
id: Plasma_Aggregator
title: Plasma Aggregator API
sidebar_label: Plasma Aggregator
description: Check out Gazelle's API reference to set up a Plasma Aggregator without hassles.
---

Plasma Aggregator is an actor to collect Layer2 transactions and calculate merkle root, submit it to CommitmentContract. Aggregator has several HTTP API endpoints.

## POST send_tx

This is used to submit transaction to aggregator. Client can send multiple transactions at once.

### Parameters

| key  | value           | description                               |
| ---- | --------------- | ----------------------------------------- |
| data | `Array<string>` | Array of hex string of Transaction object |

### Response status code

- STATUS 201: successfully created
- STATUS 422: when invalid transaction or insufficient fund

## GET sync_state

This is used to sync client state with aggregator state. Fetch related stateUpdates from aggregator.

### Parameters

| key         | value    | description           |
| ----------- | -------- | --------------------- |
| blockNumber | `number` | Block number to fetch |
| address     | `string` | client's address      |

### Response status code

- 200: returns array of state update hex string
- 400: Invalid address format

## GET block

This is used to fetch plasma block from aggregator.

### Parameters

| key         | value    | description           |
| ----------- | -------- | --------------------- |
| blockNumber | `number` | Block number to fetch |

### Response status code

- 200: returns hex string of encoded block
- 404: block not found

## GET inclusion_proof

This is used to fetch inclusion proof of state update.

### Parameters

| key         | value    | description                                  |
| ----------- | -------- | -------------------------------------------- |
| blockNumber | `number` | Block number the state update is included at |
| stateUpdate | `string` | hex string of encoded state update           |

### Response status code

- 200: returns hex string of encoded inclusion proof
- 404: inclusion proof not found
