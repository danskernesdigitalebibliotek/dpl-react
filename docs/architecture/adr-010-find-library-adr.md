# Find Nearest Library Functionality

## Status

Accepted

## Context

The existing patron creation flow allowed users to select a preferred library branch only from a static dropdown (`BranchesDropdown`).

This approach had several limitations:

- **No address-based search:** Users could not search for libraries based on their physical address.
- **No proximity calculation:** Users could not automatically find the closest library.
- **No geolocation support:** The system could not use the browser’s geolocation API to suggest nearby branches.
- **Inconsistent branch data:** Branch objects evolved to include optional `location` structures (`address`, `city`, `lat`, `lng`), resulting in necessary refactoring.
- **UI limitations:** The dropdown was not well-suited for large datasets and provided no contextual help beyond the branch name.

To address these issues, the “Find Library” functionality was introduced as an enhanced, more user-friendly alternative.

## Decision

We introduced a new interactive **Find Library Dialog**, enabling multiple new capabilities:

### 1. **Address-based lookup using Dataforsyningen GSearch API**

A new component, `GSearchInput`, was implemented to query the Danish Dataforsyningen GSearch API v2.0 for address suggestions, using:

- Debounced input
- Async lookup through a dedicated module (`address-lookup/gsearch-requests`)
- Selection handling with lat/lng extraction

**Update (2025):** The original `DawaInput` component was replaced with `GSearchInput` to use the newer GSearch API v2.0, which provides better support and features.

### 2. **Geolocation support**

The dialog now includes a “Use my location” button.
This uses:

- A new `geo-location/getCurrentPosition` helper
- Translation-powered error messages (`geoLocationError*Text`)
- Reverse geocoding via GSearch API (`getReverseGeocode`)

### 3. **Proximity calculation**

We calculate distances using a dedicated utility:

```ts
calculateDistanceBetweenTwoCoordinates(lat1, lng1, lat2, lng2)
```

Branches are sorted by distance when an address or location is known.

### 4. **Updated UI Components**

Two major new UI components were introduced:

- `FindLibraryDialog` — Full-screen/side dialog showing search, geolocation, error states, and results.
- `LibrarySelect` — A button-style input triggering the dialog, including:
  - Selected library preview
  - Hidden `<input required>` for form validation
  - Support for text translations

### 5. **Configuration flag**

A new config option was added:

```ts
branchAddressSearchEnabledConfig: "1"
```

This toggles between:

- old `BranchesDropdown`
- new `LibrarySelect` + `FindLibraryDialog` flow

### 6. **Refactoring to support the feature**

To enable these behaviors cleanly:

- `branchesConfig` now supports optional `location` objects.
- GSearch-related logic was extracted into reusable async functions.
- Geolocation logic was centralized and translation-aware.
- Unused or obsolete components were removed or replaced.
- All text strings were converted to `useText()` keys for translation.

## Alternatives Considered

### 1. **Enhance the existing dropdown**

Rejected because:

- Does not support address lookup
- Not user-friendly with many branches
- Does not support location-based sorting

### 2. **Use GSearch autocomplete directly in the dropdown**

Rejected because:

- UI becomes too complex
- Hard to combine address search + branch selection

### 3. **Integrate with a mapping tool (e.g., Google Maps)**

Rejected due to:

- Higher cost
- Dependence on external services
- Legal concerns around user tracking/data

### 4. **Remove old dropdown entirely**

Rejected for now:

- Maintaining backward compatibility is important
- Allows gradual rollout

## Consequences

### Positive

- Users get a simpler, faster, and more intuitive branch selection flow.
- Geolocation significantly reduces friction for new patrons.
- More maintainable architecture through dedicated utility modules.
- Branch sorting makes the selection process more helpful.

### Negative / Considerations

- Introduces new external dependencies on Dataforsyningen GSearch APIs.
- Requires maintaining translation keys for multiple error states.
- Slightly higher complexity in the UI, with additional modals.
- Geolocation may fail in environments where browser permissions are blocked.
