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

const vrf_algo_verify = async (
    pk: Uint8Array,
    proof: Uint8Array,
    hashedSeed: Uint8Array,
    module?: DCryptoMethodsModule,
): Promise<Uint8Array> => {

    const pkLen = pk.length;
    const proofLen = proof.length;
    const hashedSeedLen = hashedSeed.length;
    const verifyOutLen = 64;

    const wasmMemory = module
        ? module.wasmMemory
        : memory(proofLen + hashedSeedLen + verifyOutLen + pkLen);

    const dcryptoModule = module || (await dcryptoMethodsModule({ wasmMemory }));

    const ptr1 = dcryptoModule._malloc(verifyOutLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr1 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr1,
        verifyOutLen * Uint8Array.BYTES_PER_ELEMENT,
    );

    const ptr2 = dcryptoModule._malloc(pkLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr2 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr2,
        pkLen * Uint8Array.BYTES_PER_ELEMENT,
    );
    arr2.set([...pk]);

    const ptr3 = dcryptoModule._malloc(proofLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr3 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr3,
        proofLen * Uint8Array.BYTES_PER_ELEMENT,
    );
    arr3.set([...proof]);

    const ptr4 = dcryptoModule._malloc(hashedSeedLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr4 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr4,
        hashedSeedLen * Uint8Array.BYTES_PER_ELEMENT,
    );
    arr4.set([...hashedSeed]);

    const result = dcryptoModule._vrf_algo_verify(
        arr1.byteOffset,
        arr2.byteOffset,
        arr3.byteOffset,
        arr4.byteOffset,
        32
    );

    const verifyOut = new Uint8Array([...arr1]);

    dcryptoModule._free(ptr1);
    dcryptoModule._free(ptr2);
    dcryptoModule._free(ptr3);
    dcryptoModule._free(ptr4);

    if (result === 0) return verifyOut;

    throw new Error("Could not verify the proof.");
};

export default vrf_algo_verify;