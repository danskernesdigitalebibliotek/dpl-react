# Architecture Decision Record: React Use

## Context

The decision of obtaining `react-use` as a part of the project originated
from the problem that arose from [having an useEffect hook with
an object as a dependency](https://github.com/danskernesdigitalebibliotek/dpl-react/pull/219).

`useEffect` does not support comparison of objects or arrays and we needed
a method for comparing such natives.

## Decision

We decided to go for the react-use package
[react-use](https://github.com/streamich/react-use).
The reason is threefold:

* It could solve the problem with deep comparison of dependencies by using
  `useDeepCompareEffect`
* It offered an alternative to the
 [react-hook-inview](https://www.npmjs.com/package/react-hook-inview) viewport handling.
 So we did not need to use two packages.
* It has a range of other utility hooks that we can make use of in the future.

## Alternatives considered

We could have used our own implementation of the problem.
But since it is a common problem we might as well use a community backed solution.
And `react-use` gives us a wealth of other tools.

## Consequences

We can now use `useDeepCompareEffect` instead of `useEffect`
in cases where we have arrays or objects amomg the dependencies.
And we can make use of all the other utility hooks that the package provides.
