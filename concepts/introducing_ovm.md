# Introducing OVM

OVM(Optimistic Virtual Machine) is powerful concept to develop Layer 2.
We can express complex dispute logic by simple language for OVM and OVM language is called "Optimistic Game Semantics".
For example, we can express Plasma checkpoint and exit claims with 2 simple definition(we call these "property") by OGS.

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

Thus, we could reduce effort to describe dispute logic of Plasma and share logic to other developers easily. Of cource, we can use OVM for other layer 2 protocols, such as State Channel or Optimistic Rollup.
However, the benefit of OVM is not only simple notion to explain dispute logic but also it can be actually evaluated in ethereum smart contract on chain and off chain client. It means that once we write "property" by OGS, we could claim a property on chain and check the property is true or false by OVM client.

## Why OVM?

## Plasma and OVM
