const fs = require('fs');
const crypto = require("crypto")
const dcrypto = require("@deliberative/crypto");
const algosdk = require("algosdk")

const token = "11e4dcfb445a8c7e8380848747f18afcd5d84ccb395e003e5b72127ca5e9a259";
const server = "http:/ec2-3-18-80-65.us-east-2.compute.amazonaws.com";
const port = 8080;
let algodclient = new algosdk.Algodv2(token, server, port);

const lsigProgram = "ByACAAEmASCvH0TTSdr5SmUo5gQtWhkAxQC+PHS8DNZqPRwzwm8ZPzMAASISMgSBAhIzABAjEhAzAAkyAxIQMwAVMgMSEDMAIDIDEhAzAAgiEhAzARAjEhAzAQkyAxIQMwEVMgMSEDMBIDIDEhAzAQgiEhAQMwEAKBIzAQcoEhAxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIxIQEEM="
const lsig = new algosdk.LogicSigAccount(new Uint8Array(Buffer.from(lsigProgram, "base64")))

const feePayerMnemonic = "embrace auction walnut venture give sustain asthma cheese choose recycle glory vehicle quit vehicle earth north lecture trumpet cake usage estate aim smart absorb midnight"
const recoveredAccount = algosdk.mnemonicToSecretKey(feePayerMnemonic);
// var lsigProgram = "ByABATEBMgAOMRAiEjEJMgMSEDEVMgMSEDEgMgMSEDIEIhIQMQiBABIQEDEHgCChQGCfoThAocpSCp/lgz+pUA2SbVfXVpD+VeMWzwT1sBIxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIhIQEEM=";
// lsigProgram = "ByABATEBMgAOMRAiEjEJMgMSEDEVMgMSEDEgMgMSEDEIgQASEBAxB4AgoUBgn6E4QKHKUgqf5YM/qVANkm1X11aQ/lXjFs8E9bASMQVXDzQBMQVXUGxeATEFV80sXgHQADUBNQA0ASISEBBD"
// lsigProgram = "ByACAAExASISMRAjEjEJMgMSEDEVMgMSEDEgMgMSEDEIIhIQEDEHgCChQGCfoThAocpSCp/lgz+pUA2SbVfXVpD+VeMWzwT1sBIxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIxIQEEM="
// lsigProgram = "ByACAAEmASCvH0TTSdr5SmUo5gQtWhkAxQC+PHS8DNZqPRwzwm8ZPzMAASISMgSBAhIzABAjEhAzAAkyAxIQMwAVMgMSEDMAIDIDEhAzAAgiEhAzARAjEhAzAQkyAxIQMwEVMgMSEDMBIDIDEhAzAQgiEhAQMwAHgCChQGCfoThAocpSCp/lgz+pUA2SbVfXVpD+VeMWzwT1sBIzAQAoEhAzAQcoEhAxBVcPNAExBVdQbF4BMQVXzSxeAdAANQE1ADQBIxIQEEM="

// Import the filesystem module 

// create an algod v2 client

console.log({ feePayerAddr: recoveredAccount.addr });

console.log("lsig : " + lsig.address());

const main = async () => {

    // create a transaction
    let sender = lsig.address();
    // let receiver = "<receiver-address>";
    let receiver = "UFAGBH5BHBAKDSSSBKP6LAZ7VFIA3ETNK7LVNEH6KXRRNTYE6WYHTEMEGU";
    let amount = 0;
    let closeToRemaninder = undefined;
    let noteText = `{"blockSeed": "3P5WUDZKFHH7BLSYJYZUGJ5KLCFO72M7733MVWAE5JXD7N7MY54A", "proof": "bICa1Ajt27oTDzMf5O02vdfuYNvfBBAsrqr8f05jh0vuqTfHy7yV+82QRCw52erX6rlhzZ6Pdv8XyhWZTvOG4eksdNN6QhAYZyJo408wYgs=", "publicKey": "H/IBtJ8dSMRjYo344o/gtfiZToq9+cfPOHtCG6dfZ/U="}`
    const enc = new TextEncoder();
    const note = enc.encode(noteText);

    console.log("Trying to connect to algod")
    let params = await algodclient.getTransactionParams().do();
    console.log({ params })
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
}
main()