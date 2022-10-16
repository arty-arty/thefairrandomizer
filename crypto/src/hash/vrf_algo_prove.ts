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

const vrf_algo_prove = async (
    sk: Uint8Array,
    hashedSeed: Uint8Array,
    module?: DCryptoMethodsModule,
): Promise<Uint8Array> => {
    const proofLen = 80;
    const skLen = sk.length;
    const hashedSeedLen = hashedSeed.length;

    const wasmMemory = module
        ? module.wasmMemory
        : memory(proofLen + skLen + hashedSeedLen);

    const dcryptoModule = module || (await dcryptoMethodsModule({ wasmMemory }));

    const ptr1 = dcryptoModule._malloc(proofLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr1 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr1,
        proofLen * Uint8Array.BYTES_PER_ELEMENT,
    );

    const ptr2 = dcryptoModule._malloc(skLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr2 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr2,
        skLen * Uint8Array.BYTES_PER_ELEMENT,
    );
    arr2.set([...sk]);

    const ptr3 = dcryptoModule._malloc(hashedSeedLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr3 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr3,
        hashedSeedLen * Uint8Array.BYTES_PER_ELEMENT,
    );
    arr3.set([...hashedSeed]);


    const result = dcryptoModule._vrf_algo_prove(
        arr1.byteOffset,
        arr2.byteOffset,
        arr3.byteOffset,
        32
    );

    const theproof = new Uint8Array([...arr1]);

    dcryptoModule._free(ptr1);
    dcryptoModule._free(ptr2);
    dcryptoModule._free(ptr3);

    if (result === 0) return theproof;

    throw new Error("Could not prove the vrf.");
};

export default vrf_algo_prove;