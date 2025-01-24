# Removal of Airbnb Linting Rules

## Context

Airbnb's linting rules have not been updated to support ESLint 9 and have not
received significant updates for an extended period. This has led to a loss of
confidence in their continued maintenance and relevance. Consequently, we began
exploring alternative linting solutions and sought out the most widely recognized
and respected linting rules.

Determining the industry standard for linting rules is challenging due to the
variety of opinions and preferences within the developer community. While some
developers prefer the strictness and comprehensiveness of Airbnb's rules, others
may favor the flexibility and simplicity of the `eslint:recommended` ruleset.

## Decision

After careful consideration, we have chosen to implement the `eslint:recommended`
ruleset. This decision was based on its widespread recognition within the developer
community, ensuring a dependable basis for our linting requirements. We removed the
Airbnb linting rules from our ESLint configuration and supplemented it with custom
rules to retain some of the beneficial practices previously enforced by Airbnb.

## Consequences

- Removal of Airbnb ESlint ruleset
- Adding recommended eslint ruleset - eslint:recommended

## Alternatives Considered

- Wait for Airbnb: Postpone the update to ESLint until Airbnb supports version 9.
  This delay affects other dependent update tasks. The rationale is that Airbnb's
  coding standard is well-established and respected in the industry.
- Temporarily drop Airbnb: Since Airbnb does not support ESLint v9, the linting
  rules are not functioning correctly. This means deviations are not being caught.
  If this is the case, we can proceed with eslint:recommended, wait for Airbnb and
  effectively run without Airbnb for a period. When Airbnb ESLint v9 support is
  available, we could hope is that we can adjust our toolchain to automatically
  align the code with the current standard, making it easy to correct afterward.
