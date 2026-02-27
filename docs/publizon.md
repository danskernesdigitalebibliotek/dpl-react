# Publizon (PubHub) integration

Publizon (also known as PubHub) is the service behind digital e-material lending
for Danish public libraries. It provides access to ebooks, audiobooks, podcasts,
picture books, and music. This document describes how the React application
integrates with Publizon for authentication, API communication, lending, and
reading/playback.

## Authentication

### Overview

Requests to the Publizon API use bearer token authentication via the
`Authorization` header. The upstream Publizon API uses OAuth 2.0 password grant
with the token endpoint `https://login.bib.dk/oauth/token` (Adgangsplatformen —
the Danish library login platform).

### Token types

Three token types exist in the system (`src/core/token.js`):

| Token type | Constant | Description |
|------------|----------|-------------|
| `user` | `TOKEN_USER_KEY` | Authenticated library patron. Provides access to personal information. Preferred for Publizon requests. |
| `library` | `TOKEN_LIBRARY_KEY` | Library/agency token. Provides the same access level as a user token but without personal data. Used as fallback. |
| `unregistered-user` | `TOKEN_UNREGISTERED_USER_KEY` | Issued after Adgangsplatformen login for unregistered users. Not used for Publizon. |

The Publizon fetcher resolves the token with user-first priority
(`src/core/publizon/mutator/fetcher.ts`):

```ts
const token = getToken(TOKEN_USER_KEY) ?? getToken(TOKEN_LIBRARY_KEY);
```

If neither token is available, requests are sent without an `Authorization`
header (the `authHeaders` object will be empty).

### How tokens are set

Tokens are stored in a module-level `tokens` object in `src/core/token.js` and
set via `setToken(type, value)`. The mechanism differs between production and
development:

#### Production (Drupal CMS)

The CMS exposes `window.dplReact.setToken` as a global function
(`src/core/mount.js`). Drupal calls this before mounting the React apps:

```js
window.dplReact.setToken("user", "<token-from-adgangsplatformen>");
window.dplReact.mount(context);
```

- The **user token** is obtained when a patron logs in via Adgangsplatformen
  (OpenID Connect). Drupal's `dpl_login` module handles this flow.
- The **library token** is generated server-side by the `dpl_library_token`
  Drupal module. It uses OAuth 2.0 password grant with the agency ID as both
  username and password (e.g. `@100200`), authenticated with the client ID and
  secret via HTTP Basic Auth. The token is cached in Drupal's key-value store at
  half its validity period to ensure it is always fresh.

#### Development (Storybook)

Storybook provides `UserToken` and `LibraryToken` input components
(`src/apps/adgangsplatformen/`) that let developers paste tokens manually. These
are persisted in `sessionStorage` and set via `setToken()`.

### Proxy-level headers

The OpenAPI spec defines three additional required headers on most endpoints:

- `clientId` (UUID) — identifies the calling application
- `licenseKey` — the library's Publizon license key
- `cardNumber` — the borrower's card number

**These headers are not set by the React application.** They are injected by the
backend proxy that sits between the React app and the actual Publizon API. The
React fetcher only adds the `Authorization` bearer token and any headers passed
from Orval-generated code.

### Token refresh

There is no token refresh mechanism in the React application. If a token
expires, the user must re-authenticate through Adgangsplatformen. On the
Drupal/CMS side, the library token is automatically re-fetched when the cached
copy expires.

## Proxy & base URL

### Architecture

The React app never calls the Publizon API directly. All requests go through a
backend proxy. The flow is:

```text
React app
  → fetch("{publizonBaseUrl}/v1/{endpoint}", { Authorization: "Bearer {token}" })
    → Backend proxy (adds clientId, licenseKey, cardNumber headers)
      → Publizon API (library-api.pubhub.dk)
```

The proxy is responsible for:

1. Injecting `clientId`, `licenseKey`, and `cardNumber` headers
2. Forwarding the bearer token
3. Routing to the correct Publizon environment (QA vs production)

### Base URL configuration

The base URL flows from the CMS to the React app through several layers:

