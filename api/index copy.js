const dcrypto = require("@deliberative/crypto");

const main = async () => {

    const { pk, sk } = await dcrypto.vrf_algo_keypair();
    const { pk: pk1, sk: sk1 } = await dcrypto.vrf_algo_keypair();

    console.log({ pk, sk })
    console.log({ pk1, sk1 })

    const hashedSeed = await dcrypto.randomBytes(32);
    const proof = await dcrypto.vrf_algo_prove(sk, hashedSeed);
    console.log({ proof })

    const hash = await dcrypto.vrf_algo_proof_to_hash(proof);
    console.log({ hash })

    const verifyOut = await dcrypto.vrf_algo_verify(pk, proof, hashedSeed).catch(err => -1)
    if (verifyOut !== -1) console.log(verifyOut)

    const verified = !(verifyOut === -1)
    console.log({ verified })
}
main()

