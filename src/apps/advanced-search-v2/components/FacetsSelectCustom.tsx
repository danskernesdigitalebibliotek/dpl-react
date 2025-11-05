import React, { useId, useMemo, useRef, useState } from "react";
import type { Option } from "../suggestions";
import CheckBox from "../../../components/checkbox/Checkbox";
import clsx from "clsx";

export type FacetsSelectProps = {
  items?: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const FacetsSelectCustom: React.FC<FacetsSelectProps> = ({
  items = [],
  label = "Choose items",
  onChange
}) => {
  const inputId = useId();
  const [localQuery, setLocalQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, localQuery]);

  const commit = (value: string) => {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setSelected(next);
    onChange?.(items.filter((i) => next.has(i.value)));
  };

  return (
    <div className="adv2-multiselect" ref={rootRef}>
      <label className="adv2-multiselect__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="adv2-multiselect__row">
        <input
          id={inputId}
          className="adv2-multiselect__search focus-styling__input"
          placeholder="Start typing …"
          value={localQuery}
          onChange={(e) => {
            const v = e.currentTarget.value;
            setLocalQuery(v);
            setActiveIndex(0);
          }}
        />
        <ul
          className="adv2-multiselect__menu"
          role="listbox"
          aria-multiselectable
        >
          {filtered.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isSelected = selected.has(item.value);
            const checkboxId = `${inputId}-cb-${item.value}`;
            return (
              <li
                key={item.value}
                className={clsx("adv2-multiselect__option", {
                  "is-active": isActive
                })}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(item.value);
                }}
              >
                <CheckBox
                  id={checkboxId}
                  label={item.label}
                  selected={isSelected}
                  onChecked={() => commit(item.value)}
                />
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="adv2-combobox__muted">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FacetsSelectCustom;
