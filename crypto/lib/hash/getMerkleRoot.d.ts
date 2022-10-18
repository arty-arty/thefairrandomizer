/**
 * @function
 * Returns the Merkle root of a tree.
 * If Uint8Array items' length is 64, even after serializer,
 * then we assume that it is a hash.
 *
 * @param tree: The tree.
 * @param serializer: Converts leaves into Uint8Array.
 *
 * @returns Promise<Uint8Array>
 */
declare const getMerkleRoot: <T>(tree: (Uint8Array | T)[], serializer?: ((i: T) => Uint8Array) | undefined) => Promise<Uint8Array>;
export default getMerkleRoot;
//# sourceMappingURL=getMerkleRoot.d.ts.map