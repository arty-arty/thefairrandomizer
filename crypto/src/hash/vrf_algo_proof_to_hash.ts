import dcryptoMemory from "./memory";
import memoryLenToPages from "../utils/memoryLenToPages";
import { crypto_hash_sha512_BYTES } from "../utils/interfaces";

import dcryptoMethodsModule from "../c/build/dcryptoMethodsModule";

import type { DCryptoMethodsModule } from "../c/build/dcryptoMethodsModule";

const memory = (arrayLen: number): WebAssembly.Memory => {
    const memoryLen = arrayLen;
    const pages = memoryLenToPages(memoryLen);

    return new WebAssembly.Memory({ initial: pages, maximum: pages });
};

const vrf_algo_proof_to_hash = async (
    proof: Uint8Array,
    module?: DCryptoMethodsModule,
): Promise<Uint8Array> => {
    const proofLen = proof.length;
    const hashLen = 64;

    const wasmMemory = module
        ? module.wasmMemory
        : memory(proofLen + hashLen);

    const dcryptoModule = module || (await dcryptoMethodsModule({ wasmMemory }));

    const ptr1 = dcryptoModule._malloc(proofLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr1 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr1,
        proofLen * Uint8Array.BYTES_PER_ELEMENT,
    );
    arr1.set([...proof]);

    const ptr2 = dcryptoModule._malloc(hashLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr2 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr2,
        hashLen * Uint8Array.BYTES_PER_ELEMENT,
    );

    const result = dcryptoModule._vrf_algo_proof_to_hash(
        arr2.byteOffset,
        arr1.byteOffset,
    );

    const hash = new Uint8Array([...arr2]);

    dcryptoModule._free(ptr1);
    dcryptoModule._free(ptr2);

    if (result === 0) return hash;

    throw new Error("Could not convert proof to hash.");
};

export default vrf_algo_proof_to_hash;