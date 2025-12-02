# Advanced Search V2

This document describes the structure and logic of the code in
`src/apps/advanced-search-v2`.

The app implements a faceted "advanced search" experience backed by the
DBC GraphQL API and a CQL query builder. State is synchronized with the URL
so searches can be deep‑linked and reloaded.

---

## High‑level architecture

At a high level the app consists of:

- **Entry & mounting**: wiring into the hosting shell and Storybook.
- **Form**: a multi‑row query builder with static filters and action
  buttons.
- **URL‑backed state**: search parameters and UI mode are stored in query
  params via `nuqs`.
- **Query builder**: converts URL state into a CQL string.
- **Results + facets**: paginated search results and sidebar facets backed
  by GraphQL.
- **Static configs**: mappings from enums to CQL fields, search indices,
  and filter options.

The main runtime component is `AdvancedSearchV2`, which renders the form
and the results/facets grid.

---

## Entry, mount, and Storybook

### `AdvancedSearchV2.entry.tsx`

`AdvancedSearchEntry` is the integration point with the host site.

- **Props**
  - Extends global URL/config/text props and Storybook args.
  - Defines many advanced‑search specific text properties (labels,
    placeholders, filter titles, etc.).
  - Includes `pageSizeDesktop`, `pageSizeMobile`, branch configs, and
    blacklist configs.
- **Logic**
  - Calculates a `pageSize` from desktop/mobile via `pageSizeGlobal`
    (the internal results hook has its own default page size).
  - Wraps the app in:
    - `GuardedApp app="advanced-search"` – feature guard/shell integration.
    - `NuqsAdapter` – enables `nuqs` URL state hooks.
  - Renders `<AdvancedSearchV2 />` inside these wrappers.
- **Export**
  - Wrapped with `withConfig`, `withUrls`, `withText`, and
    `withPageStatistics` HOCs so it can run as a full-fledged app in the
    existing ecosystem.

### `AdvancedSearchV2.mount.ts`

- Calls `addMount({ appName: "advanced-search-v2", app:
AdvancedSearchV2Entry })`.
- Registers the entry component under the `advanced-search-v2` app name
  so the host can mount it into the DOM.

### `AdvancedSearchV2.stories.tsx`

- Storybook meta+story for `AdvancedSearchV2Entry`.
- Merges global argTypes (service URLs, global texts/config, mapp args,
  sort args) with a **large set of advanced‑search specific argTypes**.
- `Default` story:
  - Provides realistic defaults for all text props and configs (branch
    JSON, labels, placeholders, filter names, etc.).
  - Documents the meaning of each prop via `description` fields.

### `AdvancedSearchV2.tsx`

- Thin container that receives `pageSize` from the entry and passes it through:

  ```tsx
  const AdvancedSearchV2: React.FC<{ pageSize: number }> = ({ pageSize }) => (
    <div className="advanced-search-v2">
      <SearchForm />
      <AdvancedSearchResultsWithFacets pageSize={pageSize} />
    </div>
  );
  ```

- `SearchForm` and `AdvancedSearchResultsWithFacets` are responsible for most behavior.
- The `pageSize` prop is required and flows from entry → V2 → results component.

---

## Core data types

Defined in `types.ts`:

- `Operator = "and" | "or" | "not"` – logical operator between search rows.
- `FilterState` – a single search-row input in the advanced search form:
  - `term: string` – CQL field, e.g. `"term.default"`, `"term.title"`.
  - `query: string` – user input.
  - `operator?: Operator` – logical operator used **before** this row (omitted for first row).
- `FacetState` – unified representation of a selected facet value group, used by
  both the form and sidebar facets:
  - `label: string` – human label shown in the UI/summary.
  - `facetField: ComplexSearchFacetsEnum` – GraphQL facet enum.
  - `selectedValues: string[]` – selected facet values for this field.
- `PreFacetConfig` – discriminated union configuration for form filters:
  - `PreSelectFacetConfig` – `{ type: "select", options: Option[] }`.
  - `PreRangeFacetConfig` – `{ type: "range", presets: RangePreset[] }`.
