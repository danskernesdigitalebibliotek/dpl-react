import React, { KeyboardEventHandler, useId, useRef, useState } from "react";
import clsx from "clsx";
import { useClickAway } from "react-use";
import type { Option } from "../suggestions";

export type ComboBoxProps = {
  items: Option[];
  onSelect: (item: Option) => void;
  label?: string;
  onQueryChange?: (q: string) => void;
};

const ComboBoxCustom = ({
  items,
  onSelect,
  label = "Choose an item",
  onQueryChange
}: ComboBoxProps) => {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Option | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  useClickAway(rootRef, () => {
    setOpen(false);
    setActiveIndex(-1);
  });

  const optionIdAt = (index: number) => `${listboxId}-option-${index}`;

  const commitSelection = (item: Option) => {
    setSelected(item);
    setQuery(item.label);
    setOpen(false);
    setActiveIndex(-1);
    onSelect(item);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(activeIndex + 1, items.length - 1);
      setOpen(true);
      setActiveIndex(next < 0 ? 0 : next);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(activeIndex - 1, 0);
      setOpen(true);
      setActiveIndex(prev);
      return;
    }
    if (e.key === "Enter") {
      if (open && activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        commitSelection(items[activeIndex]);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
  };

  return (
    <div className="adv2-combobox" ref={rootRef}>
      <label htmlFor={inputId} className="adv2-combobox__label">
        {label}
      </label>
      <div className="adv2-combobox__row">
        <input
          id={inputId}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-activedescendant={
            activeIndex >= 0 ? optionIdAt(activeIndex) : undefined
          }
          value={query}
          onChange={(e) => {
            const v = e.currentTarget.value;
            setQuery(v);
            onQueryChange?.(v);
            const hasText = v.trim().length > 0;
            setOpen(hasText);
            setActiveIndex(hasText ? 0 : -1);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(query.trim().length > 0)}
          placeholder="Start typing …"
          className="adv2-combobox__input focus-styling__input"
        />
        {open && (
          <ul id={listboxId} role="listbox" className="adv2-combobox__menu">
            {items.length === 0 && (
              <li className="adv2-combobox__muted">No results</li>
            )}
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const isSelected = selected
                ? selected.value === item.value
                : false;
              return (
                <li
                  key={item.value}
                  id={optionIdAt(index)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    // Prevent input from losing focus and commit selection via mouse
                    e.preventDefault();
                    commitSelection(item);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={clsx("adv2-combobox__option", {
                    "is-active": isActive,
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
    </div>
  );
};

export default ComboBoxCustom;
