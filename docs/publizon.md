# Publizon (PubHub) integration

Publizon (also known as PubHub) is the service behind digital e-material lending
for Danish public libraries. It provides access to ebooks, audiobooks, podcasts,
picture books, and music. This document describes how the React application
integrates with Publizon for authentication, API communication, lending, and
reading/playback.

## Authentication

Requests to the Publizon API use bearer token authentication via the
`Authorization` header.

Two token types are supported (in priority order):

1. **`user`** — represents the authenticated library patron. Preferred when
   available.
2. **`library`** — represents the library organisation. Used as fallback when no
   user token exists.

Token resolution in the fetcher (`src/core/publizon/mutator/fetcher.ts`):

```ts
const token = getToken(TOKEN_USER_KEY) ?? getToken(TOKEN_LIBRARY_KEY);
```

Tokens are stored and retrieved via `getToken()` / `setToken()` in
`src/core/token.js`.

The OpenAPI spec also defines `clientId`, `licenseKey`, and `cardNumber` request
headers. These are injected at the proxy level and are not set by the React
application.

The upstream Publizon API uses OAuth 2.0 password grant with the token endpoint
`https://login.bib.dk/oauth/token`.

## Proxy & base URL

The React app never calls the Publizon API directly. All requests go through a
backend proxy whose base URL is resolved at runtime via Redux middleware.

The middleware (`src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts`)
intercepts `url/addUrlEntries` actions and extracts the key `publizonBaseUrl`
into a module-level store. The fetcher reads this value with:

```ts
getServiceBaseUrl(serviceUrlKeys.publizon) // "publizonBaseUrl"
```

All Publizon API paths are prefixed with `/v1/`, so a typical resolved URL looks
like `{publizonBaseUrl}/v1/user/loans`.

| Environment | Base URL |
|-------------|----------|
| Development (Docker) | `http://publizon-mock.docker` (WireMock) |
| Production  | Configured via `PUBLIZON_BASEURL` env var |

See `docs/request_mocking_wiremock.md` for more on the mock setup.

## API client (auto-generated)

The API client is generated from the OpenAPI spec at
`src/core/publizon/publizon-adapter.yaml` using [Orval](https://orval.dev).
The generated output lives in `src/core/publizon/publizon.ts` and exports React
Query hooks.

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

## Reader & player (iframes)

### Ebook reader

The `Reader` component (`src/components/reader-player/Reader.tsx`) renders
ebooks using external scripts from PubHub.

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
| `src/core/utils/reduxMiddleware/extractServiceBaseUrls.ts` | URL routing |
| `src/components/reader-player/Reader.tsx` | Ebook reader component |
| `src/components/reader-player/Player.tsx` | Audio player component |
| `src/components/reader-player/helper.ts` | Asset management & type routing |
| `src/core/utils/useReaderPlayer.tsx` | Loan/reservation state hook |
| `src/core/utils/helpers/publizon.ts` | Error code mapping |
| `src/components/availability-label/types.ts` | Loan status codes |