- `FacetConfig` – simple `{ label, facetField }` used to configure sidebar facet
  groups.

These types underpin URL state and query building.

---

## URL‑backed state and hooks

State is stored in query parameters using `nuqs` so that:

- Searches are shareable via URL.
- The form can have a local "draft" state but search results are always
  based on committed URL state.

### `use-search-form-state.ts`

Manages the **form draft state** and synchronizes it with URL parameters.

- Uses `useQueryStates` on two keys:
  - `filters` – array of `FilterState`, defaulted to `INITIAL_FILTER_INPUTS`.
  - `preSearchFacets` – array of `FacetState`, default `[]`.
- Mirrors these into local React state (`filters`, `preSearchFacets`) so the user can edit the form without immediately changing the URL.
- Exposes:
  - `updateFilter(index, updates)` – update part of a filter input row.
  - `updatePreSearchFacet(preSearchFacet)` – upsert/remove a pre‑search facet based on `facetField` and `selectedValues`.
  - `addFilter()` – append a new row (default: free text with `and` operator).
  - `removeFilter(index)` – remove a row, but ensures at least one row remains.
  - `handleSearch()` – **commit** local state to the URL:
    - Filters out rows with empty `query`.
    - Strips `operator` from the first non‑empty row.
    - Writes `filters` and `preSearchFacets` to URL (or `null` when empty, letting defaults apply).
  - `handleClearFilters()` – reset local and URL state to initial state.

### `use-form-visibility.ts`

Controls whether the full form or a compact summary is shown.

- URL key: `edit` (boolean), default `true`.
- Reads committed URL `filters` and `preSearchFacets` and builds the CQL query
  via `buildCQLQuery`.
- Determines `hasCurrentQuery` using `hasValidQuery`.
- Effect:
  - If there is **no current query** and the form is hidden, it
    automatically shows the form again.
- Returns:
  - `shouldShowForm` – whether to render the full form.
  - `shouldShowSummary` – whether to show the summary bar.
  - `setShowForm(value)` – updates `edit` in the URL.

### `use-search-queries.ts`

Read‑only view of **committed search parameters** from the URL.

- Reads query params via `useQueryState`:
  - `filters: FilterState[]`.
  - `preSearchFacets: FacetState[]`.
  - `onShelf: boolean`.
  - `onlyExtraTitles: boolean`.
- Calls `buildCQLQuery(filters, preSearchFacets, facets, onlyExtraTitles)` to
  get the CQL string.
- Returns:
  - `cql` – current CQL query.
  - `hasQuery` – `false` only when CQL is the wildcard `"*"`.
  - `urlState` – `{ filters, preSearchFacets }` for use in summaries.

### `use-paginated-results.ts`

Fetches paginated search results for the current CQL query.

- Inputs: `{ cql, hasQuery, pageSize }` (all required).
- Uses `usePager` (from `components/result-pager`) to get:
  - `page` – current page index.
  - `PagerComponent` – pagination UI.
  - `resetPage()` – reset to first page.
- Uses `useComplexSearchWithPaginationQuery` to call the GraphQL API with:
  - `cql`, `offset = page * pageSize`, `limit = pageSize`, `filters: {}`.
- Tracks:
  - `resultItems: Work[]`.
  - `hitcount: number`.
  - `isLoading`, `isFetching`, `isRefetching`.
  - `lastQueryStr` – to detect query changes.
  - `canShowZeroResults` – only allow zero‑hits UI after a completed fetch.
- Behavior:
  - When data arrives, updates `hitcount` and `resultItems` (appending
    when `page > 0`).
  - When `cql` changes:
    - Clears results and hitcount.
    - Marks "refetching" and disables zero‑hit display.
    - Stores the new query string and resets the page.

---

## Query building

Implemented in `lib/query-builder.ts` with help from `field-mappings.ts`.

### `buildFilterInputTerms(filters)`