1. **Drupal configuration** — stored in `dpl_publizon.settings` (managed by
   `DplPublizonSettings` in the `dpl_publizon` module). The admin form
   `PublizonSettingsForm` provides a "Publizon service url" field.

2. **HTML data attributes** — Drupal renders React app containers as
   `<div data-dpl-app="..." data-publizon-base-url="...">`. All props ending
   with `Url` are extracted by the `withUrls` HOC (`src/core/utils/url.tsx`).

3. **Redux store** — `withUrls` dispatches `addUrlEntries` which stores the URLs
   in the `url` slice (`src/core/url.slice.ts`).

4. **Middleware extraction** — the `extractServiceBaseUrls` middleware
   (`src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts`) intercepts
   `url/addUrlEntries` and pulls `publizonBaseUrl` into a module-level store,
   keeping service URLs separate from the Redux state.

5. **Fetcher access** — the fetcher reads the URL with:

```ts
getServiceBaseUrl(serviceUrlKeys.publizon) // "publizonBaseUrl"
```

The URL helper (`src/core/fetchers/helpers.ts`) builds the final URL:

```ts
getServiceUrlWithParams({ baseUrl, url, params })
// → "{baseUrl}{path}?{params}"
```

### Environments

| Environment | Base URL | Source |
|-------------|----------|--------|
| Production | `https://pubhub-openplatform.dbc.dk` | Drupal config / `dpl_publizon.settings` |
| Storybook | `process.env.PUBLIZON_BASEURL` or `https://pubhub-openplatform.dbc.dk` | `src/core/storybook/serviceUrlArgs.ts` |
| Development (Docker) | `http://publizon-mock.docker` | WireMock container |

### WireMock (development mock)

In the Docker development environment, a WireMock container (`wiremock-publizon`)
serves as the Publizon proxy at `http://publizon-mock.docker:8080`. It provides:

- **CORS stub** — responds to `OPTIONS` requests on all paths with permissive
  CORS headers (`.docker/wiremock/publizon/mappings/cors-*.json`)
- **Endpoint stubs** — pre-recorded responses for loans, reservations, products,
  loan status, library profile, checklist, and card number endpoints
- **No header validation** — unlike production, the mock does not require
  `clientId`, `licenseKey`, or `cardNumber` headers

Mapping files live in `.docker/wiremock/publizon/mappings/`.

See `docs/request_mocking_wiremock.md` for more on the mock setup.

## API client (auto-generated)

