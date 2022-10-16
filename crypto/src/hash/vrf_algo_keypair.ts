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

const vrf_algo_keypair = async (
    module?: DCryptoMethodsModule,
): Promise<Uint8Array> => {
    const pkLen = 32;
    const skLen = 64;

    const wasmMemory = module
        ? module.wasmMemory
        : memory(pkLen + skLen);

    const dcryptoModule = module || (await dcryptoMethodsModule({ wasmMemory }));

    const ptr1 = dcryptoModule._malloc(pkLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr1 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr1,
        pkLen * Uint8Array.BYTES_PER_ELEMENT,
    );

    const ptr2 = dcryptoModule._malloc(skLen * Uint8Array.BYTES_PER_ELEMENT);
    const arr2 = new Uint8Array(
        dcryptoModule.HEAP8.buffer,
        ptr2,
        skLen * Uint8Array.BYTES_PER_ELEMENT,
    );

    const result = dcryptoModule._vrf_algo_keypair(
        arr1.byteOffset,
        arr2.byteOffset,
    );

    const pair = { pk: new Uint8Array([...arr1]), sk: new Uint8Array([...arr2]) };

    dcryptoModule._free(ptr1);
    dcryptoModule._free(ptr2);

    if (result === 0) return pair;

    throw new Error("Could not generate (pk,sk) pair.");
};

export default vrf_algo_keypair;