const { generateKeyPairAndMemorize, sendProofOfRandomTransaction, algodclient } = require("./sendGroupTransaction")


const base32 = require("hi-base32");

var express = require('express');
var app = express();
var PORT = 3000;

app.use(express.json());

app.post('/', function (req, res) {
    console.log(req.body.name)
    res.end();
})

const futureBlockFrom = {}
const safeSpace = 4;

app.get('/publicKey', async function (req, res) {
    const { futureBlockId } = req.query
    const { firstRound, lastRound } = await algodclient.getTransactionParams().do();
    if (!firstRound) { res.json({ firstRound }); return res.end() }
    if (!lastRound) { res.json({ firstRound }); return res.end() }
    console.log({ firstRound, lastRound, futureBlockId })
    if (parseInt(futureBlockId) <= firstRound + safeSpace) { res.json({ firstRound }); return res.end() }

    const { pk, sk } = await generateKeyPairAndMemorize()
    futureBlockFrom[pk] = futureBlockId;
    console.log({ futureBlockId });
    res.json({ pk, firstRound })
    return res.end();
})

app.post('/proofOfRandom', async function (req, res) {
    const input = req.body;
    console.log(input)
    const pk = input?.pk

    //If future is now and can get the seed from block
    //Put try catch here
    const futureBlockId = parseInt(futureBlockFrom[pk])
    const blk = await algodclient.block(futureBlockId).do();
    const blk_hash = base32.encode(blk["cert"]["prop"]["dig"]).replace(/=/g, "")
    console.log({ blk_hash });

    if (pk) {
        const { proof, txId, txUrl, randNumber } = await sendProofOfRandomTransaction({ blockSeed: blk_hash, blockId: futureBlockId, pk });
        res.json({ proof, randNumber, txId, txUrl, futureBlockId, futureBlockHash: blk_hash, futureBlockUrl: "https://testnet.algoexplorer.io/block/" + futureBlockId })
    }
    res.end();
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});