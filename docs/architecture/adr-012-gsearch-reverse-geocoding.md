# ADR: Reverse Geocoding with GSearch v2.0

## Status

Accepted

## Context

The "Find my location" button in the address search bar uses the browser's Geolocation API to get the user's coordinates,
then reverse geocodes them to a Danish address.
The original implementation called a non-existent GSearch v2.0 endpoint (`/adgangsadresse_reverse`), which returned a 404.

## Investigation

### GSearch v2.0 has no reverse geocoding

The GSearch v2.0 API (<https://github.com/SDFIdk/gsearch/tree/v2.0/doc>) is a text-search API. It exposes these resources:

- `adresse`, `husnummer`, `navngivenvej`, `kommune`, `matrikel`, `matrikel_udgaaet`,
  `opstillingskreds`, `politikreds`, `postnummer`, `region`, `retskreds`, `sogn`, `stednavn`

All endpoints **require** a `q` (text query) parameter. The GitHub repo has zero references to "reverse" geocoding.
The `adgangsadresse_reverse` endpoint that was in the code never existed in GSearch v2.0.

### DAWA has reverse geocoding but is deprecated

DAWA (`api.dataforsyningen.dk/adgangsadresser/reverse`) works perfectly for reverse geocoding but is closing **July 1, 2026**.

### WFS service at kort.aws.dk works but is part of DAWA infrastructure

The WFS endpoint at `kort.aws.dk/geoserver/aws4_wfs/wfs` supports `DWITHIN` spatial queries
with WGS84 input (`SRID=4326;POINT(lng lat)`). It does not require a token.
However, it is part of the DAWA infrastructure that is closing July 1, 2026.

### GSearch spatial filter workaround

GSearch v2.0 supports ECQL spatial filters via the `filter` parameter:

- `BBOX(geometri, minX, minY, maxX, maxY, 'epsg:25832')`
- `INTERSECTS(geometri, POLYGON((...)))`

Coordinates in filters **must** be in EPSG:25832 (ETRS89 / UTM zone 32N).

### `srid` parameter is incompatible with spatial filters

The GSearch API documents a `srid` query parameter to control the output coordinate system (e.g. `srid=4326` for WGS84).
However, combining `srid=4326` with a `filter` parameter returns **400 Bad Request** (`UnableToExecuteStatementException: Invalid input`).
Without `srid`, results default to EPSG:25832 coordinates. This means we must convert the returned coordinates ourselves.

## Decision

Use GSearch v2.0 with a `BBOX` spatial filter to approximate reverse geocoding:

1. Convert WGS84 coordinates (from browser geolocation) to EPSG:25832 using `proj4` (the de facto standard library for coordinate transforms)
2. Create a 50m bounding box (25m radius) around the converted point
3. Query `GET /rest/gsearch/v2.0/adresse?q=1&filter=BBOX(geometri,...)&limit=10&token=...`
4. Convert all results to internal format, discarding any with missing coordinates
5. Convert returned EPSG:25832 coordinates back to WGS84 using `proj4`
6. Calculate the Haversine distance from the browser coordinates to each result
7. Return the closest match

## Trade-offs

### Why `q=1`?

GSearch requires a non-blank `q` parameter. Using `q=1` is a broad match because almost all addresses contain a digit
(house numbers, postal codes). Testing showed `q=1` returned 100 results in a 1km BBOX,
outperforming letter-based queries like `q=e` (12 results) or `q=a` (11 results).

### Known limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| Results sorted by text relevance, not distance | API does not return nearest-first | Fetch 10 results and pick the closest by Haversine distance |
| `q=1` doesn't match every address | Addresses without any digit could be missed | Extremely rare in practice |
| Coordinate conversion adds a dependency | `proj4` (~33 kB gzipped) | De facto standard for coordinate transforms, actively maintained |

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| DAWA `/adgangsadresser/reverse` | Closing July 1, 2026 |
| WFS at `kort.aws.dk` | Part of DAWA infrastructure, closing July 1, 2026 |
| Disable the feature | Functional requirement for library finder |

## Future

When Dataforsyningen provides a proper reverse geocoding endpoint (either in GSearch or a successor API),
this workaround should be replaced. Monitor <https://github.com/SDFIdk/gsearch> for updates.