The API client is generated from the OpenAPI spec at
`src/core/publizon/publizon-adapter.yaml` using [Orval](https://orval.dev).
The spec originates from the upstream
[publizon-adapter](https://github.com/DBCDK/publizon-adapter) repository.
The generated output lives in `src/core/publizon/publizon.ts` and exports React
Query hooks.

> **Note on "adapter" terminology:** `publizon-adapter.yaml` refers to the
> OpenAPI spec from the upstream `publizon-adapter` repository — it is not an
> adapter pattern for the reader/player components.

### Key endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/user/loans` | GET | List active loans |
| `/v1/user/loans/{identifier}` | GET | Get loan details |
| `/v1/user/loans/{identifier}` | POST | Create a new loan |
| `/v1/loanstatus/{identifier}` | GET | Get loan status for a product |
| `/v1/loanstatus` | POST | Get loan status for multiple products |
| `/v1/user/reservations` | GET | List reservations |
| `/v1/user/reservations/{identifier}` | POST | Create a reservation |
| `/v1/user/reservations/{identifier}` | PATCH | Update reservation contact info |
| `/v1/user/reservations/{identifier}` | DELETE | Cancel a reservation |
| `/v1/products/{identifier}` | GET | Get a product |
| `/v1/products` | GET | List all products |
| `/v1/library/profile` | GET | Get library profile (limits, durations) |
| `/v1/user/cardnumber/friendly` | GET | Get user's friendly card number |
| `/v1/user/checklist` | GET | List checklist items |
| `/v1/user/checklist/{identifier}` | POST/DELETE | Add/remove checklist item |

## E-materials

### Material types

E-materials are identified by having the `Ereol` access type from the GraphQL
FBI API. The helper function `hasCorrectAccess("Ereol", ...)` in
`src/components/material/material-buttons/helper.ts` performs this check.

Material types are split into two groups
(`src/components/reader-player/helper.ts`):

**Reader types** (rendered in the ebook reader):

- `ebook`
- `pictureBookOnline`
- `animatedSeriesOnline`
- `yearBookOnline`

**Player types** (rendered in the audio player):

- `audioBook`
- `podcast`
- `musicOnline`
- `audioBookTape`

The function `getReaderPlayerType()` determines whether a manifestation should
use the reader or the player.

### Loan status

The Publizon API returns a `loanStatus` code for each product. These codes drive
the UI for loan/reserve buttons (`src/components/availability-label/types.ts`):

| Code | Status | Meaning |
|------|--------|---------|
| 0 | `notLoanable` | Not loanable (e.g. max loans reached) |
| 1 | `loaned` | Already loaned by the user |
| 2 | `reserved` | Reserved but not yet redeemable |
| 3 | `redeemable` | Reservation is ready to redeem |
| 4 | `loanable` | Available for immediate loan |
| 5 | `reservable` | Not immediately available but can be reserved |

### Loan & reservation flow

The `useReaderPlayer` hook (`src/core/utils/useReaderPlayer.tsx`) orchestrates
the lending flow:

1. Fetches the user's active loans (`useGetV1UserLoans`) and reservations
   (`useGetV1UserReservations`).
2. Fetches the loan status for the current product
   (`useGetV1LoanstatusIdentifier`).
3. Derives boolean flags: `canBeLoaned`, `canBeReserved`, `isAlreadyLoaned`,
   `isAlreadyReserved`.
4. Resolves the `orderId` (needed for the reader/player) from the user's loans.

## Reader & player

The reader and player are **decoupled from the API layer**. They are third-party
PubHub components loaded via external scripts that only need two pieces of data:

- An **order number** (`orderId`) — for loaned material
- An **identifier** — for teasers/samples

The API layer (REST or SOAP, depending on the user type) is responsible for
providing this data, but the reader/player has no direct dependency on the API.
Once the `orderId` or `identifier` is available, the component can render
independently.

### Data acquisition

The `orderId` / `identifier` can be obtained through two paths depending on how
the user authenticated:

**Adgangsplatform users (REST)** — the React app calls REST endpoints through
the backend proxy (`pubhub-openplatform.dbc.dk`). The `useGetV1UserLoans()` hook
fetches loans and resolves the `orderId`. This is the path documented in the
"Loan & reservation flow" section above.

**UNI-Login users (SOAP via dpl-go)** — the `dpl-go` service makes SOAP calls
to Publizon (`libraryservices.pubhub.dk/v2_7/`). Key SOAP operations include
`GetLibraryUserOrderListAsync()` and `CreateLoanAsync()`. The UNI-Login ID
(`uniid`) is used as the `cardnumber` parameter. These calls return the same
data structure (`orderId`, `identifier`) that the reader/player needs. This path
is outside the React codebase — see the `dpl-go` repository for details.

### Ebook reader

The `Reader` component (`src/components/reader-player/Reader.tsx`) renders
ebooks via **script injection** — external PubHub scripts are loaded into
`<head>` and they take over a `<div id="pubhub-reader">`. This is not an iframe.

On mount it dynamically appends the following assets to `<head>`:

- `https://reader.pubhub.dk/2.2.0/js/chunk-vendors.js`
- `https://reader.pubhub.dk/2.2.0/js/app.js`
- `https://reader.pubhub.dk/2.2.0/css/chunk-vendors.css`
- `https://reader.pubhub.dk/2.2.0/css/app.css`

It renders a `<div id="pubhub-reader">` with custom attributes that the external
scripts use to initialise the reading UI:

- **Loaned book**: `order-id={orderid}` — route: `/reader?orderid=X`
- **Teaser/sample**: `identifier={identifier}` — route: `/reader?identifier=X`
- Both modes set `close-href="javascript:window.history.back()"` to navigate
  back when the reader is closed.

Assets are cleaned up from `<head>` on unmount.

### Audio player

The `Player` component (`src/components/reader-player/Player.tsx`) renders audio
content in an `<iframe>` hosted by PubHub.

- **Loaned audio**: `https://play.pubhub.dk/index141.html?o={orderId}`
- **Teaser/sample**: `https://play.pubhub.dk/index141.html?i={identifier}`

It also loads the player kernel script on mount:

- `https://play.pubhub.dk/1.3.0/js/player-kernel.min.js`

Assets are cleaned up from `<head>` on unmount.

### Asset management

Both reader and player use shared helpers from
`src/components/reader-player/helper.ts`:

- `appendAsset()` — creates a `<script>` or `<link>` element and appends it to
  `<head>`.
- `removeAppendedAssets()` — removes all previously appended elements from
  `<head>`.

## Error handling

### PublizonServiceError

Non-200 responses from the Publizon API throw a `PublizonServiceError`
(`src/core/publizon/mutator/PublizonServiceError.ts`). It extends
`FetcherHttpError` and includes the parsed `responseBody` (an `ApiResult` with
`code` and `message`).

If the response is not valid JSON, the fetcher catches the `SyntaxError` and
returns `null`. Any other fetch failure throws a `FetchFailedCriticalError`.

### Error codes

The Publizon API returns numeric error codes. These are mapped to translatable
user-facing messages in `src/core/utils/helpers/publizon.ts`:

| Code | Meaning |
|------|---------|
| 101 | Success |
| 105 | Invalid content identifier / book not available |
| 114 | Invalid card number/PIN |
| 118 | Unexpected error |
| 120 | Max concurrent loans exceeded |
| 125, 126 | Monthly loan limit reached |
| 128 | Content not found / not available for loan |
| 129 | Book can only be renewed once |
| 130 | Book can be borrowed again in 90 days |
| 131 | Book cannot be borrowed |
| 133 | Unexpected error |
| 134 | Card temporarily blocked |
| 135, 136 | Book cannot be borrowed (max loans on title / insufficient copies) |
| 137 | Reservation limit reached (up to 3 titles) |
| 138, 139 | Unexpected error (generic fault / invalid agreement) |
| 140 | Already reserved |
| 141 | Invalid email address |
| 142 | Invalid phone number |
| 143 | Simultaneous "blue" (cost-free) loans exceeded |
| 144 | Unknown error at library |
| 145 | Library server not responding |
| 146 | No access — user not resident |
| 147 | No country found with given country code |
| 148 | Unexpected error (invalid institution ID) |

## Key source files

| File | Purpose |
|------|---------|
| `src/core/publizon/publizon-adapter.yaml` | OpenAPI spec |
| `src/core/publizon/publizon.ts` | Generated React Query hooks |
| `src/core/publizon/mutator/fetcher.ts` | Auth & request execution |
| `src/core/publizon/mutator/PublizonServiceError.ts` | Error class |
| `src/core/token.js` | Token storage |
| `src/core/mount.js` | Global `window.dplReact` init (setToken, mount) |
| `src/core/url.slice.ts` | Redux URL slice |
| `src/core/utils/url.tsx` | `withUrls` HOC — extracts URL props into Redux |
| `src/core/fetchers/helpers.ts` | URL building (`getServiceUrlWithParams`) |
| `src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts` | URL routing |
| `src/core/storybook/serviceUrlArgs.ts` | Storybook default URLs |
| `src/components/reader-player/Reader.tsx` | Ebook reader component |
| `src/components/reader-player/Player.tsx` | Audio player component |
| `src/components/reader-player/helper.ts` | Asset management & type routing |
| `src/core/utils/useReaderPlayer.tsx` | Loan/reservation state hook |
| `src/core/utils/helpers/publizon.ts` | Error code mapping |
| `src/components/availability-label/types.ts` | Loan status codes |
