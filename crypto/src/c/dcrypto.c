// Copyright (C) 2022 Deliberative Technologies P.C.
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// 	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <math.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#include "../../libsodium/src/libsodium/randombytes/randombytes.c"
#include "../../libsodium/src/libsodium/sodium/codecs.c"
#include "../../libsodium/src/libsodium/sodium/core.c"
#include "../../libsodium/src/libsodium/sodium/utils.c"

// SHA512
#include "../../libsodium/src/libsodium/crypto_hash/sha512/cp/hash_sha512_cp.c"

// Argon2
#include "../../libsodium/src/libsodium/crypto_pwhash/argon2/argon2-core.c"
#include "../../libsodium/src/libsodium/crypto_pwhash/argon2/argon2-encoding.c"
#include "../../libsodium/src/libsodium/crypto_pwhash/argon2/argon2-fill-block-ref.c"
#include "../../libsodium/src/libsodium/crypto_pwhash/argon2/argon2.c"
#include "../../libsodium/src/libsodium/crypto_pwhash/argon2/blake2b-long.c"
#include "../../libsodium/src/libsodium/crypto_pwhash/argon2/pwhash_argon2id.c"

// Ed25519
#include "../../libsodium/src/libsodium/crypto_core/ed25519/ref10/ed25519_ref10.c"
#include "../../libsodium/src/libsodium/crypto_sign/ed25519/ref10/keypair.c"
#include "../../libsodium/src/libsodium/crypto_sign/ed25519/ref10/open.c"
#include "../../libsodium/src/libsodium/crypto_sign/ed25519/ref10/sign.c"
#include "../../libsodium/src/libsodium/crypto_verify/sodium/verify.c"

// AEAD Chacha20Poly1305
#include "../../libsodium/src/libsodium/crypto_aead/chacha20poly1305/sodium/aead_chacha20poly1305.c"
#include "../../libsodium/src/libsodium/crypto_generichash/blake2b/ref/blake2b-compress-ref.c"
#include "../../libsodium/src/libsodium/crypto_generichash/blake2b/ref/blake2b-ref.c"
#include "../../libsodium/src/libsodium/crypto_generichash/blake2b/ref/generichash_blake2b.c"
#include "../../libsodium/src/libsodium/crypto_generichash/crypto_generichash.c"
#include "../../libsodium/src/libsodium/crypto_onetimeauth/poly1305/donna/poly1305_donna.c"
#include "../../libsodium/src/libsodium/crypto_onetimeauth/poly1305/onetimeauth_poly1305.c"
#include "../../libsodium/src/libsodium/crypto_stream/chacha20/ref/chacha20_ref.c"
#include "../../libsodium/src/libsodium/crypto_stream/chacha20/stream_chacha20.c"

// Diffie Hellman
#include "../../libsodium/src/libsodium/crypto_kx/crypto_kx.c"
#include "../../libsodium/src/libsodium/crypto_scalarmult/crypto_scalarmult.c"
#include "../../libsodium/src/libsodium/crypto_scalarmult/curve25519/ref10/x25519_ref10.c"
#include "../../libsodium/src/libsodium/crypto_scalarmult/curve25519/scalarmult_curve25519.c"
#include "../../libsodium/src/libsodium/crypto_scalarmult/ed25519/ref10/scalarmult_ed25519_ref10.c"

#include "./shamir/polynomial.c"

// VRF
#include "../../libsodium/src/libsodium/crypto_vrf/crypto_vrf.c"
#include "../../libsodium/src/libsodium/crypto_vrf/ietfdraft03/convert.c"
#include "../../libsodium/src/libsodium/crypto_vrf/ietfdraft03/keypair.c"
#include "../../libsodium/src/libsodium/crypto_vrf/ietfdraft03/prove.c"
#include "../../libsodium/src/libsodium/crypto_vrf/ietfdraft03/verify.c"
#include "../../libsodium/src/libsodium/crypto_vrf/ietfdraft03/vrf.c"

__attribute__((used)) int
sha512(const int DATA_LEN, const uint8_t data[DATA_LEN],
       uint8_t hash[crypto_hash_sha512_BYTES])
{
  return crypto_hash_sha512(hash, data, DATA_LEN);
}

