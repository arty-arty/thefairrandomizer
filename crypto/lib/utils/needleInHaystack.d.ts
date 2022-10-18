import type { DCryptoMethodsModule } from "../c/build/dcryptoMethodsModule";
/**
 * @function
 * Returns an array of indexes of items in an array.
 * If Uint8Array items' length is 64, even after serializer,
 * then we assume that it is a hash.
 *
 * @param needles: The subset array of items.
 * @param haystack: The superset array.
 * @param serializer: Converts item to Uint8Array.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns Promise<number[]>
 */
declare const needleInHaystack: <T>(needles: (Uint8Array | T)[], haystack: (Uint8Array | T)[], serializer?: ((i: T) => Uint8Array) | undefined, module?: DCryptoMethodsModule) => Promise<number[]>;
export default needleInHaystack;
//# sourceMappingURL=needleInHaystack.d.ts.map