# Introducing OVM

OVM(Optimistic Virtual Machine) is a powerful concept to develop Layer 2.
We can express complex dispute logic by simple OVM language, and that language consists of [Optimistic Game Semantics](https://plasma.group/optimistic-game-semantics.pdf).
For example, we can express Plasma checkpoint and exit claims with 2 simple definitions (we call these "property") by OGS.

```
def checkpoint(su, subrange) :=
  IsContained(subrange, su.1)
  and IsLessThan(su.2).all(b ->
    SU(b, su.0,subrange).all(old_su -> old_su())
  )
```

```
def exit(su, subrange, inclusionProof) :=
  VerifyInclusion(su, su.0, su.1, inclusionProof, su.2)
  and !su()
  and Checkpoint(su, subrange)
```

Thus, we could reduce effort to describe the dispute logic of Plasma and share logic with other developers easily. Of course, we can use OVM for other layer-2 protocols, such as State Channel or Optimistic Rollup.
The benefit of OVM is not only it provides notation to explain dispute logic but also it can be evaluated in ethereum smart contract on-chain and off-chain client. It means that once we write "property" by OGS, we could claim property on-chain and check the property is true or false by OVM client.

## Why OVM?

## Plasma and OVM