__attribute__((used)) int
vrf_algo_prove(uint8_t proof[80U],
               uint8_t sk[crypto_sign_ed25519_SECRETKEYBYTES],
               uint8_t hashedSeed[32U], const int DATA_LEN)
{
  return crypto_vrf_prove(proof, sk, hashedSeed, 32);
}

__attribute__((used)) int
vrf_algo_keypair(uint8_t pk[32U],
                 uint8_t sk[crypto_sign_ed25519_SECRETKEYBYTES])
{
  return crypto_vrf_keypair(pk, sk);
}

__attribute__((used)) int
vrf_algo_proof_to_hash(uint8_t randomNumber[64U], uint8_t proof[80U])
{
  return crypto_vrf_proof_to_hash(randomNumber, proof);
}

__attribute__((used)) int
vrf_algo_verify(uint8_t verifyOut[64U], uint8_t pk[32U], uint8_t proof[80U],
                uint8_t hashedSeed[32U], const int DATA_LEN)
{
  return crypto_vrf_verify(verifyOut, pk, proof, hashedSeed, 32);
}

__attribute__((used)) int
argon2(const int MNEMONIC_LEN, uint8_t seed[crypto_sign_ed25519_SEEDBYTES],
       const char mnemonic[MNEMONIC_LEN],
       const uint8_t salt[crypto_pwhash_argon2id_SALTBYTES])
{
  return crypto_pwhash_argon2id(seed, crypto_sign_ed25519_SEEDBYTES, mnemonic,
                                MNEMONIC_LEN, salt,
                                crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE,
                                crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE,
                                crypto_pwhash_argon2id_ALG_ARGON2ID13);
}

__attribute__((used)) int
new_keypair(uint8_t public_key[crypto_sign_ed25519_PUBLICKEYBYTES],
            uint8_t secret_key[crypto_sign_ed25519_SECRETKEYBYTES])
{
  return crypto_sign_ed25519_keypair(public_key, secret_key);
}

__attribute__((used)) int
keypair_from_seed(uint8_t public_key[crypto_sign_ed25519_PUBLICKEYBYTES],
                  uint8_t secret_key[crypto_sign_ed25519_SECRETKEYBYTES],
                  const uint8_t seed[crypto_sign_ed25519_SEEDBYTES])
{
  return crypto_sign_ed25519_seed_keypair(public_key, secret_key, seed);
}

__attribute__((used)) int
keypair_from_secret_key(
    uint8_t public_key[crypto_sign_ed25519_PUBLICKEYBYTES],
    const uint8_t secret_key[crypto_sign_ed25519_SECRETKEYBYTES])
{
  memcpy(public_key, secret_key + crypto_sign_ed25519_SEEDBYTES,
         crypto_sign_ed25519_PUBLICKEYBYTES);

  return 0;
}

__attribute__((used)) int
sign_data(const int DATA_LEN, const uint8_t data[DATA_LEN],
          uint8_t signature[crypto_sign_ed25519_BYTES],
          const uint8_t secret_key[crypto_sign_ed25519_SECRETKEYBYTES])
{
  unsigned long long SIGNATURE_LEN = crypto_sign_ed25519_BYTES;

  return crypto_sign_ed25519_detached(signature, &SIGNATURE_LEN, data, DATA_LEN,
                                      secret_key);
}

__attribute__((used)) int
verify_data(const int DATA_LEN, const uint8_t data[DATA_LEN],
            const uint8_t signature[crypto_sign_ed25519_BYTES],
            const uint8_t public_key[crypto_sign_ed25519_PUBLICKEYBYTES])
{
  return crypto_sign_ed25519_verify_detached(signature, data, DATA_LEN,
                                             public_key);
}

