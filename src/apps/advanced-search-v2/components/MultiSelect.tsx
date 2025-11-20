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
import CheckBox from "../../../components/checkbox/Checkbox";

const compareOptions = (a: unknown, b: unknown) => {
  const ao = a as Option | null | undefined;
  const bo = b as Option | null | undefined;
  return ao?.value === bo?.value;
};

export type MultiSelectClasses = {
  input?: string;
  options?: string;
  option?: string;
};

export type MultiSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange: (next: Option[]) => void;
  placeholder?: string;
  classes?: MultiSelectClasses;
  // Optional Label rendered inside Combobox
  label?: React.ReactNode;
  labelClassName?: string;
  // UI flags
  showEmptyStates?: boolean;
  optionsStatic?: boolean;
  // Focus the input when component mounts
  focusOnMount?: boolean;
  enableSearch?: boolean;
  // Controlled search input
  inputValue?: string;
  onInputChange?: (value: string) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = "Start typing…",
  classes,
  label,
  labelClassName,
  showEmptyStates = false,
  optionsStatic = false,
  enableSearch = false,
  inputValue: controlledInputValue,
  onInputChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const [localInputValue, setLocalInputValue] = useState("");

  const isControlled = controlledInputValue !== undefined;
  const inputValue = isControlled ? controlledInputValue : localInputValue;

  const handleInputChange = (value: string) => {
    if (isControlled) {
      onInputChange?.(value);
    } else {
      setLocalInputValue(value);
    }
  };

  // Focus input when component mounts
  useEffect(() => {
    if (enableSearch && inputRef.current) {
      inputRef.current.focus();
    } else {
      optionsRef.current?.focus();
    }
  }, [enableSearch]);

  // Filter suggestions based on the current query
  const filtered = useMemo(() => {
    const qstr = inputValue.trim().toLowerCase();
    if (!qstr) return options;
    return options.filter((i) => i.label.toLowerCase().includes(qstr));
  }, [options, inputValue]);

  return (
    <Combobox
      multiple
      value={selectedOptions}
      onChange={(selectedValue) => {
        // Notify parent component of the selected value
        onChange(selectedValue as Option[]);
      }}
      by={compareOptions}
    >
      {label ? <Label className={labelClassName}>{label}</Label> : null}

      {enableSearch && (
        <ComboboxInput
          ref={inputRef}
          className={clsx("advanced-search-combobox-input", classes?.input)}
          onChange={(e) => {
            handleInputChange(e.currentTarget.value);
          }}
          displayValue={() => inputValue}
          placeholder={placeholder}
        />
      )}

      <ComboboxOptions
        ref={optionsRef}
        className={classes?.options}
        static={optionsStatic}
      >
        {showEmptyStates && filtered.length === 0 && inputValue.length > 0 && (
          <li className="advanced-search-combobox-option">No results</li>
        )}
        {showEmptyStates && options.length === 0 && (
          <li className="advanced-search-combobox-option">
            No options available
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
            <CheckBox
              id={`advanced-search-select-${item.value}`}
              label={item.label}
              selected={selectedOptions.some((opt) => opt.value === item.value)}
              onChecked={() => {}}
              isVisualOnly
            />
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default MultiSelect;
