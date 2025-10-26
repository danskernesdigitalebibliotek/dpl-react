# FBS Intercepts

This directory contains Cypress intercepts for mocking FBS (Fælles
Bibliotekar Service) API responses in tests.

## Overview

The FBS intercepts use [Fishery](https://github.com/thoughtbot/fishery)
factories to generate realistic test data for library availability and
holdings. This approach provides:

- **Consistent test data** across all tests
- **Flexible scenario-based mocking** for different availability states
- **Realistic factory-generated data** that mirrors production responses
- **Type-safe** mock data using TypeScript

## Architecture

### Core Files

- **`fbs.ts`** - Main intercept setup and helper functions
- **`scenarios.ts`** - Predefined availability/holdings scenarios
- **`../../factories/fbs/`** - Factory definitions for FBS data structures
  - `availability.factory.ts` - Creates availability responses
  - `holdings.factory.ts` - Creates holdings and material data

### How It Works

1. **PID Mapping**: Tests use manifestation PIDs (e.g.,
   `870970-basis:52557240`) to identify materials
2. **Numeric Extraction**: FBS API requests use only the numeric portion
   (e.g., `52557240`)
3. **Scenario Lookup**: Each PID maps to a predefined scenario (available,
   unavailable, etc.)
4. **Factory Generation**: Factories build realistic response data based on
   the scenario

```typescript
// Request flow:
manifestationScenarios.get("52557240") 
  → scenarios.unavailableEverywhere
  → availabilityFactory.build({ available: false, reservable: true })
  → Response sent to test
```

## Default Manifestation Scenarios

The intercepts automatically handle these default materials:

| Material | PID | Scenario |
|----------|-----|----------|
| Original book (2016) | `52557240` | `unavailableEverywhere` |
| New book (2017) | `53292968` | `default` |
| Audiobook | `52643414` | `notAvailableAnywhere` |
| E-book | `9788702441000` | `reservableButNoHoldings` |

## Usage

### Basic Setup

```typescript
import { interceptFbsCalls } from "cypress/intercepts/fbs/fbs";

beforeEach(() => {
  interceptFbsCalls(); // Sets up default intercepts
});
```

This automatically handles all FBS availability and holdings requests with
realistic factory data.

### Advanced Usage

#### Test Reservation Flow

```typescript
import { givenReservationWillSucceed } from "cypress/intercepts/fbs/fbs";

it("Should create a reservation", () => {
  givenReservationWillSucceed();
  
  // Test reservation creation...
});
```

## Scenarios Explained

### `default`

- **Use case**: Default scenario - material available at multiple libraries
  with mixed availability
- **Note**: This is also used as the fallback for unknown PIDs
- **Data**:
  - Available: `true` (overall - at least one copy available somewhere)
  - Reservable: `true`
  - Holdings at Hovedbiblioteket (2 available, 1 checked out)
  - Holdings at Islands Brygge (3 available, 2 checked out)
  - Holdings at Fjernlager (1 available, 0 checked out)
  - Holdings at Vesterbro (0 available, 2 checked out)

### `unavailableEverywhere`

- **Use case**: All copies are checked out but can be reserved
- **Data**:
  - Available: `false`
  - Reservable: `true`
  - Holdings at Hovedbiblioteket (0 available, 2 checked out)

### `notAvailableAnywhere`

- **Use case**: Material is not in the library collection
- **Data**:
  - Available: `false`
  - Reservable: `false`
  - No holdings

### `reservableButNoHoldings`

- **Use case**: Digital materials (e-books, audiobooks) with a queue
- **Data**:
  - Available: `false`
  - Reservable: `true`
  - Reservations: `2` (people in queue)
  - No physical holdings

## Extending

### Adding New Scenarios

To add a custom scenario, edit `cypress/intercepts/fbs/scenarios.ts`:

```typescript
export const scenarios = {
  // ... existing scenarios
  
  myCustomScenario: {
    availability: {
      available: true,
      reservable: false,
      reservations: 5
    } as Partial<AvailabilityV3>,
    holdings: [
      createHoldingsAtLibrary({
        library: libraries.hovedbiblioteket,
        availableCount: 1,
        unavailableCount: 0,
        placement: defaultPlacement
      })
    ]
  }
};
```

Then use it in `fbs.ts`:

```typescript
const manifestationScenarios = new Map([
  // ... existing mappings
  [convertPostIdToFaustId("my-pid"), scenarios.myCustomScenario]
]);
```

### Adding New Materials

To add a new material variant with custom data:

1. Create a new manifestation in `cypress/factories/manifestation/variants/`
2. Add its PID mapping in `fbs.ts`
3. The intercepts will automatically handle it

## Advanced Customization

### Custom Placement

By default, all materials use the `defaultPlacement` ("Voksen" department,
"Skønlitteratur" section). To create holdings with different placement:

```typescript
const childrenPlacement = {
  department: { id: "bo", name: "Børn" },
  section: { id: "Billedbøger", name: "Billedbøger" }
};

createHoldingsAtLibrary({
  library: libraries.hovedbiblioteket,
  availableCount: 5,
  unavailableCount: 0,
  placement: childrenPlacement
});
```

## Troubleshooting

### Material showing wrong availability

Check that:

1. The PID is correctly mapped in `manifestationScenarios`
2. The faust ID portion of the PID matches (use `convertPostIdToFaustId()`)
3. The scenario has the correct `available` and `reservable` flags

### Holdings not showing up

Verify that:

1. The scenario includes `holdings` array
2. Holdings have materials with correct `available` flags
3. Library branch IDs match expected format (`DK-710100`, etc.)

### Type errors

Ensure factory data matches the FBS model types in `src/core/fbs/model.ts`

## Related Documentation

- [Fishery Factory Documentation](https://github.com/thoughtbot/fishery)
- [FBS API Documentation](https://fbs-openplatform.dbc.dk/v3/api-docs)
- [Cypress Intercept Guide](https://docs.cypress.io/api/commands/intercept)
