import React, { useRef, useState, KeyboardEventHandler } from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import type { Option } from "../suggestions";

export type ComboBoxProps = {
  items: Option[];
  onSelect: (item: Option) => void;
  label?: string;
  onQueryChange?: (q: string) => void;
};

const ComboBoxRadix = ({
  items,
  onSelect,
  label = "Choose an item",
  onQueryChange
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const optionIdAt = (index: number) => `radix-option-${index}`;

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
    <div className="adv2-combobox">
      <label className="adv2-combobox__label">{label}</label>
      <Popover.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) {
            // keep typing in the input when popover opens
            queueMicrotask(() => inputRef.current?.focus());
          }
        }}
      >
        <Popover.Trigger asChild>
          <div className="adv2-combobox__row">
            <input
              ref={inputRef}
              role="combobox"
              aria-autocomplete="list"
              aria-controls="radix-listbox"
              aria-expanded={open}
              aria-activedescendant={
                activeIndex >= 0 ? optionIdAt(activeIndex) : undefined
              }
              placeholder="Start typing …"
              value={query}
              onChange={(e) => {
                const v = e.currentTarget.value;
                setQuery(v);
                onQueryChange?.(v);
                const hasText = v.trim().length > 0;
                setOpen(hasText);
                setActiveIndex(hasText ? 0 : -1);
              }}
              onFocus={() => setOpen(query.trim().length > 0)}
              onKeyDown={onKeyDown}
              className="adv2-combobox__input focus-styling__input"
            />
          </div>
        </Popover.Trigger>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={0}
          className="adv2-combobox__menu--popover"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <ul id="radix-listbox" role="listbox" className="adv2-combobox__menu">
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
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default ComboBoxRadix;
