# **Parse, Don't Validate as a Strong Default for Payment Eligibility**

For technical teams building business-critical systems, Parse, Don't Validate is a strong default: parse untrusted input once at the boundary, then operate on domain types that encode business guarantees. The result is fewer repeated checks, clearer APIs, and safer refactoring.

This document uses one end-to-end narrative in all examples: deciding whether an account is eligible for payment.

## **Why This Matters**

Traditional validation usually answers a boolean question and then continues with the same broad type. That loses information the type system could carry forward.

Parsing instead transforms input into a narrower domain type. In payment logic, the goal is not only "is this account payable?" but "produce a PayableAccount" that captures proof of eligibility.

| Operational Aspect | Traditional Validation | Parsing Methodology |
| :---- | :---- | :---- |
| **Output Goal** | Identify whether data is invalid | Transform data into known-good structure |
| **Type Evolution** | General type remains general (e.g., Account) | General type becomes domain type (e.g., PayableAccount) |
| **Downstream Trust** | Defensive checks are common | Fewer checks are needed when invariants are encoded in types |
| **Refactoring Burden** | Manual audit of boolean checks | Compiler surfaces type mismatches |
| **Logic Location** | Scattered across predicates | Centralized at trust boundaries |

## **End-to-End Narrative: Account -> PayableAccount -> Transfer**

The same flow applies across languages:

1. Receive an untrusted `Account`.
2. Parse using payment rules (status, funds, policy constraints).
3. Return either `PayableAccount` or a typed failure.
4. Allow transfer code to accept only `PayableAccount`.

### **Go: Opaque Construction at Package Boundaries**

In Go, package visibility enforces parser ownership.

```go
// package account
type Account struct {
  id      string
  balance int
  status  string
}

// PayableAccount can only be produced by ParseForPayment.
type PayableAccount struct {
  id    string
  funds int
}

func ParseForPayment(raw Account, amount int) (*PayableAccount, error) {
  if raw.status != "ACTIVE" {
    return nil, errors.New("account not active")
  }
  if raw.balance < amount {
    return nil, errors.New("insufficient funds")
  }
  return &PayableAccount{id: raw.id, funds: raw.balance}, nil
}

func Transfer(acc PayableAccount, amount int) error {
  // payment execution logic
  return nil
}
```

`Transfer` does not need to re-check status and funds at every call site.

### **TypeScript: Discriminated Unions for State Modeling**

TypeScript models account states as mutually exclusive variants. Parsing narrows to the payable variant.

```typescript
type Account =
  | { status: 'active'; balance: number; id: string }
  | { status: 'frozen'; reason: string; id: string }
  | { status: 'under_review'; id: string };

type PayableAccount = { status: 'active'; balance: number; id: string };

function toPayable(acc: Account, amount: number): PayableAccount | Error {
  if (acc.status !== 'active') return new Error('Account not active');
  if (acc.balance < amount) return new Error('Insufficient funds');
  return acc;
}

function transfer(acc: PayableAccount, amount: number) {
  // payment execution logic
}
```

Non-payable states are blocked before payment execution.

### **Java: Sealed States and Exhaustive Switching**

Java sealed hierarchies model a closed state machine and force explicit handling.

```java
public sealed interface AccountState permits Active, Frozen, UnderReview {}

public record Active(double balance) implements AccountState {}
public record Frozen(String reason) implements AccountState {}
public record UnderReview() implements AccountState {}

public final class PaymentParser {
    public static Active parseForPayment(AccountState state, double amount) {
        return switch (state) {
            case Active a when a.balance() >= amount -> a;
            case Active a -> throw new IllegalArgumentException("insufficient funds");
            case Frozen f -> throw new IllegalArgumentException("account frozen: " + f.reason());
            case UnderReview u -> throw new IllegalArgumentException("account under review");
        };
    }
}

public final class PaymentProcessor {
    public void transfer(Active payable, double amount) {
        // payment execution logic
    }
}
```

If a new account state is added, switch expressions become non-exhaustive until updated.

## **Refactoring Dynamics**

The strongest benefit appears during change: business rules evolve, and types expose where updates are needed.

When a rule changes (for example, minimum balance from 100 to 200), update parser logic and related types first. Compiler feedback then identifies call paths still assuming old rules.

In validation-heavy systems, the same change usually requires broad text search and manual review of status and balance checks, which increases miss risk.

| Refactoring Task | Validation-Heavy Approach | Parse-First Approach |
| :---- | :---- | :---- |
| **Changing eligibility threshold** | Audit distributed `if` checks | Update parser and affected types |
| **Adding a new account state** | Search and patch branch logic | Exhaustiveness errors guide updates |
| **Moving rule ownership** | Hidden coupling across layers | Boundary parser remains single authority |

## **Trade-Offs and Scope**

Parse-first is a strong default, not a universal rule. Use it where incorrect states are expensive or risky.

- Apply at trust boundaries: API input, database reads, message consumers.
- Use tiny types for values with business meaning: IDs, money, eligibility states.
- Use primitives for short-lived local values with low domain risk.
- Prefer result types for multi-failure workflows; exceptions can be acceptable for simple boundary rejection if translated consistently.

## **Conclusion**

For payment eligibility logic, Parse, Don't Validate is a strong default because it converts business checks into durable type information. Parse once at the boundary, move forward with `PayableAccount`, and let signatures make illegal flows harder to express.

Across Go, TypeScript, and Java, syntax differs but architecture is the same: centralized parser rules, narrower internal types, and refactoring supported by compiler feedback.

## **Evidence Sources (Standardized)**

Primary concept source:

- Alexis King, Parse, don't validate (2019): https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

Language mechanism references:

- Java sealed classes and pattern matching overview: https://www.javacodegeeks.com/2025/12/modern-java-language-features-records-sealed-classes-pattern-matching.html
- TypeScript and Zod practical boundaries: https://blog.logrocket.com/when-use-zod-typescript-both-developers-guide/
- TypeScript branded types discussion: https://blog.logrocket.com/leveraging-typescript-branded-types-stronger-type-checks/
- Go value object patterns: https://dev.to/gabrielanhaia/value-objects-in-go-4-patterns-that-kill-invalid-state-27ea

Supporting practice notes:

- Parse-first in TypeScript practice: https://cekrem.github.io/posts/parse-dont-validate-typescript/
- Illegal states unrepresentable discussion: https://functional-architecture.org/make_illegal_states_unrepresentable/
