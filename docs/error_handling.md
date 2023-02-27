# Error Handling

Error handling is something that is done on multiple levels:
Eg.: Form validation, network/fetch error handling, runtime errors.
You could also argue that the fact that the codebase is making use of typescript
and code generation from the various http services (graphql/REST) belongs to
the same idiom of error handling in order to make the applications more robust.

## Error Boundary

[Error boundary](https://reactjs.org/docs/error-boundaries.html) was introduced in React 16 and makes it possible to implement a
"catch all" feature catching "uncatched" errors and replacing the application
with a component to the users that something went wrong.
It is meant ato be a way of having a safety net and always be able to tell
the end user that something went wrong.
The apps are being wrapped in the error boundary handling which makes it
possible to catch thrown errors at runtime.

### Fetch and Error Boundary

Async operations and therby also fetch are not being handled out of the box
by the React Error Boundary. But fortunately react-query, which is being used
both by the REST services (Orval) and graphql (Graphql Code Generator), has a
way of addressing the problem. The `QueryClient` can be configured to trigger
the Error Boundary system if an error is thrown. So that is what we are doing.

#### Fetch error classes

Two different types of error classes have been made in order to handle errors
in the fetchers: http errors and fetcher errors.

*Http errors* are the ones originating from http errors
and have a status code attached.

*Fetcher errors* are whatever else bad that could apart from http errors.
Eg. JSON parsing gone wrong.

Both types of errors comes in two variants: "normal" and "critical". The idea is
that only critical errors will trigger an Error Boundary.

For instance if you look at the [DBC Gateway fetcher](../src/core/dbc-gateway/graphql-fetcher.ts) it throws a
`DbcGateWayHttpError` in case of a http error occurs. [`DbcGateWayHttpError`](../src/core/dbc-dateway/DbcGatewayHttpError.ts)
extends the [`FetcherCriticalHttpError`](../src/core/fetchers/FetcherCriticalHttpError) which makes sure to trigger the
Error Boundary system.
