declare const _default: {
    sha512Memory: (arrayLen: number) => WebAssembly.Memory;
    argon2Memory: (mnemonicLen: number) => WebAssembly.Memory;
    getMerkleRootMemory: (leavesLen: number) => WebAssembly.Memory;
    getMerkleProofMemory: (leavesLen: number) => WebAssembly.Memory;
    verifyMerkleProofMemory: (proofLen: number) => WebAssembly.Memory;
};
export default _default;
//# sourceMappingURL=memory.d.ts.map