import React, { useMemo, useState } from "react";
import { useCombobox } from "downshift";
import type { Option } from "../suggestions";
import CheckBox from "../../../components/checkbox/Checkbox";
import clsx from "clsx";

export type FacetsSelectProps = {
  items: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const FacetsSelectDownshift: React.FC<FacetsSelectProps> = ({
  items,
  label = "Choose items",
  onChange
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [inputValue, setInputValue] = useState("");

  const filtered = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, inputValue]);

  const {
    isOpen,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    openMenu
  } = useCombobox<Option>({
    items: filtered,
    isOpen: true,
    defaultHighlightedIndex: 0,
    itemToString: (item) => (item ? item.label : ""),
    onInputValueChange: ({ inputValue }) => setInputValue(inputValue ?? ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;
      const next = new Set(selected);
      if (next.has(selectedItem.value)) next.delete(selectedItem.value);
      else next.add(selectedItem.value);
      setSelected(next);
      onChange?.(items.filter((i) => next.has(i.value)));
      requestAnimationFrame(() => openMenu());
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          return { ...changes, isOpen: true, inputValue: state.inputValue };
        case useCombobox.stateChangeTypes.InputChange:
          return { ...changes, isOpen: true };
        default:
          return { ...changes, isOpen: true };
      }
    }
  });

  return (
    <div className="adv2-multiselect">
      <label className="adv2-multiselect__label">{label}</label>
      <div className="adv2-multiselect__row">
        <input
          {...getInputProps({
            placeholder: "Start typing …",
            onFocus: () => openMenu(),
            autoFocus: false
          })}
          className="adv2-multiselect__search focus-styling__input"
        />
        {isOpen && (
          <ul className="adv2-multiselect__menu" {...getMenuProps()}>
            {filtered.length === 0 && (
              <li className="adv2-combobox__muted">No results</li>
            )}
            {filtered.map((item, index) => {
              const isActive = index === highlightedIndex;
              const isSelected = selected.has(item.value);
              const id = `facets-ds-${item.value}`;
              return (
                <li
                  key={item.value}
                  {...getItemProps({ item, index })}
                  className={clsx("adv2-multiselect__option", {
                    "is-active": isActive
                  })}
                  role="option"
                  aria-selected={isSelected}
                >
                  <CheckBox
                    id={id}
                    label={item.label}
                    selected={isSelected}
                    onChecked={() => {}}
                    isVisualOnly
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FacetsSelectDownshift;
