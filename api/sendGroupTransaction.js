require('dotenv').config()
const fs = require('fs');
const crypto = require("crypto")
const algosdk = require("algosdk")
const dcrypto = require("@deliberative/crypto");

const token = "11e4dcfb445a8c7e8380848747f18afcd5d84ccb395e003e5b72127ca5e9a259";
const server = "http:/ec2-3-18-80-65.us-east-2.compute.amazonaws.com";
const port = 8080;
let algodclient = new algosdk.Algodv2(token, server, port);

//const lsigProgram = "ByACAAEmASCvH0TTSdr5SmUo5gQtWhkAxQC+PHS8DNZqPRwzwm8ZPzMAASISMgSBAhIzABAjEhAzAAkyAxIQMwAVMgMSEDMAIDIDEhAzAAgiEhAzARAjEhAzAQkyAxIQMwEVMgMSEDMBIDIDEhAzAQgiEhAQMwEAKBIzAQcoEhAxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIxIQEEM="
//const lsigProgram = "ByADAAEwJgEgrx9E00na+UplKOYELVoZAMUAvjx0vAzWaj0cM8JvGT8zAAEiEjIEgQISMwAQIxIQMwAJMgMSEDMAFTIDEhAzACAyAxIQMwAIIhIQMwEQIxIQMwEJMgMSEDMBFTIDEhAzASAyAxIQMwEIIhIQEDMBACgSMwEHKBIQMQWBiwKBA1iIAEYxBVdQbF4BIlUSEDEFVw80ATEFV1BsXgExBVfNLF4B0AA1ATUANAEjEhAQQzUDgQo0A5SJNQQ0BCQPRDQEgTkORDQEJAmJNQI0AhUiDUAABCJCACE0AiJViP/ZNAIVIwmI/8kLNAIjNAIVUjQCTIj/1Uw1AgiJ"
//const lsigProgram = "ByADAAEwJgEgRx/xYa3UtcKnvPIl/zNRSNAAHT4Ry/YY+4hSB5ZDy1szAAEiEjIEgQISMwAQIxIQMwAJMgMSEDMAFTIDEhAzACAyAxIQMwAIIhIQMwEQIxIQMwEJMgMSEDMBFTIDEhAzASAyAxIQMwEIIhIQEDMBACgSMwEHKBIQMQWBiwKBA1iIAEYxBVdQbF4BIlUSEDEFVw80ATEFV1BsXgExBVfNLF4B0AA1ATUANAEjEhAQQzUDgQo0A5SJNQQ0BCQPRDQEgTkORDQEJAmJNQI0AhUiDUAABCJCACE0AiJViP/ZNAIVIwmI/8kLNAIjNAIVUjQCTIj/1Uw1AgiJ"
//const lsigProgram = "ByADAAEwJgEgRx/xYa3UtcKnvPIl/zNRSNAAHT4Ry/YY+4hSB5ZDy1szAAEiEjIEgQISMwAQIxIQMwAJMgMSEDMAFTIDEhAzACAyAxIQMwAIIhIQMwEQIxIQMwEJMgMSEDMBFTIDEhAzASAyAxIQMwEIIhIQEDMBACgSMwEHKBIQMQWBiwKBA1iIAFoxBVdQbF4BIlUSEDEFVw80MQWBswKBCFiIAD/RABIQMQVXDzQBMQVXUGxeATEFV80sXgHQADUBNQA0ASMSEBBDNQOBCjQDlIk1BDQEJA9ENASBOQ5ENAQkCYk1AjQCFSINQAAEIkIAITQCIlWI/9k0AhUjCYj/yQs0AiM0AhVSNAJMiP/VTDUCCIk="
//const lsigProgram = "ByACAAEmAiBHH/FhrdS1wqe88iX/M1FI0AAdPhHL9hj7iFIHlkPLWwVwcm9vZjMAASISMgSBAhIzABAjEhAzAAkyAxIQMwAVMgMSEDMAIDIDEhAzAAgiEhAzARAjEhAzAQkyAxIQMwEVMgMSEDMBIDIDEhAzAQgiEhAQMwEAKBIzAQcoEhAxBYAKcmFuZE51bWJlcl8BMQUpXwBeASJVEhAxBYAdYmxvY2tTZWVkVGFrZW5Gcm9tQmxvY2tXaXRoSWRfAdEAATEFKV8AXgExBYAJcHVibGljS2V5XwBeAdAANQE1ADQBIxIQEEM="
const lsigProgram = "ByACAAEmAiBHH/FhrdS1wqe88iX/M1FI0AAdPhHL9hj7iFIHlkPLWwVwcm9vZjMAASISMgSBAhIzABAjEhAzAAkyAxIQMwAVMgMSEDMAIDIDEhAzAAgiEhAzARAjEhAzAQkyAxIQMwEVMgMSEDMBIDIDEhAzAQgiEhAQMwEAKBIzAQcoEhAxBYAKcmFuZE51bWJlcl8BMQUpXwBeASJVEhAxBYAdYmxvY2tTZWVkVGFrZW5Gcm9tQmxvY2tXaXRoSWRfAdEAMQUpXwBeATEFgAlwdWJsaWNLZXlfAF4B0AA1ATUANAEjEhAQQw=="
const lsig = new algosdk.LogicSigAccount(new Uint8Array(Buffer.from(lsigProgram, "base64")))

