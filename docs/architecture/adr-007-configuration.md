# Configuration

## Context

This project provides a set of React applications which can be placed in a
mounting application to provide self service features for Danish public
libraries. To support variations in the appearance and behavior of these
applications, the applications support [configuration](../../src/core/utils/config.tsx).
In practice these are provided through data attributes on the root element of
the application [set by the mounting application](../README.md#data-attributes-and-props).

A configuration value can use one of three different types:

1. String value
2. Multiple string values
3. A JSON object

Also, a configuration value may be required or optional for the application to
function.

Our use of TypeScript should match our handling of configuration.

Practice has shown that string values are relatively easy to handle but JSON
values are not. This leads to errors which can be hard to debug. Consequently,
we need to clarify our handling of configuration and especially for JSON values.

## Decision

We will use the following rules for handling configuration:

1. The mounting application is responsible for providing configuration values
   in the correct format.
2. If a configuration value is optional and does not have a value then the
   corresponding data attribute must not be set by the mounting application.
3. If a configuration value is optional the application can alternately specify
   a required configuration value with an `enabled` boolean property. If no
   configuration is provided `{ enabled: false }` is an acceptable value.

## Alternatives considered

### Make configuration optional

We could make all configuration optional and introduce suitable handling if no
value is provided. This could introduce default values, errors or workarounds.

This would make the React application code more complex. We would rather push
this responsibility to the mounting application.

## Consequences

This approach provides a first step for improving our handling of
configuration. Potential improvements going forward are:

1. Runtime validation of JSON values using libraries like [Zod](https://zod.dev/),
   [io-ts](https://gcanti.github.io/io-ts/) or [Runtypes](https://github.com/pelotom/runtypes).
2. Specification of configuration values in a separate file which can be used
   by the mounting application to provide configuration values and by the
   React application to validate the provided values. One format for doing so
   would be JSON Schema which is widely supported in JavaScript, TypeScript and
   PHP (used by [DPL CMS](https://github.com/danskernesdigitalebibliotek/dpl-cms)).