__attribute__((used)) void
calculate_nonce(uint8_t nonce[crypto_aead_chacha20poly1305_ietf_NPUBBYTES])
{
  uint8_t *nonce_random_vector = sodium_malloc(crypto_hash_sha512_BYTES);
  randombytes_buf(nonce_random_vector, crypto_hash_sha512_BYTES);

  uint8_t *nonce_sha512 = malloc(crypto_hash_sha512_BYTES);
  crypto_hash_sha512(nonce_sha512, nonce_random_vector,
                     crypto_hash_sha512_BYTES);
  sodium_free(nonce_random_vector);

  memcpy(nonce, nonce_sha512 + crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
         crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  free(nonce_sha512);
}

/* Returns (nonce || encrypted_data || auth tag) */
__attribute__((used)) int
encrypt_data(
    const int DATA_LEN, const uint8_t data[DATA_LEN],
    const uint8_t key[crypto_kx_SESSIONKEYBYTES], const int ADDITIONAL_DATA_LEN,
    const uint8_t additional_data[ADDITIONAL_DATA_LEN],
    uint8_t encrypted[crypto_aead_chacha20poly1305_ietf_NPUBBYTES + DATA_LEN
                      + crypto_aead_chacha20poly1305_ietf_ABYTES])
{
  unsigned long long CIPHERTEXT_LEN
      = DATA_LEN + crypto_aead_chacha20poly1305_ietf_ABYTES;
  uint8_t *ciphertext = sodium_malloc(CIPHERTEXT_LEN);

  uint8_t *nonce = malloc(crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  calculate_nonce(nonce);

  crypto_aead_chacha20poly1305_ietf_encrypt(
      ciphertext, &CIPHERTEXT_LEN, data, DATA_LEN, additional_data,
      ADDITIONAL_DATA_LEN, NULL, nonce, key);

  memcpy(encrypted, nonce, crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  free(nonce);

  memcpy(encrypted + crypto_aead_chacha20poly1305_ietf_NPUBBYTES, ciphertext,
         CIPHERTEXT_LEN);
  sodium_free(ciphertext);

  return 0;
}

__attribute__((used)) int
decrypt_data(
    const int ENCRYPTED_LEN, const uint8_t encrypted_data[ENCRYPTED_LEN],
    const uint8_t key[crypto_kx_SESSIONKEYBYTES], const int ADDITIONAL_DATA_LEN,
    const uint8_t additional_data[ADDITIONAL_DATA_LEN],
    uint8_t data[ENCRYPTED_LEN - crypto_aead_chacha20poly1305_ietf_NPUBBYTES
                 - crypto_aead_chacha20poly1305_ietf_ABYTES])
{
  unsigned long long DATA_LEN = ENCRYPTED_LEN
                                - crypto_aead_chacha20poly1305_ietf_NPUBBYTES
                                - crypto_aead_chacha20poly1305_ietf_ABYTES;

  uint8_t *nonce = malloc(crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  memcpy(nonce, encrypted_data, crypto_aead_chacha20poly1305_ietf_NPUBBYTES);

  int CIPHERTEXT_LEN
      = ENCRYPTED_LEN - crypto_aead_chacha20poly1305_ietf_NPUBBYTES;
  uint8_t *ciphertext = malloc(CIPHERTEXT_LEN);
  memcpy(ciphertext,
         encrypted_data + crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
         CIPHERTEXT_LEN);

  int decrypted = crypto_aead_chacha20poly1305_ietf_decrypt(
      data, &DATA_LEN, NULL, ciphertext, CIPHERTEXT_LEN, additional_data,
      ADDITIONAL_DATA_LEN, nonce, key);

  free(ciphertext);
  free(nonce);

  if (decrypted == 0) return 0;

  return -1;
}

__attribute__((used)) void
calculate_forward_secret_nonce(
    uint8_t nonce[crypto_aead_chacha20poly1305_ietf_NPUBBYTES],
    const uint8_t ephemeral_x25519_pk[crypto_scalarmult_curve25519_BYTES],
    const uint8_t x25519_pk[crypto_scalarmult_curve25519_BYTES])
{
  int NONCE_RANDOM_X_LEN = crypto_aead_chacha20poly1305_ietf_NPUBBYTES
                           + crypto_scalarmult_curve25519_BYTES;
  int NONCE_VECTOR_LEN
      = NONCE_RANDOM_X_LEN + crypto_scalarmult_curve25519_BYTES;
  uint8_t *nonce_vector = sodium_malloc(NONCE_VECTOR_LEN);

  randombytes_buf(nonce_vector, crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  memcpy(nonce_vector + crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
         ephemeral_x25519_pk, crypto_scalarmult_curve25519_BYTES);
  memcpy(nonce_vector + NONCE_RANDOM_X_LEN, x25519_pk,
         crypto_scalarmult_curve25519_BYTES);

  uint8_t *nonce_sha512 = malloc(crypto_hash_sha512_BYTES);
  crypto_hash_sha512(nonce_sha512, nonce_vector, NONCE_VECTOR_LEN);
  sodium_free(nonce_vector);

  memcpy(nonce, nonce_sha512, crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  free(nonce_sha512);
}

/* Returns (ephemeral_pk || nonce || encrypted_data || auth tag || signature of
 * ephemeral_pk)  */
__attribute__((used)) int
forward_secretbox_encrypt_data(
    const int DATA_LEN, const uint8_t data[DATA_LEN],
    const uint8_t public_key[crypto_sign_ed25519_PUBLICKEYBYTES],
    const int ADDITIONAL_DATA_LEN,
    const uint8_t additional_data[ADDITIONAL_DATA_LEN],
    uint8_t encrypted[crypto_scalarmult_curve25519_BYTES
                      + crypto_aead_chacha20poly1305_ietf_NPUBBYTES + DATA_LEN
                      + crypto_aead_chacha20poly1305_ietf_ABYTES])
{
  /* if (DATA_LEN > 2^12) return -2; // Encrypted data larger than expected
   */

  unsigned long long CIPHERTEXT_LEN
      = DATA_LEN + crypto_aead_chacha20poly1305_ietf_ABYTES;
  uint8_t *ciphertext = (uint8_t *)sodium_malloc(CIPHERTEXT_LEN);

  uint8_t *ephemeral_x25519_pk = malloc(crypto_scalarmult_curve25519_BYTES);
  uint8_t *ephemeral_x25519_sk
      = sodium_malloc(crypto_scalarmult_curve25519_SCALARBYTES);
  crypto_kx_keypair(ephemeral_x25519_pk, ephemeral_x25519_sk);

  uint8_t *x25519_pk = malloc(crypto_scalarmult_curve25519_BYTES);
  int converted = crypto_sign_ed25519_pk_to_curve25519(x25519_pk, public_key);
  if (converted != 0)
  {
    free(x25519_pk);
    sodium_free(ciphertext);
    free(ephemeral_x25519_pk);
    sodium_free(ephemeral_x25519_sk);

    return -1;
  }

  uint8_t *server_tx = sodium_malloc(crypto_kx_SESSIONKEYBYTES);
  int created = crypto_kx_server_session_keys(
      NULL, server_tx, ephemeral_x25519_pk, ephemeral_x25519_sk, x25519_pk);
  sodium_free(ephemeral_x25519_sk);
  if (created != 0)
  {
    free(x25519_pk);
    sodium_free(ciphertext);
    free(ephemeral_x25519_pk);
    sodium_free(server_tx);

    return -2;
  }

  uint8_t *nonce = malloc(crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  calculate_forward_secret_nonce(nonce, ephemeral_x25519_pk, x25519_pk);
  free(x25519_pk);

  crypto_aead_chacha20poly1305_ietf_encrypt(
      ciphertext, &CIPHERTEXT_LEN, data, DATA_LEN, additional_data,
      ADDITIONAL_DATA_LEN, NULL, nonce, server_tx);
  sodium_free(server_tx);

  memcpy(encrypted, ephemeral_x25519_pk, crypto_scalarmult_curve25519_BYTES);
  free(ephemeral_x25519_pk);

  memcpy(encrypted + crypto_scalarmult_curve25519_BYTES, nonce,
         crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  free(nonce);

  int KEY_NONCE_LEN = crypto_scalarmult_curve25519_BYTES
                      + crypto_aead_chacha20poly1305_ietf_NPUBBYTES;
  memcpy(encrypted + KEY_NONCE_LEN, ciphertext, CIPHERTEXT_LEN);
  sodium_free(ciphertext);

  return 0;
}

__attribute__((used)) int
forward_secretbox_decrypt_data(
    const int ENCRYPTED_LEN, const uint8_t encrypted_data[ENCRYPTED_LEN],
    const uint8_t secret_key[crypto_sign_ed25519_SECRETKEYBYTES],
    const int ADDITIONAL_DATA_LEN,
    const uint8_t additional_data[ADDITIONAL_DATA_LEN],
    uint8_t data[ENCRYPTED_LEN - crypto_aead_chacha20poly1305_ietf_NPUBBYTES
                 - crypto_aead_chacha20poly1305_ietf_ABYTES
                 - crypto_scalarmult_curve25519_BYTES])
{
  int EPHEMERAL_NONCE_LEN = crypto_scalarmult_curve25519_BYTES
                            + crypto_aead_chacha20poly1305_ietf_NPUBBYTES;

  unsigned long long DATA_LEN = ENCRYPTED_LEN - EPHEMERAL_NONCE_LEN
                                - crypto_aead_chacha20poly1305_ietf_ABYTES
                                - crypto_sign_ed25519_BYTES;

  uint8_t *ephemeral_x25519_pk = malloc(crypto_scalarmult_curve25519_BYTES);
  memcpy(ephemeral_x25519_pk, encrypted_data,
         crypto_scalarmult_curve25519_BYTES);

  uint8_t *nonce = malloc(crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
  memcpy(nonce, encrypted_data + crypto_scalarmult_curve25519_BYTES,
         crypto_aead_chacha20poly1305_ietf_NPUBBYTES);

  uint8_t *x25519_pk = malloc(crypto_aead_chacha20poly1305_KEYBYTES);
  uint8_t *x25519_sk = sodium_malloc(crypto_scalarmult_curve25519_BYTES);
  crypto_sign_ed25519_sk_to_curve25519(x25519_sk, secret_key);
  crypto_scalarmult_curve25519_base(x25519_pk, x25519_sk);

  uint8_t *client_rx = sodium_malloc(crypto_kx_SESSIONKEYBYTES);
  int created = crypto_kx_client_session_keys(client_rx, NULL, x25519_pk,
                                              x25519_sk, ephemeral_x25519_pk);
  free(x25519_pk);
  sodium_free(x25519_sk);
  free(ephemeral_x25519_pk);
  if (created != 0)
  {
    free(nonce);
    sodium_free(client_rx);

    return -1;
  }

  int CIPHERTEXT_LEN = ENCRYPTED_LEN - EPHEMERAL_NONCE_LEN;
  uint8_t *ciphertext = malloc(CIPHERTEXT_LEN);
  memcpy(ciphertext, encrypted_data + EPHEMERAL_NONCE_LEN, CIPHERTEXT_LEN);

  int decrypted = crypto_aead_chacha20poly1305_ietf_decrypt(
      data, &DATA_LEN, NULL, ciphertext, CIPHERTEXT_LEN, additional_data,
      ADDITIONAL_DATA_LEN, nonce, client_rx);

  free(ciphertext);
  sodium_free(client_rx);
  free(nonce);

  if (decrypted == 0) return 0;

  return -2;
}

__attribute__((used)) int
split_secret(const int SHARES_LEN, const int THRESHOLD, const int SECRET_LEN,
             const uint8_t secret[SECRET_LEN],
             uint8_t shares[SHARES_LEN * (SECRET_LEN + 1)])
{
  size_t i, j;

  if (SHARES_LEN > FIELD - 1) return -3;
  if (SHARES_LEN < THRESHOLD) return -2;
  if (THRESHOLD < 2) return -1;

  uint8_t *coefficients = malloc(THRESHOLD);

  for (i = 0; i < SECRET_LEN; i++)
  {
    randombytes_buf(coefficients, THRESHOLD);
    coefficients[0] = secret[i];

    for (j = 0; j < SHARES_LEN; j++)
    {
      shares[j * (SECRET_LEN + 1) + i]
          = evaluate(THRESHOLD, coefficients, j + 1);
      /* shares[j][i] = evaluate(THRESHOLD, coefficients, j + 1); */

      if (i == SECRET_LEN - 1)
      {
        shares[j * (SECRET_LEN + 1) + SECRET_LEN] = j + 1;
        /* shares[j][SECRET_LEN] = j + 1; */
      }
    }
  }

  free(coefficients);

  return 0;
}

__attribute__((used)) int
restore_secret(const int SHARES_LEN, const int SECRET_LEN,
               const uint8_t *shares, // [SHARES_LEN * (SECRET_LEN + 1)]
               uint8_t *secret)       // [SECRET_LEN])
{
  size_t i, j;

  if (SHARES_LEN < 2)
    return -2; // throw new Error('Not enough shares provided');
  if (SHARES_LEN > FIELD - 1)
    return -1; // throw new Error(`Need at most ${utils.FIELD - 1}
               // shares`);

  /* uint8_t(*points)[2] = malloc(SHARES_LEN * sizeof(*points)); */
  uint8_t *points = malloc(SHARES_LEN * 2);

  for (i = 0; i < SECRET_LEN; i++)
  {
    for (j = 0; j < SHARES_LEN; j++)
    {
      /* points[j * 2] = shares[j * (SECRET_LEN + 1) + SECRET_LEN]; */
      memcpy(&points[j * 2], &shares[j * (SECRET_LEN + 1) + SECRET_LEN],
             sizeof(uint8_t));
      /* points[j][0] = shares[j][SECRET_LEN]; */
      /* points[j * 2 + 1] = shares[j * (SECRET_LEN + 1) + i]; */
      memcpy(&points[j * 2 + 1], &shares[j * (SECRET_LEN + 1) + i],
             sizeof(uint8_t));
      /* points[j][1] = shares[j][i]; */
    }

    secret[i] = interpolate(SHARES_LEN, points);
  }

  free(points);

  return 0;
}

// Output is an array of indexes of the elements
__attribute__((used)) void
items_indexes_in_array(
    const size_t ARRAY_LEN, const size_t ITEMS_ARRAY_LEN,
    const uint8_t array[ARRAY_LEN * crypto_hash_sha512_BYTES],
    const uint8_t items[ITEMS_ARRAY_LEN * crypto_hash_sha512_BYTES],
    int32_t indexes[ITEMS_ARRAY_LEN])
{
  size_t i, j, k;

  for (i = 0; i < ITEMS_ARRAY_LEN; i++)
  {
    // We start with all items unfound
    indexes[i] = -1;
  }

  if (ITEMS_ARRAY_LEN > ARRAY_LEN) return;

  int itemsFound = 0;
  for (i = 0; i < ARRAY_LEN; i++)
  {
    if (itemsFound == ITEMS_ARRAY_LEN) return;

    for (j = 0; j < ITEMS_ARRAY_LEN; j++)
    {
      bool found = true;
      for (k = 0; k < crypto_hash_sha512_BYTES; k++)
      {
        if (array[i * crypto_hash_sha512_BYTES + k]
            != items[j * crypto_hash_sha512_BYTES + k])
        {
          found = false;
          break;
        }
      }

      if (found)
      {
        indexes[j] = i;
        itemsFound++;

        break;
      }
    }
  }
}

__attribute__((used)) int
random_bytes(const int SIZE, uint8_t array[SIZE])
{
  randombytes_buf(array, SIZE);

  return 0;
}

__attribute__((used)) int
random_number_in_range(const int MIN, const int MAX)
{
  size_t i;

  const int RANGE = MAX - MIN;
  const int BYTES_NEEDED = ceil(log2(RANGE) / 8);
  const int MAX_RANGE = pow(pow(2, 8), BYTES_NEEDED);
  const int EXTENDED_RANGE = floor(MAX_RANGE / RANGE) * RANGE;

  uint8_t *randomBytes = malloc(BYTES_NEEDED);

  int randomInteger = EXTENDED_RANGE;
  while (randomInteger >= EXTENDED_RANGE)
  {
    randombytes_buf(randomBytes, BYTES_NEEDED);

    randomInteger = 0;
    for (i = 0; i < BYTES_NEEDED; i++)
    {
      randomInteger <<= 8;
      randomInteger += randomBytes[i];
    }

    if (randomInteger < EXTENDED_RANGE)
    {
      free(randomBytes);
      randomInteger %= RANGE;

      return MIN + randomInteger;
    }
  }

  free(randomBytes);

  return randomInteger;
}

__attribute__((used)) int
get_merkle_root(
    const int LEAVES_LEN,
    const uint8_t leaves_hashed[LEAVES_LEN * crypto_hash_sha512_BYTES],
    uint8_t root[crypto_hash_sha512_BYTES])
{
  size_t i, j;

  uint8_t *hashes = malloc(LEAVES_LEN * crypto_hash_sha512_BYTES);
  uint8_t *concat_hashes = malloc(2 * crypto_hash_sha512_BYTES);

  memcpy(hashes, leaves_hashed, LEAVES_LEN * crypto_hash_sha512_BYTES);

  int l;
  int leaves = LEAVES_LEN;
  int res;
  bool oddLeaves;
  // For every branch level.
  do
  {
    // Count hashes in current level.
    j = 0;
    oddLeaves = leaves % 2 != 0;
    for (i = 0; i < leaves; i += 2)
    {
      // We are at the last position to the right of a tree with odd number of
      // leaves.
      if (oddLeaves && i + 1 == leaves)
      {
        memcpy(concat_hashes, &hashes[i * crypto_hash_sha512_BYTES],
               crypto_hash_sha512_BYTES);
        // Concat leaf hash with itself.
        memcpy(&concat_hashes[crypto_hash_sha512_BYTES],
               &hashes[i * crypto_hash_sha512_BYTES], crypto_hash_sha512_BYTES);
      }
      else
      {
        memcpy(concat_hashes, &hashes[i * crypto_hash_sha512_BYTES],
               crypto_hash_sha512_BYTES);
        // In any other case concat leaf hash with the one on its right.
        memcpy(&concat_hashes[crypto_hash_sha512_BYTES],
               &hashes[(i + 1) * crypto_hash_sha512_BYTES],
               crypto_hash_sha512_BYTES);
      }

      crypto_hash_sha512(root, concat_hashes, 2 * crypto_hash_sha512_BYTES);
      memcpy(&hashes[j * crypto_hash_sha512_BYTES], root,
             crypto_hash_sha512_BYTES);
      j++;
    }

    l = ceil(leaves / 2);
    memset(&hashes[l * crypto_hash_sha512_BYTES], 0,
           (LEAVES_LEN - l) * crypto_hash_sha512_BYTES);
    leaves = l;
  } while (leaves > 1);

  memcpy(root, hashes, crypto_hash_sha512_BYTES);

  free(hashes);
  free(concat_hashes);

  return 0;
}

// The result is the proof length
__attribute__((used)) int
get_merkle_proof(
    const int LEAVES_LEN,
    const uint8_t leaves_hashed[LEAVES_LEN * crypto_hash_sha512_BYTES],
    const uint8_t element_hash[crypto_hash_sha512_BYTES],
    uint8_t proof[LEAVES_LEN * (crypto_hash_sha512_BYTES + 1)])
{
  size_t i, j, k;

  int32_t index[1];
  items_indexes_in_array(LEAVES_LEN, 1, leaves_hashed, element_hash, index);
  if (index[0] == -1) return -1;

  int element_of_interest = index[0];

  uint8_t *hashes = malloc(LEAVES_LEN * crypto_hash_sha512_BYTES);
  memcpy(hashes, leaves_hashed, LEAVES_LEN * crypto_hash_sha512_BYTES);

  uint8_t *concat_hashes = malloc(2 * crypto_hash_sha512_BYTES);
  uint8_t *hash = malloc(crypto_hash_sha512_BYTES);

  int l;
  int leaves = LEAVES_LEN;
  int res;
  bool oddLeaves;
  // Counts the index of proof artifacts.
  k = 0;
  do
  {
    // Counts the index of the elements of the new array of hashes.
    j = 0;
    oddLeaves = leaves % 2 != 0;
    for (i = 0; i < leaves; i += 2)
    {
      if (oddLeaves && i + 1 == leaves)
      {
        memcpy(concat_hashes, &hashes[i * crypto_hash_sha512_BYTES],
               crypto_hash_sha512_BYTES);
        memcpy(&concat_hashes[crypto_hash_sha512_BYTES],
               &hashes[i * crypto_hash_sha512_BYTES], crypto_hash_sha512_BYTES);

        if (i == element_of_interest)
        {
          memcpy(&proof[k * (crypto_hash_sha512_BYTES + 1)],
                 &hashes[i * crypto_hash_sha512_BYTES],
                 crypto_hash_sha512_BYTES);
          // We do not care if left(0) or right(1) since hash of itself
          proof[k++ * (crypto_hash_sha512_BYTES + 1) + crypto_hash_sha512_BYTES]
              = 0;
          element_of_interest = j;
        }
      }
      else
      {
        memcpy(concat_hashes, &hashes[i * crypto_hash_sha512_BYTES],
               crypto_hash_sha512_BYTES);
        memcpy(&concat_hashes[crypto_hash_sha512_BYTES],
               &hashes[(i + 1) * crypto_hash_sha512_BYTES],
               crypto_hash_sha512_BYTES);

        if (i == element_of_interest)
        {
          memcpy(&proof[k * (crypto_hash_sha512_BYTES + 1)],
                 &hashes[(i + 1) * crypto_hash_sha512_BYTES],
                 crypto_hash_sha512_BYTES);
          // Proof artifact needs to go to the right when concatenated with
          // element.
          proof[k++ * (crypto_hash_sha512_BYTES + 1) + crypto_hash_sha512_BYTES]
              = 1;
          element_of_interest = j;
        }
        else if (i + 1 == element_of_interest)
        {
          memcpy(&proof[k * (crypto_hash_sha512_BYTES + 1)],
                 &hashes[i * crypto_hash_sha512_BYTES],
                 crypto_hash_sha512_BYTES);
          // Proof artifact needs to go to the left when concatenated with
          // element.
          proof[k++ * (crypto_hash_sha512_BYTES + 1) + crypto_hash_sha512_BYTES]
              = 0;
          element_of_interest = j;
        }
      }

      crypto_hash_sha512(hash, concat_hashes, 2 * crypto_hash_sha512_BYTES);
      memcpy(&hashes[j++ * crypto_hash_sha512_BYTES], hash,
             crypto_hash_sha512_BYTES);
    }

    int l = ceil(leaves / 2);
    memset(&hashes[l * crypto_hash_sha512_BYTES], 0,
           (LEAVES_LEN - l) * crypto_hash_sha512_BYTES);
    leaves = l;
  } while (leaves > 1);

  free(hashes);
  free(concat_hashes);
  free(hash);

  return k * (crypto_hash_sha512_BYTES + 1);
}

__attribute__((used)) int
verify_merkle_proof(const int PROOF_LEN,
                    const uint8_t element_hash[crypto_hash_sha512_BYTES],
                    const uint8_t root[crypto_hash_sha512_BYTES],
                    const uint8_t proof[PROOF_LEN])
{
  if (PROOF_LEN % (crypto_hash_sha512_BYTES + 1) != 0) return -1;
  int NODES_LEN = PROOF_LEN / (crypto_hash_sha512_BYTES + 1);

  size_t i, position;

  uint8_t *hash = malloc(crypto_hash_sha512_BYTES);
  memcpy(hash, element_hash, crypto_hash_sha512_BYTES);
  uint8_t *concat_hashes = malloc(2 * crypto_hash_sha512_BYTES);

  for (i = 0; i < NODES_LEN; i++)
  {
    position
        = proof[i * (crypto_hash_sha512_BYTES + 1) + crypto_hash_sha512_BYTES];
    if (position != 0 && position != 1)
    {
      free(hash);
      free(concat_hashes);

      return -2;
    }

    // Proof artifact goes to the left
    if (position == 0)
    {
      memcpy(concat_hashes, &proof[i * (crypto_hash_sha512_BYTES + 1)],
             crypto_hash_sha512_BYTES);
      memcpy(&concat_hashes[crypto_hash_sha512_BYTES], hash,
             crypto_hash_sha512_BYTES);
    }
    else
    {
      memcpy(concat_hashes, hash, crypto_hash_sha512_BYTES);
      memcpy(&concat_hashes[crypto_hash_sha512_BYTES],
             &proof[i * (crypto_hash_sha512_BYTES + 1)],
             crypto_hash_sha512_BYTES);
    }

    int res
        = crypto_hash_sha512(hash, concat_hashes, 2 * crypto_hash_sha512_BYTES);
  }

  for (i = 0; i < crypto_hash_sha512_BYTES; i++)
  {
    if (hash[i] != root[i])
    {
      free(hash);
      free(concat_hashes);

      return 1;
    }
  }

  free(hash);
  free(concat_hashes);

  return 0;
}
