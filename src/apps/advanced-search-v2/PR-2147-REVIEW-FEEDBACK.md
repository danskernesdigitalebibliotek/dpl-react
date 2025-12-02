# PR #2147 Review Feedback

This document tracks the review feedback from PR #2147 that needs to be addressed.
Each item should be addressed in a separate commit.

**Reviewer:** @kasperg
**PR:** https://github.com/danskernesdigitalebibliotek/dpl-react/pull/2147

---

## High Priority

### 1. Hardcoded Danish strings need translation

- **File:** `components/AdvancedSearchAgeSelect.tsx` (lines 17-21)
- **Issue:** `formatAgeBadge` has hardcoded "årige" strings
- **Fix:** Use `useText()` with placeholders for proper localization
- **Status:** ✅ Completed

### 2. Code duplication between range select components

- **Files:** `AdvancedSearchAgeSelect.tsx` and `AdvancedSearchPublicationYearSelect.tsx`
- **Issue:** These components are ~95% identical
- **Fix:** Extract shared logic into a reusable function or hook
- **Status:** ✅ Completed

### 3. Misleading "suggests" URL parameter naming

- **File:** `hooks/use-form-visibility.ts` (line 27)
- **Issue:** "suggests" is confusing - it's not autocomplete data, it's user input/requirements
- **Fix:** Consider renaming to "filters" or similar
- **Note:** This is a breaking change for existing URLs
- **Status:** ✅ Completed

### 4. Remove unnecessary `shallow: true`

- **File:** `hooks/use-search-form-state.ts` (line 52)
- **Issue:** `shallow: true` is the default value for nuqs
- **Fix:** Remove the redundant option
- **Status:** ✅ Completed

---

## Medium Priority

### 5. Move t() call into operatorMap

- **File:** `components/AdvancedSearchSummary.tsx` (lines 19-24)
- **Issue:** The `t()` call is outside the map, making it harder to analyze translations
- **Fix:** Move translation calls directly into the map values
- **Status:** ✅ Completed

### 6. Add console logging for missing config

- **File:** `components/AdvancedSearchSummary.tsx` (line 46)
- **Issue:** Silent failure when config is not found
- **Fix:** Add console warning to help catch configuration issues
- **Status:** ✅ Completed

### 7. Add comment explaining focus index calculation

- **File:** `components/AdvancedSearchForm.tsx` (lines 45-48)
- **Issue:** The number juggling in `handleRemoveSuggest` is not obvious
- **Fix:** Add explanatory comment about focus management logic
- **Status:** ✅ Completed

### 8. Add comment explaining history: "push"

- **File:** `hooks/use-search-form-state.ts` (line 132)
- **Issue:** Not clear why `history: "push"` is important
- **Fix:** Add comment explaining that this creates browser history entries for back navigation
- **Status:** ✅ Completed

### 9. Move operators to shared constant

- **File:** `components/OperatorButtons.tsx` (lines 17-21)
- **Issue:** Operator config is defined inline
- **Fix:** Extract to a shared constant that can be reused (e.g., in AdvancedSearchSummary)
- **Status:** ⬜ Not started

### 10. Remove unused traceId from GraphQL query

- **File:** `complex-facet-search.graphql`
- **Issue:** `traceId` field is requested but not used
- **Fix:** Remove the unused field
- **Status:** ⬜ Not started

### 11. README.md justification

- **File:** `README.md`
- **Issue:** Reviewer questions the purpose of this documentation file
- **Decision needed:** Keep with justification, move relevant parts to code comments, or remove
- **Status:** ⬜ Not started

---

## Lower Priority

### 12. Confusing useMemo usage

- **File:** `hooks/use-paginated-results.ts` (lines 106-108)
- **Issue:** `useMemo(() => cql, [cql])` is essentially a no-op
- **Fix:** Either remove or add comment explaining the intent (stable reference for effect dependency)
- **Status:** ⬜ Not started

### 13. Use span instead of p inside button

- **File:** `components/SearchTermSelect.tsx` (line 49)
- **Issue:** `<p>` tag inside `<button>` is semantically incorrect
- **Fix:** Change to `<span>`
- **Status:** ⬜ Not started

### 14. Improve aria-expanded accessibility

- **File:** `components/AdvancedSearchFilterGroup.tsx` (line 58)
- **Issue:** `aria-expanded` should be paired with `aria-controls`
- **Fix:** Add `id` to content div and `aria-controls` to button
- **Status:** ⬜ Not started

### 15. Consider using usePrevious() hook

- **File:** `hooks/use-paginated-results.ts` (line 49)
- **Issue:** Manual tracking of `lastQueryStr` state
- **Fix:** Could use `usePrevious()` from react-use for cleaner code
- **Status:** ⬜ Not started

### 16. Review hook return properties

- **File:** `hooks/use-paginated-results.ts` (lines 130-135)
- **Issue:** Some derived properties like `isLoadingOrRefetching` seem trivial
- **Decision needed:** Keep for convenience or compute in consumer
- **Status:** ⬜ Not started

### 17. Consider keepPreviousData from React Query

- **File:** `hooks/use-paginated-results.ts` (lines 96-100)
- **Issue:** Manual pagination state management when React Query has built-in support
- **Decision needed:** Evaluate if `keepPreviousData` could simplify the implementation
- **Status:** ⬜ Not started

### 18. Accessibility: link count to checkbox label

- **File:** `components/AdvancedSearchFilterGroup.tsx` (lines 96-99)
- **Issue:** Count badge should be associated with the checkbox for screen readers
- **Fix:** Use `aria-describedby` or include count in checkbox label
- **Status:** ⬜ Not started

---

## Addressed / Not Applicable

### ✅ Inline styling removed

- **File:** `components/SearchTermSelect.tsx`
- **Original issue:** `style={{ width: "max-content" }}`
- **Status:** Already fixed in current code

### ✅ hasCurrentQuery and showResults properties

- **File:** `hooks/use-form-visibility.ts`
- **Original issue:** Reviewer thought these might be redundant
- **Status:** These are used and provide clear semantic meaning

### ✅ Add button intentionally not using Button component

- **File:** `components/AdvancedSearchForm.tsx` (lines 93-100)
- **Original issue:** Raw `<button>` element instead of the shared `Button` component
- **Reason:** The "add row" button is a specialized UI element with a plus icon and custom
  transparent styling. The shared `Button` component is designed for action buttons (filled/outline)
  and doesn't support custom leading icons. This pattern is consistent with the original
  advanced-search implementation.

---

## Progress Tracking

- Total items: 18
- Completed: 8
- In progress: 0
- Remaining: 10

Last updated: 2025-12-02