- Iterates over `FilterState[]` and builds a CQL clause for non‑empty `query`s.
- First term: `term="value"`.
- Subsequent terms: prefixed with the row's `operator` (`AND`, `OR`, `NOT`).
- Returns a single string wrapped in parentheses or `""` when there are no valid terms.

### `buildFilterTerms(filters)`

- For each `FilterState`:
  - Looks up its CQL field via `COMPLEX_FACET_TO_CQL_FIELD[facetField]`.
  - Emits `((field="value"))` for each selected value.
- Returns an array of unique filter clause strings.

### `buildCQLQuery(filters, preSearchFacets, facets, onlyExtraTitles?)`

- Constructs CQL as a conjunction of:
  - Filter terms (search input rows).
  - PreSearchFacet terms for form-selected facet values.
  - Facet terms for sidebar-selected facet values.
  - Optional toggle filters:
    - `onShelf` → `term.holdingstatus="OnShelf"` (subject to later
      validation).
    - `onlyExtraTitles` → `term.canAlwaysBeLoaned="true"`.
- If **no parts** are present, returns `"*"` as a wildcard.

### `hasValidQuery(cql)`

- Returns `false` only when the query is exactly `"*"`.

### `field-mappings.ts`

Maps `ComplexSearchFacetsEnum` enum values to CQL field names used by
filters, for example:

- `Specificmaterialtype` → `phrase.specificmaterialtype`.
- `Mainlanguage` → `phrase.mainlanguage`.
- `Genreandform` → `phrase.genreandform`.

This keeps query construction decoupled from GraphQL enum names.

---

## Static configs and utilities

### `initial-state.ts`

- `INITIAL_FILTER_INPUTS` – two default filter input rows:
  - Both free‑text (`term.default`), empty query, operator `"and"`.
- `INITIAL_PRE_SEARCH_FACETS_STATE` – initial form filter configuration.
  - Imports options and presets from `lib/advanced-search-select-options.ts`.
  - Defines type (`"select"` or `"range"`) for each config object (Genre, Language, Year, Age, etc.).

### `facet-configs.ts`

Defines which facets appear in the **sidebar filter list**
(`AdvancedSearchFilters`).

Each `FacetConfig` has a user‑facing label and a `ComplexSearchFacetsEnum`
field, e.g.:

- Format → `Specificmaterialtype`.
- Author / creator → `Creator`.
- Subject → `Subject`.
- Language → `Mainlanguage`.
- Audience, fictional character, genre and form, age group, Lix.

### `search-fields-config.ts`

Describes available **search indices** for suggest rows.

Each `SearchIndexItem` contains:

- `value` – CQL field (`term.default`, `term.title`, `term.subject`,
  etc.).
- `labelKey` – text key used by `useText` for the dropdown label.
- `type: ComplexSuggestionTypeEnum` – tells the GraphQL suggest endpoint
  which suggestion type to use.
- `placeholderKey` – text key for the suggest input placeholder.

Used by:

- `SearchIndexSelect` – to render the index dropdown.
- `AdvancedSearchForm` / `AdvancedSearchFilterRow` – to provide suggestion
  type and placeholder.

### `suggestions.ts`

Normalizes suggestion data from GraphQL into `Option[]`:

- `Option` – `{ label, value, count? }`.
- `suggestionsToOptions(results)`:
  - For each item:
    - Prefers `work.titles.main[0]` when present, otherwise uses `term`.
    - Trims and discards empty values.
    - Produces `{ label, value: label.toLowerCase() }`.
  - Deduplicates by `label`.

---

## Components and UI structure

### Form: `AdvancedSearchForm`

Responsibilities:

- Manages the full advanced search form UI.
- Connects to `useSearchFormState` and `useFormVisibility`.
- Handles focus management when adding new suggest rows.
- Computes whether there are any filters to determine if the Reset button
  should be shown.

Rendered subcomponents:

1. **Summary (when in summary mode)**

   - If `shouldShowSummary` is `true`, renders `AdvancedSearchSummary`
     with an "Edit search" link.

