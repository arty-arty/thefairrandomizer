# 🍀The Fair Randomizer

Meet The Fair Randomizer. A simple proven-fair upgrade for your favourite random numbers generator. It is a web2 API that generates true random numbers. [A smart signature](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L46) running on decentralized network of Algorand guarantees the fairness. [The proof is stored forever on-chain](https://testnet.algoexplorer.io/tx/RGZQ6AGWZIMDZBWBOVCOQXFH3ITFI5SUGYFEBEHLTVET2Y4XS46A) inside of a transaction note. Thanks to a new [AVM 7 Teal opcodes vrf_verify and block](https://developer.algorand.org/articles/avm-7-new-features/), the very fact that this transaction exists - means mathematically verified randomness. Showing this transaction to the end-user demonstrates complete fairness, transparency, and trust. 

Sounds like an impossible magic-trick? [Learn more about security and fairness](#security-and-fairness) or just play around with a prototype.

## A short 

Built its capable to generate in parallel. Due to inheriting Algorand properties [Throughtput is as fantastic]() as it is for the Algorand system



Mathematically secured by [Verifiable Random Functions on Algorand](https://developer.algorand.org/articles/randomness-on-algorand/). Due to [our smart signature](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L43), random numbers can be published in transaction note, only if proven by decentralized network of Algorand. So, the very fact of transaction means - each published random number was verified! 

 web3Neither side can influence the outcome. Each number fairness is verified

stored inside a transaction message on-Algorand-chain . So,the fairness is proved by web3. 



[See the prototype](https://rand.algotool.app/) of a [verified lootbox opener](https://rand.algotool.app/) that we built with this API. 
Each resulting number is announced publically, 


The [transaction proof with a smart signature](https://testnet.algoexplorer.io/tx/RGZQ6AGWZIMDZBWBOVCOQXFH3ITFI5SUGYFEBEHLTVET2Y4XS46A) has a message which is parsed and [verified within the smart contract](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L46). The very fact that this transaction exists - means the random number was verified.
The

```
{
  "blockSeedTakenFromBlockWithId": 25062547,
  "publicKey": "dJbe6Um7AAOxictqfKdCce0aEdBN8/F1iBkdzB7moeQ=",
  "randNumber": 36,
  "proof": "JBV3L12SKU1l3WY5iaxcnvU/QZyiso2UaXJ+tPmJaDf14fbWLf3uiqhxRbX/ZKjL1NpdSrDX/JC+6lcb5Mia0/9g1jad6hdaQFt5REV5+gg="
}
```

Cambridge dictionary defines fairness as "the quality of treating people equally...". Each user gets a uniformly ditributed random number with equal probabilty.



Any web2 just plugs
The takeaway is just replacing random you use
## Our mission
Today, on the Internet, we can observe a lot of sites or applications where randomization is used. Along with the development of web3, it becomes very important to verify all randomization. More and more crypto projects/web3 projects/gambling projects have started using random numbers in their work. 

People want to know for sure whether there is evidence for the honesty of certain random algorithms. Sometimes the developers don't even tell us about the algorithms they use and about fairness. Our goal is to popularize the verification of randomization with help of Algorand Blockchain and as a result, make someone's life a little better.

## How to use it in your own project

Simple! Just do a GET request on https://api.algotool.app/random/publicKey. Response would be like:
```
{
  "pk": "zs49exsW7eoeF55F5c4jdvNLZESfjVz0zCDrIPiM7kw=",
  "firstRound": 24990082,
  "futureBlockId": 24990085
}
```
Where "pk" is your public key, and its dual secret key is temorarily stored on the server. The "firstRound" field is the current block on the Algorand chain. The "futureBlockId" field is a future block id with a yet unknown block hash to be used as a seed for random number generation.

Wait until the block with "futureBlockId" is created, ~15 secs for a 3 block safety-space. ~36 secs for an 8 block safety-space.

By doing post, redeem your resulting random.

You get a response with some useful info:
```
{
  "proof": "SPEjJPraOZbmyIkUy8un3dy7jYvlO4DAECDoEYtaI9ArWkJlbq1DRn29Xssuyy/Qf2BVACxyTLoU6rwBo/UwufvaKabpU1U2NFiGJbi7aQw=",
  "randNumber": "072",
  "txId": "XYMQWN5IPCNDUPHRSHS3X6K5T2GQMYXT3SLLVHSWISFLGBZQ37BQ",
  "txUrl": "https://testnet.algoexplorer.io/tx/XYMQWN5IPCNDUPHRSHS3X6K5T2GQMYXT3SLLVHSWISFLGBZQ37BQ",
  "futureBlockId": 24990085,
  "futureBlockHash": "XGYQ6GMS6I36XVWFIV5BGA2RUSKX42LNKCXWQTZ3W4WSYEWYMY4Q",
  "futureBlockUrl": "https://testnet.algoexplorer.io/block/24990085"
}
```

Explain that he must
The end user needs. It's like a bank receipt, but it's a proof of random.  


Serves a decentralized source of truth

## How to use VRF in my

We believe in onboarding from web2 to web3. To make it smooth
we proivde - js to be used backend and frontend

## Tech details

1. We forked dcypto library and added. It compiles to WASM, so platform agnostic. This is our present to Algorand community. 
This way Node.js or in browser 

```
Clone

```
2. The core of our method is a smart signature. 

4. We built a probably most fair loot opening. As a use case example.


## Security and fairness

The fair randomizer has several layers of protection:

1. Parties agree how many blocks in the future to wait. Could be 3 or 8 blocks from now for more security. This future block will have a unique block hash which will be taken as a random seed. It is pretty hard for attacker to influence it in a favorable way. Yet, still possible. Verifiable pseudo random functions come to the rescue.
    
    A tip: combine N several consecutive block hashes in production. This way a "succesfull hack" will require corrupting N randomly chosen block producers, which is even more cumbersome.

2. One time public-secret VRF keypair is generated. And is shared with the user. In this way the random number producer can not bruteforce different public keys to get a needed result. The user just has to make sure that the promised public key = the public key seen in smart signature verified transaction. 

2. Algorand's [verifiable random function](https://en.wikipedia.org/wiki/Verifiable_random_function) as in [draft-irtf-cfrg-vrf-03](https://tools.ietf.org/html/draft-irtf-cfrg-vrf-03) is actually a keyed variant of hash that provides a 80-byte proof that it's output was calculated correctly. The proof is proven to be a pseudorandom function of the seed.

3. In AVMv7 Teal Contract language of Algorand introduced an on-chain method - vrf_verify opcode. Which takes the public key, seed, and a proof - and says if the pseudorandom function was calculated correctly. 
For this prototype we use a [logic signature](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/smartsigs/modes/#logic-signatures) in a mode when it governs a special account uniqely assigned to it's code. It allows or denies transactions based on certain criteria.

Here it parses the note like this:

```python
    futureBlockId = JsonRef.as_uint64(
        Txn.note(), Bytes("blockSeedTakenFromBlockWithId"))
    message = Block.seed(futureBlockId)
    proof = Base64Decode.std(JsonRef.as_string(
        Txn.note(), Bytes("proof")))
    randNumber0 = JsonRef.as_uint64(
        Txn.note(), Bytes("randNumber"))
    publicKey = Base64Decode.std(JsonRef.as_string(
        Txn.note(), Bytes("publicKey")))
```

And approves a transaction only if the note contains the truth. Only if:

```python
   program = And(
        ...
        randNumber0 == GetByte(proof, Int(0)),
        VrfVerify.algorand(message, proof, publicKey).outputReducer(
            lambda x, y: y == Int(1))
    )
```

4. Logic signature could be replayed with the same proof, seed, and publickey satisfying the vrf_verify equation. How do we protect? By checking the group from inside of a signature, we require another transaction from our authorized account in this group. Without signing by authorized account each time, replayed transactions by other people just fail.

```python
   program = And(
        Gtxn[1].sender() == Addr(feeprovider),
        Gtxn[1].receiver() == Addr(feeprovider),
    )
```

Another nice feature of Algorand is pooled fee. In our setup actually this authorized account pays the fee for the whole group. See more about [group transactions (atomic transfers)](https://developer.algorand.org/docs/get-details/atomic_transfers/)


## Examples of usability

Here are the examples of what can be built using our API.
The end-users say something between the lines: 
> "I did a golden . Wow, that was, fair, I see the proof. I belive the smart signature proof. I can spread the for others to believe." - John The Web3 Believer Edwards

1. Play-to-Earn Gaming

Gaming has gained unprecedented popularity in the 21st century. We can see a [constant increase in the number of players, games and platforms](https://www.digitaljournal.com/pr/play-to-earn-nft-games-market-share-and-growth-insights-2022-global-size-analysis-demand-scope-future-trends-growing-opportunities-and-forecast-to-2027). And more recently, over the past few years, play-to-earn gaming has appeared. And in all play-to-earn projects users must buy nft or tokens in order to play or earn a significant amount of money. As a result, users risk 🔥🪙 their crypto savings. And often in such projects, the blockchain is used mainly for anonymity and convenient interaction with crypto/nft assets.

So what's the deal with randomization? Usually the rewards for some actions/missions in games are determined using random. For example, you are told that you will receive a reward with a 10% chance. But you cannot check the fairness of this 10% random. But you need to pay for each attempt to get a reward. As a result, the user loses his money.

With our randomizer, the randomness of every reward in the game can be verified.

2. Gambling

The main area where randomization is constantly used is gambling. Despite the fact that in some countries everything related to gambling is prohibited, slot machines, online lotteries, case opening and other features are gaining more and more popularity. Let's put gambling philosophy aside for another time and talk about fairness in gambling. Many online platforms do not have a fair random and people lose their money even without a single chance of winning. Or they are told that on average a gambling game returns 98% of the money wagered, but in fact this percentage can be less than 50%. 

The Fair Randomizer, with the help of Algorand Blockchain, can increase user confidence in any legal gambling platform that they seek to use.

3. Raffles or lotteries

So many companies today are constantly raffling off some crypto/nfts/other nice things to attract and stimulate users. But a lot of raffles are fake or rewards go to specifically chosen people.
With the help of our randomizer, you will be able to observe the fairness of the random and enjoy some prizes if you win.

4. [Fair random for anyone](https://rand.algotool.app/)!

Any user of our randomizer will be able to generate some numbers for any purpose. For example, to choose which of your friends will seek others in a hide-and-seek game. It's like random.org, but with a proof forever inscribed. The proof can be shown to everyone in the world. With a simple link. It's the ultimate random for the age of web3!  

