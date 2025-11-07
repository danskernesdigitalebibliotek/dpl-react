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
  // Query control (omit query for uncontrolled)
  query?: string;
  onQueryChange?: (q: string) => void;
  // UI flags
  showEmptyStates?: boolean;
  optionsStatic?: boolean;
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
  query: controlledQuery,
  onQueryChange,
  showEmptyStates = false,
  optionsStatic
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const q = controlledQuery ?? internalQuery;

  const filtered = useMemo(() => {
    const qstr = q.trim().toLowerCase();
    if (!qstr) return items;
    return items.filter((i) => i.label.toLowerCase().includes(qstr));
  }, [items, q]);

  const isMulti = multiple === true;
  const valueDefault = value ?? (isMulti ? [] : null);

  return (
    <Combobox
      multiple={isMulti}
      value={valueDefault}
      onChange={(next) => onChange?.(next as Option & Option[])}
      by={compareOptions}
    >
      {label ? <Label className={labelClassName}>{label}</Label> : null}

      <ComboboxInput
        className={clsx("advanced-search-combobox-input", classes?.input)}
        onChange={(e) => {
          const v = e.currentTarget.value;
          if (controlledQuery === undefined) setInternalQuery(v);
          onQueryChange?.(v);
        }}
        displayValue={(val: Option | Option[] | null) => {
          if (isMulti) return q;
          return val && !Array.isArray(val) ? val.label : "";
        }}
        placeholder={placeholder}
      />

      <ComboboxOptions className={classes?.options} static={optionsStatic}>
        {showEmptyStates && filtered.length === 0 && q.length > 0 && (
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
