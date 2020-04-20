# Introduction
Volt-framework is a scaling technology for blockchain based on Plasma and Optimistic Virtual Machine(OVM). Current scope of its functionality includes transfer of WrappedETH and ERC20 tokens.

Plasma is a second layer scaling solution which introduces *transaction aggregator* who recieves all the transactions happend off-chain and generate a merkle tree with all the transactions' hash as leaves of the tree. By submitting root of the tree to the main-chain periodically, all the users are assured to protect their assets on Plasma. You can find detailed discussion about plasma [here](place-link).

Volt-framework provides several useful APIs for DApp developers to make use of scalability of Plasma. Basic API includes `deposit`, `transfer` and `exit`. Detailed API can be found [here](link).
