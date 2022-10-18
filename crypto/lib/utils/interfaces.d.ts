export interface SignKeyPair {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
}
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
export declare const crypto_hash_sha512_BYTES: number;
export declare const crypto_secretbox_KEYBYTES: number;
export declare const crypto_secretbox_NONCEBYTES: number;
export declare const crypto_box_poly1305_AUTHTAGBYTES: number;
export declare const crypto_box_x25519_PUBLICKEYBYTES: number;
export declare const crypto_box_x25519_SECRETKEYBYTES: number;
export declare const crypto_box_x25519_NONCEBYTES: number;
export declare const crypto_kx_SESSIONKEYBYTES: number;
export declare const crypto_sign_ed25519_BYTES: number;
export declare const crypto_sign_ed25519_SEEDBYTES: number;
export declare const crypto_sign_ed25519_PUBLICKEYBYTES: number;
export declare const crypto_sign_ed25519_SECRETKEYBYTES: number;
export declare const crypto_pwhash_argon2id_SALTBYTES: number;
export declare const getEncryptedLen: (dataLen: number) => number;
export declare const getDecryptedLen: (encryptedLen: number) => number;
export declare const getForwardSecretBoxEncryptedLen: (dataLen: number) => number;
export declare const getForwardSecretBoxDecryptedLen: (encryptedLen: number) => number;
declare const _default: {
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
export default _default;
//# sourceMappingURL=interfaces.d.ts.map