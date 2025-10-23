# FBS Intercepts - How It Works

Intercept system for mocking FBS (Folkebibliotekernes Bibliotekssystem) API
responses in Cypress tests.

## Quick Start

```typescript
import { interceptFbsCalls } from "cypress/intercepts/fbs/interceptFbsCalls";

beforeEach(() => {
  interceptFbsCalls();
});
```

That's it! The system will now intercept all FBS API calls and return
pattern-based responses.

## How It Works

### 1. **Manifestations are registered with patterns**

In `interceptFbsCalls.ts`, each manifestation (book edition) is assigned an
availability pattern:

```typescript
// 2016 edition: show on shelves but all checked out
registerManifestationAvailability(
  originalBookManifestation.pid,
  AvailabilityPattern.ON_SHELF_BUT_UNAVAILABLE
);

// 2017 edition: available at all libraries
registerManifestationAvailability(
  newBookManifestation.pid,
  AvailabilityPattern.AVAILABLE_EVERYWHERE
);
```

### 2. **Patterns define library holdings**

In `availabilityPatterns.ts`, each pattern specifies which libraries have
the material and how many copies.

We use helper functions for cleaner, more readable configuration:

```typescript
[AvailabilityPattern.AVAILABLE_EVERYWHERE]: {
  reservable: true,
  reservations: 0,
  available: true,
  branches: [
    branch({
      library: libraries.hovedbiblioteket,
      available: 2,
      unavailable: 1,
      placement: { department: "Voksen", section: "Skønlitteratur" }
    }),
    branch({
      library: libraries.islandsBrygge,
      available: 3,
      unavailable: 2,
      placement: { department: "Voksen", section: "Skønlitteratur" }
    }),
    branch({
      library: libraries.fjernlager,
      available: 1,
      unavailable: 0,
      placement: { department: "Voksen", section: "Skønlitteratur" }
    })
  ]
}
```

**Helper function:**

- `branch(options)` - Creates a branch entry with named properties (all required):
  - `library` - Library from `libraries` config
  - `available` - Number of available copies
  - `unavailable` - Number of checked out copies
  - `placement` - Placement with `department` and `section`

### 3. **API calls are intercepted and responses generated**

`interceptFbsCalls()` is the glue that makes everything work. It uses
Cypress's `cy.intercept()` to catch FBS API calls before they reach the real
server.

#### What it does

1. **Registers manifestations** - Maps book PIDs to patterns:

   ```typescript
   registerManifestationAvailability(
     "870970-basis:52557240",  // Book ID
     AvailabilityPattern.AVAILABLE_EVERYWHERE  // Which pattern
   );
   ```

2. **Intercepts availability API** - Catches calls to
   `/catalog/availability/`:

   ```text
   Real: GET https://fbs.../availability/?recordid=870970-basis:52557240
   Intercepted: Cypress catches it, returns fake data
   ```

3. **Intercepts holdings API** - Catches calls to
   `/catalog/holdingsLogistics/`:

   ```text
   Real: GET https://fbs.../holdingsLogistics/?recordid=870970-basis:52557240
   Intercepted: Cypress catches it, returns fake data
   ```

#### The flow

```typescript
// Your React app requests:
fetch("/fbs/availability/?recordid=870970-basis:52557240")

// Cypress intercepts it:
cy.intercept("GET", "**/availability/**", (req) => {
  const recordIds = extractRecordIdsFromUrl(req.url);  // ["870970-basis:52557240"]
  const response = getFbsAvailabilityResponse(recordIds);  // Generate fake data
  req.reply({ statusCode: 200, body: response });  // Return it
});

// Your React app receives fake data as if from real server
```

#### Why two different APIs?

FBS has two separate endpoints:

1. **Availability API** (`/availability/`) - Quick check:
   - Is it available? (true/false)
   - How many reservations?
   - Is it reservable?

2. **Holdings API** (`/holdingsLogistics/`) - Detailed info:
   - Which specific libraries?
   - How many copies at each?
   - Exact placement (department/section)
   - Individual item barcodes

Both use the same pattern system, so data stays consistent.

## Changing Number of Copies

### Add more copies at a library

Simply change the numbers:

