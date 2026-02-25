# Headless UI

## Context

The `advanced-search-v2` app requires several complex, accessible UI components:

- A single-select dropdown for search term types
- A multi-select dropdown with search functionality for facets
- An autosuggest combobox for free-text search input
- A range selector with radio button presets and custom inputs

These components need to comply with modern accessibility standards (ARIA patterns)
while allowing full control over styling and behavior. The existing codebase uses
Downshift (see [ADR-003](./adr-003-downshift.md)) for similar functionality, but
the new advanced search feature requires additional component types (Listbox,
Popover, RadioGroup) not covered by Downshift.

## Decision

We chose [Headless UI](https://headlessui.com/) (`@headlessui/react`) for the
new `advanced-search-v2` components. Headless UI is a set of completely unstyled,
fully accessible UI components designed to integrate with Tailwind CSS but works
with any styling approach.

The library enhances the following components:

- **Combobox** - Used in `ComboBoxAutosuggest.tsx` and `MultiSelect.tsx` for
  autosuggest and multi-select functionality with keyboard navigation
- **Listbox** - Used in `SearchTermSelect.tsx` for the search term type selector
- **Popover** - Used in `MultiSelect.tsx` and `RangeSelect.tsx` for
  dropdown panels that overlay content
- **RadioGroup/Radio** - Used in `RangeSelect.tsx` for range presets

Headless UI was chosen because:

1. **Accessibility out of the box** - Full WAI-ARIA compliance for all components
2. **Unstyled components** - Complete styling freedom to match our design system
3. **Broader component coverage** - Provides Listbox, Popover, and RadioGroup
   which Downshift does not offer
4. **Active maintenance** - Backed by Tailwind Labs with regular updates

## Alternatives considered

### Extending Downshift usage

Downshift excels at combobox/autocomplete patterns but does not provide Listbox,
Popover, or RadioGroup components. We would need additional libraries or custom
implementations for these, leading to inconsistent patterns across components.

### Radix UI

Radix UI is another headless component library with similar goals. However,
Headless UI has a simpler API and is sufficient for our needs. Both libraries
are viable options. Radix UI is furthermore not supported anymore.

### Radix UI + Shadcn

Shadcn is a collection of reusable components built on top of Radix UI with
Tailwind CSS styling. While this combination provides pre-styled components that
could accelerate development, it introduces an opinionated design system (tailwind) that is
not aligned with our existing workflow. Additionally, since Radix UI itself
is no longer actively maintained, building on top of it through Shadcn carries
long-term maintenance risks.

### Base UI

Base UI provides unstyled React components similar to Headless UI.
While it offers comprehensive component coverage and strong accessibility features,
it remains in release candidate state at the time of writing
and is therefore not considered a viable option for production use.

### Ariakit

Ariakit is a comprehensive toolkit for building accessible React components with
a focus on composition and flexibility. However, as it has not yet reached
a stable release state, we do not consider it a viable option for this project.

### Building custom accessible components

Building accessible components from scratch would require significant effort to
ensure ARIA compliance, keyboard navigation, and focus management. Using a
battle-tested library reduces risk and development time.

## Consequences

### Positive / Considerations

- **Consistent patterns in advanced-search-v2** - All interactive components
  in the new advanced search feature use the same library, providing a
  consistent developer experience.
- **Styling responsibility** - All visual styling must be implemented manually.
  Components use BEM-style CSS classes (e.g., `hui-multiselect`, `range-select`)
  for styling.
- **Bundle size** - Adds approximately 15-20KB to the bundle (gzipped). This is
  offset by the reduced need for custom accessibility implementations.
- **Future consideration** - When updating older components, consider migrating
  to Headless UI for consistency, or continue using Downshift if it better fits
  the specific use case.

### Negative / Considerations

- **Coexistence with Downshift** - The codebase now uses two UI
  libraries. Downshift remains in use for existing components (search bar,
  autosuggest, multiselect in other apps). This is acceptable as they serve
  different parts of the application.