console.log(process.env)
const feePayerMnemonic = process.env.YOUR_SECRET_MNEMONIC
const recoveredAccount = algosdk.mnemonicToSecretKey(feePayerMnemonic);
// var lsigProgram = "ByABATEBMgAOMRAiEjEJMgMSEDEVMgMSEDEgMgMSEDIEIhIQMQiBABIQEDEHgCChQGCfoThAocpSCp/lgz+pUA2SbVfXVpD+VeMWzwT1sBIxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIhIQEEM=";
// lsigProgram = "ByABATEBMgAOMRAiEjEJMgMSEDEVMgMSEDEgMgMSEDEIgQASEBAxB4AgoUBgn6E4QKHKUgqf5YM/qVANkm1X11aQ/lXjFs8E9bASMQVXDzQBMQVXUGxeATEFV80sXgHQADUBNQA0ASISEBBD"
// lsigProgram = "ByACAAExASISMRAjEjEJMgMSEDEVMgMSEDEgMgMSEDEIIhIQEDEHgCChQGCfoThAocpSCp/lgz+pUA2SbVfXVpD+VeMWzwT1sBIxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIxIQEEM="
// lsigProgram = "ByACAAEmASCvH0TTSdr5SmUo5gQtWhkAxQC+PHS8DNZqPRwzwm8ZPzMAASISMgSBAhIzABAjEhAzAAkyAxIQMwAVMgMSEDMAIDIDEhAzAAgiEhAzARAjEhAzAQkyAxIQMwEVMgMSEDMBIDIDEhAzAQgiEhAQMwAHgCChQGCfoThAocpSCp/lgz+pUA2SbVfXVpD+VeMWzwT1sBIzAQAoEhAzAQcoEhAxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIxIQEEM="

// Import the filesystem module 

// create an algod v2 client

console.log({ feePayerAddr: recoveredAccount.addr });

console.log("lsig : " + lsig.address());

const skFrom = {};

const generateKeyPairAndMemorize = async () => {
    const { pk, sk } = await dcrypto.vrf_algo_keypair();
    skFrom[Buffer.from(pk).toString('base64')] = sk
    return { pk: Buffer.from(pk).toString('base64'), sk }
}

