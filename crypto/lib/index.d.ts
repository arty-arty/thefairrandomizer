/// <reference types="emscripten" />
import type { SignKeyPair } from "./utils/interfaces";
import type { DCryptoMethodsModule } from "./c/build/dcryptoMethodsModule";
export interface DeliberativeCrypto {
    /**
     * Generate a new Ed25519 keypair
     */
    keyPair: (module?: DCryptoMethodsModule) => Promise<SignKeyPair>;
    /**
     * Generate a new Ed25519 keypair from a given seed
     */
    keyPairFromSeed: (seed: Uint8Array, module?: DCryptoMethodsModule) => Promise<SignKeyPair>;
    /**
     * Generate a new Ed25519 keypair from an Ed25519 secret key
     */
    keyPairFromSecretKey: (secretKey: Uint8Array, module?: DCryptoMethodsModule) => Promise<SignKeyPair>;
    /**
     * Generates a digital signature for the message using the private key.
     */
    sign: (message: Uint8Array, secretKey: Uint8Array, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    /**
     * Verifies that the digital signature was indeed generated from private key
     * corresponding to the public key
     */
    verify: (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array, module?: DCryptoMethodsModule) => Promise<boolean>;
    /**
     * Encrypts end-to-end with a throwaway keyPair.
     */
    encryptForwardSecrecy: (message: Uint8Array, publicKey: Uint8Array, additionalData: Uint8Array, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    /**
     * Decrypts end-to-end with the public key of a throwaway keyPair.
     */
    decryptForwardSecrecy: (encrypted: Uint8Array, secretKey: Uint8Array, additionalData: Uint8Array, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    /**
     * Generates a 12-natural-language-word representation of an Ed25519 private key.
     */
    generateMnemonic: (strength?: 128 | 160 | 192 | 224 | 256) => Promise<string>;
    /**
     * Validates that a natural-language-word representation of an Ed25519 private key is accurate
     */
    validateMnemonic: (mnemonic: string) => Promise<boolean>;
    /**
     * Generates an Ed25519 keypair from a 12-natural-language-word mnemonic.
     */
    keyPairFromMnemonic: (mnemonic: string, password?: string) => Promise<SignKeyPair>;
    /**
     * Encrypts with symmetric encryption key
     */
    encryptSymmetricKey: (message: Uint8Array, key: Uint8Array, additionalData: Uint8Array, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    /**
     * Decrypts with symmetric encryption key
     */
    decryptSymmetricKey: (encrypted: Uint8Array, key: Uint8Array, additionalData: Uint8Array, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    sha512: (data: Uint8Array, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    getMerkleRoot: <T>(tree: (T | Uint8Array)[], serializer?: (i: T) => Uint8Array) => Promise<Uint8Array>;
    getMerkleProof: <T>(tree: (T | Uint8Array)[], element: T | Uint8Array, serializer?: (i: T) => Uint8Array) => Promise<Uint8Array>;
    verifyMerkleProof: (hash: Uint8Array, root: Uint8Array, leaves: Uint8Array) => Promise<boolean>;
    splitSecret: (secret: Uint8Array, numberOfShares: number, threshold: number, module?: DCryptoMethodsModule) => Promise<Uint8Array[]>;
    restoreSecret: (shares: Uint8Array[], module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    constants: {
        crypto_hash_sha512_BYTES: number;
        crypto_box_poly1305_AUTHTAGBYTES: number;
        crypto_box_x25519_PUBLICKEYBYTES: number;
        crypto_box_x25519_SECRETKEYBYTES: number;
        crypto_box_x25519_NONCEBYTES: number;
        crypto_kx_SESSIONKEYBYTES: number;
        crypto_sign_ed25519_BYTES: number;
        crypto_sign_ed25519_SEEDBYTES: number;
        crypto_sign_ed25519_PUBLICKEYBYTES: number;
        crypto_sign_ed25519_SECRETKEYBYTES: number;
    };
    getSymmetricSecretBoxEncryptedLen: (messageLen: number) => number;
    getSymmetricSecretBoxDecryptedLen: (encryptedLen: number) => number;
    getForwardSecretBoxEncryptedLen: (messageLen: number) => number;
    getForwardSecretBoxDecryptedLen: (encryptedLen: number) => number;
    needleInHaystack: <T>(array: (T | Uint8Array)[], items: (T | Uint8Array)[], serializer?: (i: T) => Uint8Array, module?: DCryptoMethodsModule) => Promise<number[]>;
    randomBytes: (n: number, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
    randomNumberInRange: (min: number, max: number, module?: DCryptoMethodsModule) => Promise<number>;
    arrayRandomShuffle: <T>(array: T[]) => Promise<T[]>;
    arrayRandomSubset: <T>(array: T[], elements: number) => Promise<T[]>;
    loadModule: EmscriptenModuleFactory<DCryptoMethodsModule>;
    loadWasmMemory: {
        newKeyPair: () => WebAssembly.Memory;
        keyPairFromSeed: () => WebAssembly.Memory;
        keyPairFromSecretKey: () => WebAssembly.Memory;
        sign: (messageLen: number) => WebAssembly.Memory;
        verify: (messageLen: number) => WebAssembly.Memory;
        encryptForwardSecret: (messageLen: number, additionalDataLen: number) => WebAssembly.Memory;
        decryptForwardSecret: (encryptedLen: number, additionalDataLen: number) => WebAssembly.Memory;
        encryptSymmetricKey: (messageLen: number, additionalDataLen: number) => WebAssembly.Memory;
        decryptSymmetricKey: (encryptedLen: number, additionalDataLen: number) => WebAssembly.Memory;
        sha512: (arrayLen: number) => WebAssembly.Memory;
        getMerkleRoot: (leavesLen: number) => WebAssembly.Memory;
        getMerkleProof: (leavesLen: number) => WebAssembly.Memory;
        verifyMerkleProof: (proofLen: number) => WebAssembly.Memory;
        splitSecret: (secretLen: number, sharesLen: number, threshold: number) => WebAssembly.Memory;
        restoreSecret: (secretLen: number, sharesLen: number) => WebAssembly.Memory;
        needleInHaystack: (arrayLen: number, itemsArrayLen: number) => WebAssembly.Memory;
        randomBytes: (bytes: number) => WebAssembly.Memory;
        randomNumberInRange: (min: number, max: number) => WebAssembly.Memory;
    };
}
declare const dcrypto: DeliberativeCrypto;
export default dcrypto;
//# sourceMappingURL=index.d.ts.map