/**
 * @function
 * Returns the Merkle proof of an element of a tree.
 * Can be used as a receipt of a transaction etc.
 *
 * @param tree: The tree.
 * @param element: The element.
 * @param serializer: Converts leaves into Uint8Array.
 *
 * @returns Promise<Uint8Array>
 */
declare const getMerkleProof: <T>(tree: (Uint8Array | T)[], element: Uint8Array | T, serializer?: ((i: T) => Uint8Array) | undefined) => Promise<Uint8Array>;
export default getMerkleProof;
//# sourceMappingURL=getMerkleProof.d.ts.map