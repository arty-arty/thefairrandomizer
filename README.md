# 🍀The Fair Randomizer

Meet The Fair Randomizer. A simple proven-fair upgrade for your favourite random numbers generator. It is a web2 API that generates true random numbers. A smart signature running on decentralized network of Algorand guarantees the fairness. [The proof is stored forever on-chain](https://testnet.algoexplorer.io/tx/AGHJMKUAK2ICEEWLKCDH7BSPU3K7PYJ7J6XR6VEL5BOIBNSNVXCQ). Thanks to a new [AVM 7 Teal opcode vrf_verify](https://developer.algorand.org/articles/avm-7-new-features/), showing this transaction to a user means complete fairness

Mathematically secured by [Verifiable Random Functions on Algorand](https://developer.algorand.org/articles/randomness-on-algorand/). Due to [our smart signature](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L43), random numbers can be published in transaction note, only if proven by decentralized network of Algorand. So, the very fact of transaction means - each published random number was verified! 

 web3Neither side can influence the outcome. Each number fairness is verified

stored inside a transaction message on-Algorand-chain . So,the fairness is proved by web3. 



[See the prototype](https://rand.algotool.app/) of a [verified lootbox opener](https://rand.algotool.app/) that we built with this API. 
Each resulting number is announced publically, 

After a call it returns a random number. And an immutable proof stored as a transaction on-chain and verified via a Smart Conract. Thanks to a new Teal opcode vrf_verify, showing this transaction to a user means complete fairness. Read more to understand why it can not be tampered, altered, pre-calculated. And means completely secure fairness.

The [transaction proof with a smart signature](https://testnet.algoexplorer.io/tx/2D6KBCWXAXULQBQZZVX3RS5WQGVRN355AUISYEXLCF6M56BP3DVQ) has a message which is parsed and verified within the smart contract. The very fact that this transaction exists - means the random number was verified.
The

```
{
  "blockSeed": "NSSFRA5W25VVDGVIDPAOPO665CSLYSSIDCPZH5FCLOD7C6ENJIZA",
  "proof": "wWLDbLk9ryreutL04knGyIVeGBuHfauPmVp0KVyZ3sZ5jEdkDPdDOXYWd3ahibL0LPzps1y617nIorYDMGI3gFnw7JZSg8dxYK0PSarGHAs=",
  "publicKey": "pb+Sr4q2cStAGSkkz/m7XjsqkU5PQ9KnXG/Euzu0wrc=",
  "randNumber": "193",
  "blockSeedTakenFromBlockWithId": "24964826"
}
```

 Then returns a rad
with a mathematically via web2 again.

$$App \to Web2 \to Web3 \to Web2 \to Link $$

Sometimes you need to provide a truly random number. Sometimes
 

which can generate a random number within the range you specify and verify its fairness. Thanks to the VRF oracle and vrf_verify function on Algorand Blockchain anyone will be able to observe the fairness of randomization.

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

Wait until the block with "futureBlockId" is created, ~15 secs for a 3 block space.

By doing post, redeem your resulting random

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

The end user . It's like a bank receipt, but it's a proof of random 


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

1. Parties agree how many blocks in the future to wait. Could be 3 blocks from now. Or more to secure against a node running with a delay. This future block has a unique block hash which is taken as a random seed. A node runner could choose. It is pretty hard for attacker to influence it in a favorable way. Yet, still possible. Verifiable pseudo random functions come to the rescue.
    
    A tip combine several block hashes to.
    What if the random producer (the one who knows VRF secret key), is the block producer this time. And  

2. One time public-secret VRF keypair is generated. And is shared with the user. In this way the random number producer can not bruteforce dif
Because it's pre-agreed to before the actual seed is known, and so result could be known.

2. Algorand's [verifiable random function](https://en.wikipedia.org/wiki/Verifiable_random_function) as in [draft-irtf-cfrg-vrf-03](https://tools.ietf.org/html/draft-irtf-cfrg-vrf-03) is actually a keyed variant of hash that provides a 80-byte proof that it's output was calculated correctly.

3. In AVMv7 Teal Contract language of Algorand introduced an on-chain method - vrf_verify opcode. Which takes the public key, seed, and a proof - and says if the pseudorandom function was calculated correctly. 
For this proof of concept we use a [logic signature](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/smartsigs/modes/#logic-signatures) in a mode when it governs a special account uniqely assigned to it's code. It allows or denies transactions based on certain criteria.

Here it parses the note like this:

```python
    blockSeed = Substring(Txn.note(), Int(15), Int(67))
    message = Sha256(blockSeed)

    proof = Base64Decode.std(Substring(Txn.note(), Int(80), Int(188)))
    randNumber0 = atoi(Substring(Txn.note(), Int(267), Int(270)))
    publicKey = Base64Decode.std(Substring(Txn.note(), Int(205), Int(249)))
```

And approves a transaction only if the note contains the truth. Only if the 

```python
   program = And(
        ...
        randNumber0 == GetByte(proof, Int(0)),
        VrfVerify.algorand(message, proof, publicKey).outputReducer(
            lambda x, y: y == Int(1))
    )
```

4. Logic signature can be replayed with the same proof, seed, publickey satisfying the vrf_verify equation. How do we protect? By checking the group from inside of a signature, we require another transaction from our authorized account in this group. Without signing by authorized account each time, replayed transactions by other people just fail.

```python
   program = And(
        Gtxn[1].sender() == Addr(feeprovider),
        Gtxn[1].receiver() == Addr(feeprovider),
    )
```

Another nice feature of Algorand is pooled fee. In our setup actually this authorized account pays the fee for the whole group. See more about [group transactions (atomic transfers)](https://developer.algorand.org/docs/get-details/atomic_transfers/)


## Examples of usability

Here are examples of what can be built using our API.
This is what is going to make your end-users say: 
> "Wow, that was, fair, I see the proof. I belive the smart signature proof. I can spread the for others to believe." - John The Web3 Believer Edwards

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

