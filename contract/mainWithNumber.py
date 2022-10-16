import base64

from algosdk.future import transaction
from algosdk import mnemonic
from algosdk.v2client import algod
from pyteal import *
from pytealutils.strings import atoi

sender_mnemonic = "paste your own mnemonic here"
receiver_public_key = "UFAGBH5BHBAKDSSSBKP6LAZ7VFIA3ETNK7LVNEH6KXRRNTYE6WYHTEMEGU"
fee_provider_public_key = "I4P7CYNN2S24FJ546IS76M2RJDIAAHJ6CHF7MGH3RBJAPFSDZNNZDRGRSE"
#algod_address = "http://localhost:4001"
#algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

algod_address = "https://node.testnet.algoexplorerapi.io"
algod_token = ""


def compile_smart_signature(client, source_code):
    compile_response = client.compile(source_code)
    return compile_response['result'], compile_response['hash']


def wait_for_confirmation(client, transaction_id, timeout):
    start_round = client.status()["last-round"] + 1
    current_round = start_round

    while current_round < start_round + timeout:
        try:
            pending_txn = client.pending_transaction_info(transaction_id)
        except Exception:
            return
        if pending_txn.get("confirmed-round", 0) > 0:
            return pending_txn
        elif pending_txn["pool-error"]:
            raise Exception('pool error: {}'.format(pending_txn["pool-error"]))
        client.status_after_block(current_round)
        current_round += 1
    raise Exception(
        'pending tx not found in timeout rounds, timeout value = {}'.format(timeout))


def verified_random_announcer(benefactor, feeprovider):
    #fee_cond = Txn.fee() <= Global.min_txn_fee()
    fee_cond = Gtxn[0].fee() == Int(0)
    safety_cond = And(
        Global.group_size() == Int(2),
        Gtxn[0].type_enum() == TxnType.Payment,
        Gtxn[0].close_remainder_to() == Global.zero_address(),
        Gtxn[0].asset_close_to() == Global.zero_address(),
        Gtxn[0].rekey_to() == Global.zero_address(),
        Gtxn[0].amount() == Int(0),
        Gtxn[1].type_enum() == TxnType.Payment,
        Gtxn[1].close_remainder_to() == Global.zero_address(),
        Gtxn[1].asset_close_to() == Global.zero_address(),
        Gtxn[1].rekey_to() == Global.zero_address(),
        Gtxn[1].amount() == Int(0),
    )

    blockSeed = Substring(Txn.note(), Int(15), Int(67))
    message = Sha256(blockSeed)

    proof = Base64Decode.std(Substring(Txn.note(), Int(80), Int(188)))
    randNumber0 = atoi(Substring(Txn.note(), Int(267), Int(270)))
    publicKey = Base64Decode.std(Substring(Txn.note(), Int(205), Int(249)))

    program = And(
        Gtxn[1].sender() == Addr(feeprovider),
        Gtxn[1].receiver() == Addr(feeprovider),
        randNumber0 == GetByte(proof, Int(0)),
        VrfVerify.algorand(message, proof, publicKey).outputReducer(
            lambda x, y: y == Int(1))
    )
    safe_program = And(fee_cond, safety_cond, program)
    return compileTeal(safe_program, Mode.Signature, version=7)


def payment_transaction(creator_mnemonic, amt, rcv, algod_client):
    params = algod_client.suggested_params()
    add = mnemonic.to_public_key(creator_mnemonic)
    key = mnemonic.to_private_key(creator_mnemonic)
    unsigned_txn = transaction.PaymentTxn(
        add, params, rcv, amt, note="Yeah".encode())
    signed = unsigned_txn.sign(key)
    txid = algod_client.send_transaction(signed)
    pmtx = wait_for_confirmation(algod_client, txid, 5)
    return pmtx


#{"blockSeed": "3P5WUDZKFHH7BLSYJYZUGJ5KLCFO72M7733MVWAE5JXD7N7MY54A", "proof": "bICa1Ajt27oTDzMf5O02vdfuYNvfBBAsrqr8f05jh0vuqTfHy7yV+82QRCw52erX6rlhzZ6Pdv8XyhWZTvOG4eksdNN6QhAYZyJo408wYgs=", "publicKey": "H/IBtJ8dSMRjYo344o/gtfiZToq9+cfPOHtCG6dfZ/U=", "randNumber": "087"}


def lsig_payment_txn(escrowProg, escrow_address, amt, rcv, algod_client):
    params = algod_client.suggested_params()
    unsigned_txn = transaction.PaymentTxn(
        escrow_address, params, rcv, amt, note='''{"blockSeed": "3P5WUDZKFHH7BLSYJYZUGJ5KLCFO72M7733MVWAE5JXD7N7MY54A", "proof": "bICa1Ajt27oTDzMf5O02vdfuYNvfBBAsrqr8f05jh0vuqTfHy7yV+82QRCw52erX6rlhzZ6Pdv8XyhWZTvOG4eksdNN6QhAYZyJo408wYgs=", "publicKey": "H/IBtJ8dSMRjYo344o/gtfiZToq9+cfPOHtCG6dfZ/U="}'''.encode())
    encodedProg = escrowProg.encode()
    program = base64.decodebytes(encodedProg)
    lsig = transaction.LogicSig(program)
    stxn = transaction.LogicSigTransaction(unsigned_txn, lsig)
    tx_id = algod_client.send_transaction(stxn)
    pmtx = wait_for_confirmation(algod_client, tx_id, 10)
    return pmtx


def main():
    algod_client = algod.AlgodClient(algod_token, algod_address)

    print("--------------------------------------------")
    print("Compiling Donation Smart Signature ...")
    stateless_program_teal = verified_random_announcer(
        receiver_public_key, fee_provider_public_key)
    escrow_result, escrow_address = compile_smart_signature(
        algod_client, stateless_program_teal)
    print("Program:", escrow_result)
    print("Contract Address:", escrow_address)

    # print("--------------------------------------------")
    #print("Sending Fund to Donation Smart Signature ...")
    #amt = 220000
    #payment_transaction(sender_mnemonic, amt, escrow_address, algod_client)

    # print("--------------------------------------------")
    #print("Withdraw from Donation Smart Signature ...")
    #withdrawal_amt = 0
    # lsig_payment_txn(escrow_result, escrow_address,
    #                withdrawal_amt, receiver_public_key, algod_client)


if __name__ == "__main__":
    main()
