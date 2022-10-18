import type { DCryptoMethodsModule } from "../c/build/dcryptoMethodsModule";
/**
 * @function
 * Returns a cryptographically random number between min and max.
 *
 * @param min: The minimum number.
 * @param max: The maximum number.
 * @param module: In case we want to cache the WASM loading.
 *
 * @returns number
 */
declare const randomNumberInRange: (min: number, max: number, module?: DCryptoMethodsModule) => Promise<number>;
export default randomNumberInRange;
//# sourceMappingURL=randomNumberInRange.d.ts.map