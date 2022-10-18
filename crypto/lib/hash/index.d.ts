declare const _default: {
    sha512: (data: Uint8Array, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    vrf_algo_prove: (sk: Uint8Array, hashedSeed: Uint8Array, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    vrf_algo_verify: (pk: Uint8Array, proof: Uint8Array, hashedSeed: Uint8Array, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    vrf_algo_keypair: (module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    vrf_algo_proof_to_hash: (proof: Uint8Array, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    getMerkleRoot: <T>(tree: (Uint8Array | T)[], serializer?: ((i: T) => Uint8Array) | undefined) => Promise<Uint8Array>;
    getMerkleProof: <T_1>(tree: (Uint8Array | T_1)[], element: Uint8Array | T_1, serializer?: ((i: T_1) => Uint8Array) | undefined) => Promise<Uint8Array>;
    verifyMerkleProof: (hash: Uint8Array, root: Uint8Array, proof: Uint8Array) => Promise<boolean>;
    memory: {
        sha512Memory: (arrayLen: number) => WebAssembly.Memory;
        argon2Memory: (mnemonicLen: number) => WebAssembly.Memory;
        getMerkleRootMemory: (leavesLen: number) => WebAssembly.Memory;
        getMerkleProofMemory: (leavesLen: number) => WebAssembly.Memory;
        verifyMerkleProofMemory: (proofLen: number) => WebAssembly.Memory;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map