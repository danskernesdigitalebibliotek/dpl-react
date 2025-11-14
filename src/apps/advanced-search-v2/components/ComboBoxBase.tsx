import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label
} from "@headlessui/react";
import clsx from "clsx";
import type { Option } from "../lib/suggestions";

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
  // Controlled query value
  query: string;
  // Callback when query changes (useful for API calls)
  onQueryChange: (q: string) => void;
  // UI flags
  showEmptyStates?: boolean;
  optionsStatic?: boolean;
  // Allow free input (user doesn't have to select a suggestion)
  allowFreeInput?: boolean;
  // Focus the input when component mounts
  focusOnMount?: boolean;
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
  query,
  onQueryChange,
  showEmptyStates = false,
  optionsStatic,
  allowFreeInput = false,
  focusOnMount = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // Track whether user has pressed arrow keys to navigate suggestions
  // This distinguishes between: "user typing freely" vs "user navigating to select"
  const [userHasNavigated, setUserHasNavigated] = useState(false);

  // Focus input when component mounts
  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  // Filter suggestions based on the current query
  const filtered = useMemo(() => {
    const qstr = query.trim().toLowerCase();
    if (!qstr) return items;
    return items.filter((i) => i.label.toLowerCase().includes(qstr));
  }, [items, query]);

  const isMulti = multiple === true;

  // In free input mode, start with a hidden option so ArrowDown can move to first real item
  const valueDefault =
    allowFreeInput && !isMulti && !userHasNavigated
      ? { value: "__hidden__", label: "" }
      : (value ?? (isMulti ? [] : null));

  return (
    <Combobox
      multiple={isMulti}
      value={valueDefault}
      onChange={(selectedValue) => {
        // Ignore hidden option selection
        if (
          selectedValue &&
          !Array.isArray(selectedValue) &&
          (selectedValue as Option).value === "__hidden__"
        ) {
          return;
        }

        // Notify parent component of the selected value
        onChange?.(selectedValue as Option & Option[]);

        // In free input mode, sync the query with the selected suggestion's label
        // This ensures the input shows what was selected while still allowing further typing
        if (allowFreeInput && selectedValue && !Array.isArray(selectedValue)) {
          const selectedLabel = (selectedValue as Option).label;
          onQueryChange(selectedLabel);
        }
      }}
      by={compareOptions}
    >
      {label ? <Label className={labelClassName}>{label}</Label> : null}

      <ComboboxInput
        ref={inputRef}
        className={clsx("advanced-search-combobox-input", classes?.input)}
        onChange={(e) => {
          onQueryChange(e.currentTarget.value);
          // Reset to hidden option when typing (enables free input mode)
          if (allowFreeInput) setUserHasNavigated(false);
        }}
        onKeyUp={(e) => {
          if (!allowFreeInput) return;

          // Track arrow navigation (moves away from hidden option to real items)
          const isNavKey = ["ArrowDown", "ArrowUp"].includes(e.key);
          if (isNavKey) setUserHasNavigated(true);
        }}
        displayValue={(val: Option | Option[] | null) => {
          // For multiple selection, always show the query
          if (isMulti) return query;
          // In free input mode, always display the query string (not the selected value)
          if (allowFreeInput) return query;
          // In standard mode, show the selected option's label
          return val && !Array.isArray(val) ? val.label : "";
        }}
        placeholder={placeholder}
      />

      <ComboboxOptions className={classes?.options} static={optionsStatic}>
        {/* Hidden option for free input mode - allows first real item to be selected */}
        {allowFreeInput && filtered.length > 0 && (
          <ComboboxOption
            value={{ value: "__hidden__", label: "" }}
            className="advanced-search-combobox-option"
            style={{ display: "none" }}
          >
            {""}
          </ComboboxOption>
        )}

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
                "is-focus": focus,
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