const generateProofFromSeedAndSk = async ({ blockSeed, sk }) => {

    //const hashedSeed = new Uint8Array(Buffer.from(crypto.createHash('sha256').update(blockSeed).digest('hex'), 'hex'));
    //console.log({ message: Buffer.from(hashedSeed).toString("base64") })
    const proof = await dcrypto.vrf_algo_prove(sk, blockSeed);
    console.log({ proof: Buffer.from(proof).toString('base64') })

    return { proof: Buffer.from(proof).toString('base64') }
}

const generateProofFromSeedAndMemorizedSk = async ({ blockSeed, pk }) => {
    const sk = skFrom[pk];
    return await generateProofFromSeedAndSk({ blockSeed, sk })
}

const sendProofOfRandomTransaction = async ({ blockSeed, blockId, pk }) => {

    // create a transaction
    let sender = lsig.address();
    // let receiver = "<receiver-address>";
    //Reveiver might be anyone, especially the prize winner could receive a random ammount and a proof
    //let receiver = "UFAGBH5BHBAKDSSSBKP6LAZ7VFIA3ETNK7LVNEH6KXRRNTYE6WYHTEMEGU";
    receiver = recoveredAccount.addr;
    let amount = 0;
    let closeToRemaninder = undefined;
    const { proof } = await generateProofFromSeedAndMemorizedSk({ blockSeed, pk })
    //Derrive a random number from the first byte of the proof
    //The smart contract will check that it is indeed the first byte
    //And it will check that the proof is indeed correct by vrf_verify

    const randNumber = Uint8Array.from(Buffer.from(proof, 'base64'))[0]
    //const randNumberStr = String(randNumber).padStart(3, '0');
    const randNumberStr = String(randNumber);
    console.log({ randNumberStr, randNumber });
    //let noteText = `{"proof": "` + proof + `", "publicKey": "` + pk + `", "randNumber": ` + randNumberStr + `, "blockSeedTakenFromBlockWithId": ` + blockId + `}`
    let noteText = JSON.stringify({ "blockSeedTakenFromBlockWithId": blockId, "publicKey": pk, "randNumber": parseInt(randNumberStr, 10), "proof": proof, "domain": "https://rand.algotool.app/", userId: "anonymous" })
    console.log({ noteText })
    const enc = new TextEncoder();
    const note = enc.encode(noteText);

    console.log("Trying to connect to algod")
    let params = await algodclient.getTransactionParams().do();
    console.log({ params })
    params.lastRound = params.lastRound - 500;
    // To be able to see previous Blocks in AVM v7 rounds range has to be smaller
    // Maybe 50 is too much. But just in case of bigger safespace between block commitment and random generation.

    let txn1 = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, closeToRemaninder, note, { ...params, fee: 0, flatFee: true })
    let txn2 = algosdk.makePaymentTxnWithSuggestedParams(recoveredAccount.addr, recoveredAccount.addr, amount, closeToRemaninder, note, { ...params, flatFee: true, fee: 2000 })
    // Create the LogicSigTransaction with contract account LogicSigAccount
    // Combine transactions

    let txns = [txn1, txn2]

    let txgroup = algosdk.assignGroupID(txns);
    console.log(txn1, txn2)

    let signedTx1 = algosdk.signLogicSigTransactionObject(txn1, lsig);
    let signedTx2 = txn2.signTxn(recoveredAccount.sk)

    let signed = []
    signed.push(signedTx1.blob)
    signed.push(signedTx2)
    console.log({ signed })
    // send raw LogicSigTransaction to network
    // fs.writeFileSync("simple.stxn", rawSignedTxn.blob);

    let tx = (await algodclient.sendRawTransaction(signed).do());
    console.log("Transaction : " + tx.txId);

    const confirmedTxn = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
    //Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    console.log(lsig.address())
    //algosdk.makeLogicSigAccountTransactionSigner
    delete skFrom[pk]
    return {
        proof, randNumber: randNumber, txId: tx.txId, txUrl: "https://testnet.algoexplorer.io/tx/" + tx.txId, pk
    }
}

module.exports = { generateKeyPairAndMemorize, sendProofOfRandomTransaction, algodclient }
