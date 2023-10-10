/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * DDF Cover Service
 * This service provides covers for library materials indexed by isbn, issn, faust, pid.
The service is provided by [Det Digitale Folkebibliotek](https://detdigitalefolkebibliotek.dk/section/i-brug-paa-biblioteket/cover-service)
### Authentication notes
Authentication is done via OAuth2 against auth.dbc.dk. To obtain a valid token follow the instructions here: [Open Platform](https://openplatform.dbc.dk/v3/). To use the "Authorize" option in this tool use your 'client_id' and 'client_secret' and fill in '@agency' (e.g. '@123456') for both username and password.
 * OpenAPI spec version: 2.0
 */

export type GetCoverCollectionType =
  typeof GetCoverCollectionType[keyof typeof GetCoverCollectionType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetCoverCollectionType = {
  faust: "faust",
  isbn: "isbn",
  issn: "issn",
  pid: "pid"
} as const;
