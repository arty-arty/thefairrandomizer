import type { DCryptoMethodsModule } from "../c/build/dcryptoMethodsModule";
/**
 * @function
 * Returns a Uint8Array of cryptographically random bytes.
 *
 * @param n: The length of the array.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Uint8Array
 */
declare const randomBytes: (n: number, module?: DCryptoMethodsModule) => Promise<Uint8Array>;
export default randomBytes;
//# sourceMappingURL=randomBytes.d.ts.map