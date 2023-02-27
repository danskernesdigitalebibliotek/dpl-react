# Architecture Decision Record: Unit Tests

## Context

The code base is growing and so does the number of functions and custom hooks.

While we have a good coverage in our UI tests from Cypress we are lacking
something to tests the inner workings of the applications.

With unit tests added we can test bits of functionality that is shared
between different areas of the application and make sure that we get the
expected output giving different variations of input.

## Decision

We decided to go for [Vitest](https://vitest.dev/) which is an easy to use and very fast
unit testing tool.

It has more or less the same capabilities as [Jest](https://jestjs.io/)
which is another popular testing framework which is similar.

Vitest is framework agnostic so in order to make it possible to test hooks
we found [`@testing-library/react-hooks`](https://react-hooks-testing-library.com/) that works in conjunction with Vitest.

## Alternatives considered

We could have used Jest. But trying that we experienced major problems
with having both Jest and Cypress in the same codebase.
They have colliding test function names and Typescript could not figure it out.

There is probably a solution but at the same time we got Vitest recommended.
It seemed very fast and just as capable as Jest. And we did not have the
colliding issues of shared function/object names.

## Consequences

We now have unit test as a part of the mix which brings more stability
and certainty that the individual pieces of the application work.
