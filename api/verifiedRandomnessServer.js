const { generateKeyPairAndMemorize, sendProofOfRandomTransaction, algodclient } = require("./sendGroupTransaction")


const base32 = require("hi-base32");

var express = require('express');
var cors = require('cors')
var app = express();
var PORT = 4000;

app.use(express.json());
app.use(cors())
app.post('/', function (req, res) {
    console.log(req.body.name)
    res.end();
})

const futureBlockFrom = {}
const safeSpace = 3;

app.get('/random/publicKey', async function (req, res) {
    let { futureBlockId } = req.query
    const { firstRound, lastRound } = await algodclient.getTransactionParams().do();
    if (!futureBlockId) futureBlockId = firstRound + safeSpace;
    if (!futureBlockId) { res.json({ firstRound }); return res.end() }
    if (!firstRound) { res.json({ firstRound }); return res.end() }
    if (!lastRound) { res.json({ firstRound }); return res.end() }
    console.log({ firstRound, lastRound, futureBlockId })
    if (parseInt(futureBlockId) < firstRound + safeSpace) { res.json({ firstRound }); return res.end() }

    const { pk, sk } = await generateKeyPairAndMemorize()
    futureBlockFrom[pk] = futureBlockId;
    console.log({ futureBlockId });
    res.json({ pk, firstRound, futureBlockId })
    return res.end();
})

app.post('/random/proofOfRandom', async function (req, res) {
    const input = req.body;
    console.log(input)
    const pk = input?.pk

    //If future is now and can get the seed from block
    //Put try catch here
    if (!futureBlockFrom[pk]) { res.json({ pk: "invalid, get a new one at /random/publicKey" }); res.end(); return; }
    const futureBlockId = parseInt(futureBlockFrom[pk])
    const blk = await algodclient.block(futureBlockId).do();
    //catch here with 5 5 second retries

    const blk_hash = base32.encode(blk["cert"]["prop"]["dig"]).replace(/=/g, "")
    console.log({ blk_hash });

    if (pk) {
        const { proof, txId, txUrl, randNumber } = await sendProofOfRandomTransaction({ blockSeed: blk_hash, blockId: futureBlockId, pk });
        res.json({ proof, randNumber, txId, txUrl, futureBlockId, futureBlockHash: blk_hash, futureBlockUrl: "https://testnet.algoexplorer.io/block/" + futureBlockId })
        delete futureBlockFrom[pk];
    }
    res.end();
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});