/**
 * Verifies that the hash was indeed included in the calculation of the Merkle root.
 * @param hash: The hash of the base element in question.
 * @param root: The Merkle root.
 * @param proof: The first element is the first leave that was added for the calculation etc. The last
 * byte is either 0 or 1, indicating whether it is to the left or to the right in the tree.
 */
declare const verifyMerkleProof: (hash: Uint8Array, root: Uint8Array, proof: Uint8Array) => Promise<boolean>;
export default verifyMerkleProof;
//# sourceMappingURL=verifyMerkleProof.d.ts.map