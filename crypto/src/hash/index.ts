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

import sha512 from "./sha512";
import getMerkleRoot from "./getMerkleRoot";
import getMerkleProof from "./getMerkleProof";
import verifyMerkleProof from "./verifyMerkleProof";
import memory from "./memory";
import vrf_algo_prove from "./vrf_algo_prove";
import vrf_algo_verify from "./vrf_algo_verify";
import vrf_algo_proof_to_hash from "./vrf_algo_proof_to_hash"
import vrf_algo_keypair from "./vrf_algo_keypair";


export default {
  sha512,
  vrf_algo_prove,
  vrf_algo_verify,
  vrf_algo_keypair,
  vrf_algo_proof_to_hash,
  getMerkleRoot,
  getMerkleProof,
  verifyMerkleProof,
  memory,
};
