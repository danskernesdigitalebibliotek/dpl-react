# Architecture Decision Record: Error handling in the React Apps

## Context

We needed to handle errors thrown in the apps, both in requests by fetchers but
also exceptions thrown at runtime.

Errors were already handled in the initial implementation of this project.
An [Error Boundary](https://react.dev/reference/react/use#displaying-an-error-to-users-with-error-boundary).
was already implemented but we were lacking two important features:

* Every app shouldn't show its error in their own scope. We wanted to centralise
the error rendering for the end user
* All errors should NOT be caught by the Error Boundary an thereby blocking the
whole app.

## Decision

### Show the errors in one place

To solve the problem with each app showing its own error we decided to make use of
[React's Portal system](https://react.dev/reference/react-dom/createPortal).
The host (most likely dpl-cms) that includes the apps tells the apps via a
config data prop what the container id of error wrapper is. Then the Error
boundary system makes sure tho use that id when rendering the error.

### Handle errors differently depending on type

Each app is wrapped with an Error Boundary. In the initial implementation
that meant that if any exception was thrown the Error Boundary would catch
any exception and showing an error message to the end user.
Further more the error boundary makes sure the errors are being logged to `error.log`.

Exceptions can be thrown in the apps at runtime both as a result
of a failing request to a service or on our side.
The change made to the error system in this context was to distinguish
between the request errors.
Some data for some services are being considered to be essential for the apps to
work, others are not.
To make sure that not all fetching errors are being caught we have created a
`queryErrorHandler` in `src/components/store.jsx`. The `queryErrorHandler` looks
at the type of error/instance of error that is being thrown
and decides if the Error Boundary should be used or not.
At the moment of this writing there are two type of errors - critical and non-critical.
The critical ones are being caught by the Error Boundary and the non-critical
are only ending up in the error log and is not blocking the app.

## Consequences

By the using the Portal system we have solved the problem about showing multiple
errors instead of one global.

By choosing to distinguish by error types by looking at there instance name
we can decide which fetch errors should be blocking the app and which should not.
In both cases the errors are being logged and we can trace them in our logs.

## Alternatives considered

None.
