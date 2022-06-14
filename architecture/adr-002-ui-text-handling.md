# Architecture Decision Record: UI Text Handling

## Context

It has been decided that app context/settings should be passed from the
server side rendered mount points via data props.
One type of settings is text strings that is defined by
the system/host rendering the mount points.
Since we are going to have quite some levels of nested components
it would be nice to have a way to extract the string
without having to define them all the way down the tree.

## Decision

A solution has been made that extracts the props holding the strings
and puts them in the Redux store under the index: `text` at the app entry level.
That is done with the help of the `withText()` High Order Component.
The solution of having the strings in redux
enables us to fetch the strings at any point in the tree.
A hook called: `useText()` makes it simple to request a certain string
inside a given component.

## Alternatives considered

One major alternative would be not doing it and pass down the props.
But that leaves us with text props all the way down the tree
which we would like to avoid.
Some translation libraries has been investigated
but that would in most cases give us a lot of tools and complexity
that is not needed in order to solve the relatively simple task.

## Consequences

Since we omit the text props down the tree
it leaves us with fewer props and a cleaner component setup.
Although some "magic" has been introduced
with text prop matching and storage in redux,
it is outweighed by the simplicity of the HOC wrapper and useText hook.