2. **Filter rows**

   - Maps over `filters` and renders one `AdvancedSearchFilterRow` per row.
   - Determines configuration (label/placeholder/suggest type) from
     `SEARCH_INDEX_OPTIONS` based on `suggest.term`.
   - Maintains a `ref` per row pointing at the `SearchIndexSelect` button
     so new rows can be auto‑focused.
   - Manages the operator of a row via the _next_ row's `operator` field.

3. **Static filter selects**

   - Renders a grid of components based on `INITIAL_PRE_SEARCH_FACETS_STATE`.
   - Uses `AdvancedSearchSelect` for `"select"` types.
   - Uses `AdvancedSearchRangeSelects` for `"range"` types (Year, Age).
   - Uses `updatePreSearchFacet` to keep unified filter state consistent.

4. **Action buttons**
   - Renders `AdvancedSearchActionButtons`:
     - Search → `handleSearch` + hides form (summary mode).
     - Reset → `handleClearFilters`, only shown when there is something to clear.

### Filter row: `AdvancedSearchFilterRow`

- Renders a single row composed of:
  - `SearchIndexSelect` – index dropdown; forwarded ref from parent.
  - `ComboBoxBase` – suggestion dropdown with free text input:
    - `allowFreeInput` enabled.
    - Controlled `query` and `onQueryChange`.
    - Placeholder from `t(placeholderKey)`.
  - Optional remove button.
  - Optional `OperatorButtons` below the row when `onOperatorChange` is provided.
- Uses `useComplexSuggestQuery` with `ComplexSuggestionTypeEnum` from
  `SEARCH_INDEX_OPTIONS`
- Transforms GraphQL results into `Option[]` via `suggestionsToOptions`.

### Search index select: `SearchIndexSelect`

- Headless UI `Listbox` that:
  - Reads `SEARCH_INDEX_OPTIONS` to show available indices.
  - Displays the currently selected label via `useText(labelKey)`.
  - Emits `onChange` with the selected `value` string.

### Operator selection: `OperatorButtons`

- Three buttons: AND / OR / NOT, using localized labels.
- Highlights the active operator.
- Updates the parent via `onChange(operator)`.

### Multi‑select filters

`AdvancedSearchSelect`:

- Renders `AdvancedSearchMultiSelect` with:
  - `items: Option[]`.
  - `value: Option[]` representing current selections.
  - `onChange` callback for new selections.

`AdvancedSearchRangeSelects`:

- Used for Year and Age filters.
- Renders `AdvancedSearchMultiSelect` populated with `presets`.
- Maps selected presets to/from the underlying `FacetState` (which stores raw values).

`AdvancedSearchMultiSelect`:

- Uses `Popover` + `PopoverButton` + `PopoverPanel` from headlessui.
- Button shows either:
  - `advancedSearchAllText` when nothing is selected, or
  - `advancedSearchSelectedText` plus a count badge.
- Panel contains a `ComboBoxBase` in `multiple` mode with:
  - Controlled `query` for filtering options.
  - Custom `renderOption` that renders each option as a visual `CheckBox`.

### Generic combobox: `ComboBoxBase`

- Reusable combobox abstraction used by both suggest and multiselect components.
- Features:
  - Single and multiple selection.
  - Free input mode (`allowFreeInput`) with a hidden option to preserve
    arrow navigation.
  - Controlled `query` / `onQueryChange` with local filtering by label.
  - Optional `renderOption` override.
  - Optional `focusOnMount` to focus input when a panel opens.

### Action buttons: `AdvancedSearchActionButtons`

- Two buttons using the shared `Button` component:
  - "Search" – `advancedSearchSearchButtonText`.
  - Optional "Reset" – `advancedSearchResetText`.
- Called from the form with callbacks for search and clear.

### Summary: `AdvancedSearchSummary`

- Reads committed URL state via `useSearchQueries()`.
- Renders a textual summary of:
  - Each non‑empty suggest row with its index label and query value.
  - Each selected filter value (always joined with logical ANDs).
- Displays operators (AND/OR/NOT) between suggest terms using localized
  text keys.
- Optionally renders an "Edit search" link that toggles the form visible.

---

