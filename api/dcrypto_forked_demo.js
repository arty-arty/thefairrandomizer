const dcrypto = require("@deliberative/crypto");

const main = async () => {

    const { pk, sk } = await dcrypto.vrf_algo_keypair();
    const { pk: pk1, sk: sk1 } = await dcrypto.vrf_algo_keypair();

    console.log({ pk: Buffer.from(pk).toString('base64'), sk: Buffer.from(sk).toString('base64') })
    //console.log({ pk1, sk1 })

    const hashedSeed = await dcrypto.randomBytes(32);
    console.log({ message: Buffer.from(hashedSeed).toString("base64") })
    const proof = await dcrypto.vrf_algo_prove(sk, hashedSeed);
    console.log({ proof: Buffer.from(proof).toString('base64') })

    const hash = await dcrypto.vrf_algo_proof_to_hash(proof);
    console.log({ hash: Buffer.from(hash).toString('base64') })

    const verifyOut = await dcrypto.vrf_algo_verify(pk, proof, hashedSeed).catch(err => -1)
    if (verifyOut !== -1) console.log(verifyOut)

    const verified = !(verifyOut === -1)
    console.log({ verified })
}
main()

//message, proof, pk
// {
//     pk: 'GR+ABPqDtV8+LZKRtIkt/npzF/UUg1FEKgslxJ3cYDc=',
//         sk: 'Gomtb7XvRwS4p9TbKvVfno8YRaPltbFDcNAzOX1NamQZH4AE+oO1Xz4tkpG0iS3+enMX9RSDUUQqCyXEndxgNw=='
// }