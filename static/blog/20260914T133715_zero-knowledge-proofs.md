# Zero-Knowledge Proofs: Proving Without Revealing

A zero-knowledge proof lets someone prove that a claim is true without revealing the private information behind it.

For example, a person could prove they are old enough to buy a product without sharing their name, date of birth, or identity number. A program could prove that it processed a batch of payments correctly without publishing every payment. The verifier learns that the claim is true, but not the secret used to prove it.

This makes zero-knowledge proofs useful wherever a system needs trust without unnecessary disclosure.

## The three promises

A useful zero-knowledge proof has three properties:

- **Completeness:** An honest person with a valid secret can produce a proof that passes verification.
- **Soundness:** A person without a valid secret should not be able to create a proof that passes.
- **Zero knowledge:** The proof should reveal nothing useful about the secret itself.

The third property is the important difference. Encryption protects a secret while it travels to a server. A zero-knowledge proof can avoid sending the secret to the server at all.

## A simple mental model

Think of a locked safe with a public challenge button. You claim to know the safe's combination, but you do not tell the combination to the guard. The guard gives you a fresh challenge that only someone who can operate the safe correctly could answer.

The guard can check your answer, but cannot reconstruct the combination from it. Because the challenge changes every time, replaying an old answer does not help an attacker.

In this example, the claim is that you know the combination. The proof is your answer to the challenge. Validity means the guard can confirm that answer could only have come from someone with the required knowledge. Zero knowledge means the answer does not reveal the combination itself.

Real systems use far more mathematics than this analogy suggests, but the product decision is simple: prove the minimum fact needed for the decision.

## What developers actually build

In software, a claim is usually expressed as a computation with two kinds of input:

- **Public inputs:** Values the verifier may see, such as a policy, a public key, a transaction root, or a pass/fail result.
- **Private inputs:** Values that must remain hidden, such as a password-derived secret, identity data, account balances, or the internal steps of a computation.

The proof system turns the program into mathematical constraints. The prover shows that it ran those constraints correctly with valid private inputs. The verifier checks a short proof against the public inputs.

That conversion is why proving is usually expensive and verification is usually cheap. Zero-knowledge proofs are valuable when the cost of proving is lower than the cost or risk of repeatedly trusting, sharing, or re-running the underlying work.

## Login without sending a password

Traditional login systems ask a person to send a password to a server. The server stores either the password or a value derived from it. TLS protects the connection, but the server still holds data that can be targeted in a breach.

A proof-based login can work differently:

1. During enrolment, the client creates a private secret and registers only a related public value with the server.
2. At login, the server sends a new challenge.
3. The client proves it knows the private secret needed to answer that challenge.
4. The server verifies the proof using the public value it already holds.

The private secret never leaves the client. A stolen database contains public values rather than reusable passwords. This does not replace sound account recovery, device protection, session management, and rate limiting, but it reduces the sensitive credential material a service needs to hold.

## Selective identity checks

The same idea is useful when a service only needs one fact about a person.

Instead of uploading a full identity document to prove an age requirement, an issuer can create a signed credential. The person can later prove that the credential is valid and that their age is above a threshold. The verifier receives the answer to the policy question, not the person's full identity.

This is called selective disclosure. It can reduce the damage caused by unnecessary data collection, but it depends on careful choices about who issues credentials, how they are revoked, and whether a proof can be linked across different services.

## Signal and private metadata

Signal uses zero-knowledge techniques as part of its effort to reveal less metadata to its own servers.

For private groups, Signal uses credentials that allow a member to prove they are authorised to access or update group state without exposing the whole membership list to the service. Its username system also avoids treating a readable username as a public directory entry. These designs do not make metadata disappear completely, but they limit which party can learn specific pieces of it.

This is the practical lesson: the value is not that a protocol is mathematically interesting. The value is that the server is deliberately unable to collect data it does not need to do its job.

## Scaling blockchains with proofs

A public blockchain normally asks many nodes to re-run every transaction. A zero-knowledge rollup moves most of that execution off the main chain.

1. A sequencer collects and executes a batch of transactions.
2. A prover creates one proof that the batch followed the rules.
3. A smart contract on the main chain verifies the proof and accepts the new state.
4. The transaction data or state changes remain available so others can reconstruct and check the result.

Thousands of transactions can therefore be represented by one proof. The main chain checks the result rather than repeating the entire workload.

The proof alone is not enough. A rollup also needs reliable data availability, secure transaction ordering, a way for users to recover assets, and sensible handling when the prover is delayed or unavailable.

## From circuits to zkVMs

Early applications required developers to describe their logic as low-level cryptographic circuits. That is still useful for small, specialised work, but it makes ordinary software development difficult.

A zero-knowledge virtual machine, or zkVM, takes a more familiar path. A developer writes a program, often in Rust or another compiled language. The zkVM runs the program, records the execution, and produces a proof that the program ran correctly for the agreed inputs.

This is promising for workloads such as verifying a complex calculation, proving that a model or rules engine was run as specified, or moving expensive validation away from a constrained environment. It does not make every program cheap to prove. Memory access, cryptography, loops, and large inputs can all make proving expensive, so teams still need to measure real workloads.

## Choosing a proof system

Different proof systems optimise for different constraints:

| Approach | Strength | Trade-off | Common use |
| :---- | :---- | :---- | :---- |
| **zk-SNARK** | Very small proofs and fast verification | May require a trusted setup; uses cryptography that is not post-quantum | On-chain verification and privacy applications |
| **zk-STARK** | No trusted setup and hash-based security | Larger proofs | Large computations and rollups |
| **Bulletproof** | No trusted setup and compact range proofs | Verification becomes slower as the proof grows | Confidential amounts and range checks |
| **zkVM** | Lets teams prove higher-level programs | Proving can be expensive and toolchains are still evolving | General verifiable computation |

The names matter less than the operational questions:

- What exact claim needs to be proven?
- Which inputs must remain private?
- Who pays the cost of producing proofs?
- How quickly must a verifier get an answer?
- What happens when proof generation fails or is delayed?
- Does the system need to avoid a trusted setup or prepare for post-quantum threats?

## When zero knowledge is the right tool

Use a zero-knowledge proof when a verifier needs confidence in a result but should not receive the underlying data or repeat the full computation. It is a strong fit for privacy-preserving eligibility checks, credential systems, confidential transactions, and verifiable off-chain computation.

Do not use it just because privacy sounds useful. A normal signed message, encryption, access control rule, or audit log is often simpler. The right design starts with the smallest claim another party needs to verify, then chooses the simplest mechanism that can prove it.

## References

- [The Knowledge Complexity of Interactive Proof Systems](https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf), Goldwasser, Micali, and Rackoff, 1985
- [A Survey of Zero-Knowledge Proof Frameworks](https://arxiv.org/html/2502.07063v1), arXiv, 2025
- [What are Zero-Knowledge Proofs?](https://z.cash/learn/what-are-zk-proofs/), Zcash
- [Signal Private Group System](https://signal.org/blog/signal-private-group-system/), Signal
- [Signal Usernames](https://signal.org/blog/username-system/), Signal
- [What is a ZK Rollup?](https://ethereum.org/en/developers/docs/scaling/zk-rollups/), ethereum.org
- [SP1 zkVM Documentation](https://docs.succinct.xyz/docs/sp1/introduction), Succinct
- [RISC Zero](https://www.risczero.com/), RISC Zero