## Results and facets

### `AdvancedSearchResultsWithFacets`

- Connects CQL and pagination to the UI.
- Uses `useSearchQueries()` to get `cql` + `hasQuery`.
- Uses `usePaginatedResults` to get:
  - `resultItems`, `hitcount`, loading flags, `PagerComponent`, `page`.
- Behavior:
  - If `!hasQuery`, renders nothing.
  - Heading shows loading text while fetching, or a hitcount summary otherwise.
  - Layout:
    - Left: `AdvancedSearchFilters` (sidebar).
    - Right: `SearchResultList` and `PagerComponent`.
    - Shows `SearchResultZeroHits` when there are zero hits and the fetch is complete.

### `AdvancedSearchFilters`

- Renders the sidebar filters, combining:
  - Two toggle switches (on shelf, only extra titles) stored in URL params.
  - A list of facet groups from `FACETS_CONFIG`.
- Unified `FilterState[]` is stored in `filters` query param via `nuqs`.
- **Performance**: Fetches all facets defined in `FACETS_CONFIG` in a single
  `useComplexFacetSearchQuery`.
- For each facet config:
  - Reads selected values from URL state.
  - Extracts relevant facet data from the batched response.
  - Renders an `AdvancedSearchFilterGroup` with label, selection, and data.
- When user changes facet selections:
  - Performs an upsert/remove on the unified filters array and writes back to URL.
  - This in turn affects the CQL query and subsequent search results.

### `AdvancedSearchFilterGroup`

- Purely presentational component.
- Receives `facetValues` and `selectedValues` via props.
- Provides collapse/expand and a "show all/show fewer" behavior
  (initially shows 5 values).
- Each value is rendered as a `CheckBox` with an optional count badge.
- On change, calls `onChange(selectedValues)` so the parent can update
  URL state.

### `AdvancedSearchToggle`

- Simple, accessible toggle UI used for:
  - "On shelf" filter.
  - "Only extra titles" filter.
- Controlled component with `checked` and `onChange` props.
- Stored in URL via `useQueryState` so toggling affects the CQL query.

---

## GraphQL integration

- **Suggests**: `complex-suggest.graphql` → `useComplexSuggestQuery` in
  `AdvancedSearchFilterRow`.
  - Driven by `q` (query text) and `type` (from `SEARCH_INDEX_OPTIONS`).
- **Facets**: `complex-facet-search.graphql` →
  `useComplexFacetSearchQuery` in `AdvancedSearchFilters`.
  - Batched request for all facets driven by current `cql`.
- **Results**: `useComplexSearchWithPaginationQuery` (generated hook,
  query defined elsewhere).
  - Driven by `cql`, `offset`, `limit`, and (currently) an empty
    `filters` object.

GraphQL results are transformed into UI state (`Option[]`, facet lists,
`Work[]`) and combined with URL state to keep the UI and the URL
synchronized.

---

## End‑to‑end flow

1. User opens the Advanced Search page.
   - Form is visible (`edit=true` or no active query), with default
     filters and empty preSearchFacets.
2. User types into filter rows and/or selects static filters.
   - `useSearchFormState` updates local `filters` and `preSearchFacets`.
3. User clicks **Search**.
   - `handleSearch()` serializes non‑empty filters and preSearchFacets into URL.
   - `useFormVisibility` hides the form and shows `AdvancedSearchSummary`.
4. `useSearchQueries` sees new URL state.
   - Builds a new CQL query via `buildCQLQuery`.
5. `usePaginatedResults` runs a GraphQL search with the CQL string.
   - Results and hitcount are displayed.
6. User refines search using sidebar facets or toggles.
   - `AdvancedSearchFilters` updates `filters`, `onShelf`, and
     `onlyExtraTitles` in URL.
   - CQL is recomputed; results refetch.
7. User clicks **Edit search** in the summary.
   - `edit` is set to `true` in URL; full form reappears with local state
     synced from URL.

This design keeps the **single source of truth** for executed searches in
the URL, while still allowing a smooth, stateful editing experience in the
form.
