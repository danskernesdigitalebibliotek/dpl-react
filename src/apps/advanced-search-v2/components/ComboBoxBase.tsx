import React, { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label
} from "@headlessui/react";
import clsx from "clsx";
import type { Option } from "../suggestions";

const compareOptions = (a: unknown, b: unknown) => {
  const ao = a as Option | null | undefined;
  const bo = b as Option | null | undefined;
  return ao?.value === bo?.value;
};

export type ComboBoxClasses = {
  input?: string;
  options?: string;
  option?: string;
};

export type ComboBoxBaseProps = {
  items: Option[];
  multiple?: boolean;
  value?: Option | Option[] | null;
  onChange?: (next: Option | Option[]) => void;
  placeholder?: string;
  classes?: ComboBoxClasses;
  // Custom option rendering
  renderOption?: (
    item: Option,
    state: { selected: boolean; focus: boolean }
  ) => React.ReactElement;
  // Optional Label rendered inside Combobox
  label?: React.ReactNode;
  labelClassName?: string;
  // Callback when query changes (useful for API calls)
  onQueryChange?: (q: string) => void;
  // UI flags
  showEmptyStates?: boolean;
  optionsStatic?: boolean;
  // Allow free input (user doesn't have to select a suggestion)
  allowFreeInput?: boolean;
};

const ComboBoxBase: React.FC<ComboBoxBaseProps> = ({
  items,
  multiple = false,
  value,
  onChange,
  placeholder = "Start typing …",
  classes,
  renderOption,
  label,
  labelClassName,
  onQueryChange,
  showEmptyStates = false,
  optionsStatic,
  allowFreeInput = false
}) => {
  // Track the query string internally
  const [query, setQuery] = useState("");

  // Track whether user has pressed arrow keys to navigate suggestions
  // This distinguishes between: "user typing freely" vs "user navigating to select"
  const [userHasNavigated, setUserHasNavigated] = useState(false);

  // Filter suggestions based on the current query
  const filtered = useMemo(() => {
    const qstr = query.trim().toLowerCase();
    if (!qstr) return items;
    return items.filter((i) => i.label.toLowerCase().includes(qstr));
  }, [items, query]);

  const isMulti = multiple === true;

  // In free input mode, set value to null to prevent Headless UI from auto-selecting items
  // This allows users to type freely without being forced to select from the list
  const valueDefault = allowFreeInput ? null : (value ?? (isMulti ? [] : null));

  return (
    <Combobox
      multiple={isMulti}
      value={valueDefault}
      onChange={(selectedValue) => {
        // Notify parent component of the selected value
        onChange?.(selectedValue as Option & Option[]);

        // In free input mode, sync the query with the selected suggestion's label
        // This ensures the input shows what was selected while still allowing further typing
        if (allowFreeInput && selectedValue && !Array.isArray(selectedValue)) {
          const selectedLabel = (selectedValue as Option).label;
          setQuery(selectedLabel);
          onQueryChange?.(selectedLabel);
        }
      }}
      by={compareOptions}
    >
      {label ? <Label className={labelClassName}>{label}</Label> : null}

      <ComboboxInput
        className={clsx("advanced-search-combobox-input", classes?.input)}
        onChange={(e) => {
          const v = e.currentTarget.value;

          // Update internal query state
          setQuery(v);

          // Notify parent of query changes (for API calls, etc.)
          onQueryChange?.(v);

          // When user types, reset navigation state - they're back to "free input" mode
          // This means pressing Enter will now submit free text instead of selecting a suggestion
          if (allowFreeInput) setUserHasNavigated(false);
        }}
        onKeyDown={(e) => {
          // Only handle special keyboard behavior in free input mode
          if (!allowFreeInput) return;

          const isNavKey = ["ArrowDown", "ArrowUp"].includes(e.key);

          // Track arrow key navigation to enable selection mode
          if (isNavKey) {
            // Special case: Headless UI auto-focuses the first item when dropdown opens
            // If user presses arrow down for the first time, prevent default navigation
            // This keeps focus on the first item instead of moving to the second
            if (!userHasNavigated && e.key === "ArrowDown") {
              e.preventDefault();
            }
            // Mark that user is now in "navigation/selection" mode
            setUserHasNavigated(true);
          }

          // Handle Enter key - behavior depends on whether user navigated with arrows
          if (e.key === "Enter") {
            if (!userHasNavigated) {
              // User hasn't used arrow keys - they're submitting their typed text
              // Prevent Headless UI from selecting the auto-focused first item
              e.preventDefault();
              e.stopPropagation();
              e.currentTarget.blur(); // Close dropdown
            } else {
              // User navigated with arrows - allow selection, then reset state
              setUserHasNavigated(false);
            }
          }

          // Escape key closes dropdown and resets to free input mode
          if (e.key === "Escape") {
            setUserHasNavigated(false);
          }
        }}
        displayValue={(val: Option | Option[] | null) => {
          // For multiple selection, always show the query
          if (isMulti) return query;

          // In free input mode, always display the query string (not the selected value)
          // This allows users to continue typing freely even after selecting a suggestion
          if (allowFreeInput) return query;

          // In standard mode, show the selected option's label
          return val && !Array.isArray(val) ? val.label : "";
        }}
        placeholder={placeholder}
      />

      <ComboboxOptions className={classes?.options} static={optionsStatic}>
        {showEmptyStates && filtered.length === 0 && query.length > 0 && (
          <li className="advanced-search-combobox-option">No results</li>
        )}
        {showEmptyStates && items.length === 0 && (
          <li className="advanced-search-combobox-option">
            No items available
          </li>
        )}

        {filtered.map((item) => (
          <ComboboxOption
            key={item.value}
            value={item}
            className={({ focus, selected }) =>
              clsx("advanced-search-combobox-option", classes?.option, {
                // In free input mode: only show focus styling after user presses arrow keys
                // This prevents the first item from appearing focused when dropdown opens
                // In standard mode: always show focus styling when item is focused
                "is-focus": focus && (allowFreeInput ? userHasNavigated : true),
                "is-selected": selected
              })
            }
          >
            {(state) =>
              renderOption ? renderOption(item, state) : <>{item.label}</>
            }
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default ComboBoxBase;