```typescript
branch({
  library: libraries.hovedbiblioteket,
  available: 5,
  unavailable: 3,
  placement: { department: "Voksen", section: "Skønlitteratur" }
})
// Result: 5 available, 3 checked out = 8 total
```

### Add the material to another library

Add another `branch()` call to the `branches` array:

```typescript
branches: [
  branch({
    library: libraries.hovedbiblioteket,
    available: 1,
    unavailable: 0,
    placement: { department: "Voksen", section: "Skønlitteratur" }
  }),
  branch({
    library: libraries.islandsBrygge,
    available: 1,
    unavailable: 1,
    placement: { department: "Voksen", section: "Skønlitteratur" }
  })
]
```

### Remove material from a library

Simply remove that library's `branch()` call from the `branches` array.

### Custom placement (different section)

Change the `placement` property:

```typescript
branches: [
  branch({
    library: libraries.hovedbiblioteket,
    available: 0,
    unavailable: 2,
    placement: { department: "Voksen", section: "Historiske romaner" }
  })
]
```

**Note:** In real libraries, the same book wouldn't be in multiple sections.
Use different manifestations (editions) for different placements.

## Available Patterns

| Pattern | Description |
|---------|-------------|
| `ONLY_AVAILABLE_ON_MAIN_LIBRARY` | Material only at Hovedbiblioteket |
| `AVAILABLE_EVERYWHERE` | Material at all 3 libraries |
| `AVAILABLE_ON_TWO_LIBRARIES` | Material at 2 libraries |
| `MAIN_LIBRARY_UNAVAILABLE_OTHERS_AVAILABLE` | Material NOT at main library |
| `ON_SHELF_BUT_UNAVAILABLE` | Material exists but all copies checked out |
| `NOT_AVAILABLE_ANYWHERE` | Material not in collection |
| `IS_RESERVABLE_EVERYWHERE` | No physical copies, but can be reserved |

## Creating a New Pattern

Add the pattern to `availabilityPatterns.ts`:

```typescript
export enum AvailabilityPattern {
  // ... existing patterns
  MY_CUSTOM_PATTERN = "MY_CUSTOM_PATTERN"
}

export const availabilityConfigMap: Record<
  AvailabilityPattern,
  AvailabilityConfigType
> = {
  // ... existing patterns
  [AvailabilityPattern.MY_CUSTOM_PATTERN]: {
    reservable: true,
    reservations: 5,
    available: true,
    branches: [
      branch({
        library: libraries.hovedbiblioteket,
        available: 1,
        unavailable: 1,
        placement: { department: "Voksen", section: "Skønlitteratur" }
      })
    ]
  }
};
```

Register a manifestation with your pattern in `interceptFbsCalls.ts`:

```typescript
registerManifestationAvailability(
  "870970-basis:12345678",
  AvailabilityPattern.MY_CUSTOM_PATTERN
);
```

## Architecture

```text
Test makes API call
       ↓
interceptFbsCalls intercepts request
       ↓
extractRecordIdsFromUrl(["52557240", "53292968"])
       ↓
For each recordId:
  - getAvailabilityConfig(recordId) → looks up pattern
  - createHoldingsForManifestation(recordId) → generates holdings
       ↓
Return mocked response
```

## Files Overview

- **`availabilityPatterns.ts`** - Pattern definitions with `branch()` helper
  function
- **`helpers.ts`** - All response builders and utility functions
  - URL parsing (`extractRecordIdsFromUrl`)
  - Config lookup (`getAvailabilityConfig`)
  - Response generation (`getFbsAvailabilityResponse`,
    `getFbsHoldingsResponse`)
  - Holdings creation (`createHoldingsForManifestation`)
- **`interceptFbsCalls.ts`** - Registers manifestations and intercepts API
  calls
- **`manifestationPatternsMap.ts`** - Maps PIDs to patterns
- **`libraryConfig.ts`** - Defines the 3 test libraries

## Tips

- All `branch()` parameters are required for explicitness
- `available` = copies on shelf, `unavailable` = checked out copies
- Always specify `unavailable` even if 0 (e.g., `unavailable: 0`)
- Always specify `placement` (usually `{ department: "Voksen", section:
  "Skønlitteratur" }`)
- Each library should only have one placement per book (realistic behavior)
