import React from "react";
import { useCombobox } from "downshift";
import clsx from "clsx";
import type { Option } from "../suggestions";

export type Props = {
  items: Option[];
  onSelect: (item: Option) => void;
  label?: string;
  onQueryChange?: (q: string) => void;
};

const ComboBoxDownshift = ({
  items,
  onSelect,
  label = "Choose an item",
  onQueryChange
}: Props) => {
  const inputItems = items;

  const {
    isOpen,
    highlightedIndex,
    selectedItem,
    getLabelProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps
  } = useCombobox<Option>({
    items: inputItems,
    itemToString: (item) => (item ? item.label : ""),
    onInputValueChange: ({ inputValue }) => {
      onQueryChange?.(inputValue ?? "");
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onSelect(selectedItem);
    }
  });

  return (
    <div className="adv2-combobox">
      <label {...getLabelProps()} className="adv2-combobox__label">
        {label}
      </label>
      <div className="adv2-combobox__row">
        <input
          {...getInputProps({ placeholder: "Start typing …" })}
          className="adv2-combobox__input focus-styling__input"
        />
      </div>
      {isOpen && (
        <ul {...getMenuProps()} className="adv2-combobox__menu">
          {inputItems.map((item, index) => {
            const isHighlighted = highlightedIndex === index;
            const isSelected =
              !!selectedItem && selectedItem.value === item.value;
            return (
              <li
                key={`${item.value}-${index}`}
                {...getItemProps({ item, index })}
                className={clsx("adv2-combobox__option", {
                  "is-active": isHighlighted,
                  "is-selected": isSelected
                })}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ComboBoxDownshift;
