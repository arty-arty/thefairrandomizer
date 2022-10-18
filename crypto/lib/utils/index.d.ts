declare const _default: {
    interfaces: {
        crypto_hash_sha512_BYTES: number;
        crypto_secretbox_KEYBYTES: number;
        crypto_secretbox_NONCEBYTES: number;
        crypto_box_poly1305_AUTHTAGBYTES: number;
        crypto_box_x25519_PUBLICKEYBYTES: number;
        crypto_box_x25519_SECRETKEYBYTES: number;
        crypto_box_x25519_NONCEBYTES: number;
        crypto_kx_SESSIONKEYBYTES: number;
        crypto_sign_ed25519_BYTES: number;
        crypto_sign_ed25519_SEEDBYTES: number;
        crypto_sign_ed25519_PUBLICKEYBYTES: number;
        crypto_sign_ed25519_SECRETKEYBYTES: number;
        crypto_pwhash_argon2id_SALTBYTES: number;
        getEncryptedLen: (dataLen: number) => number;
        getDecryptedLen: (encryptedLen: number) => number;
        getForwardSecretBoxEncryptedLen: (dataLen: number) => number;
        getForwardSecretBoxDecryptedLen: (encryptedLen: number) => number;
    };
    isUint8Array: (item: unknown) => item is Uint8Array;
    needleInHaystack: <T>(needles: (Uint8Array | T)[], haystack: (Uint8Array | T)[], serializer?: ((i: T) => Uint8Array) | undefined, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<number[]>;
    arrayRandomShuffle: <T_1>(array: T_1[]) => Promise<T_1[]>;
    arrayRandomSubset: <T_2>(array: T_2[], elements: number) => Promise<T_2[]>;
    randomBytes: (n: number, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<Uint8Array>;
    randomNumberInRange: (min: number, max: number, module?: import("../c/build/dcryptoMethodsModule").DCryptoMethodsModule | undefined) => Promise<number>;
    memory: {
        needleInHaystack: (arrayLen: number, itemsArrayLen: number) => WebAssembly.Memory;
        randomBytes: (bytes: number) => WebAssembly.Memory;
        randomNumberInRange: (min: number, max: number) => WebAssembly.Memory;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map