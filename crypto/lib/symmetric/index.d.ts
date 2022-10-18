declare const _default: {
    encrypt: (message: Uint8Array, key: Uint8Array, additionalData: Uint8Array, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    decrypt: (encrypted: Uint8Array, key: Uint8Array, additionalData: Uint8Array, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    memory: {
        encryptMemory: (messageLen: number, additionalDataLen: number) => WebAssembly.Memory;
        decryptMemory: (encryptedLen: number, additionalDataLen: number) => WebAssembly.Memory;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map