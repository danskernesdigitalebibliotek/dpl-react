import React, { useMemo, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { Option } from "../suggestions";
import CheckBox from "../../../components/checkbox/Checkbox";

export type FacetsSelectProps = {
  items: Option[];
  label?: string;
  onChange?: (selected: Option[]) => void;
};

const FacetsSelectRadix: React.FC<FacetsSelectProps> = ({
  items,
  label = "Format",
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const commit = (value: string) => {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setSelected(next);
    onChange?.(items.filter((i) => next.has(i.value)));
  };

  const selectedCount = selected.size;
  const summaryText = selectedCount === 0 ? "Alle" : `Valgte ${selectedCount}`;

  return (
    <div className="adv2-multiselect">
      <label className="adv2-multiselect__label">{label}</label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="adv2-multiselect__search focus-styling"
            aria-haspopup="listbox"
          >
            {summaryText}
          </button>
        </Popover.Trigger>
        <Popover.Content
          forceMount
          side="bottom"
          align="start"
          sideOffset={0}
          className="adv2-multiselect__menu--popover"
        >
          <div className="adv2-multiselect__menu" role="presentation">
            <div
              className="adv2-multiselect__row"
              style={{ borderBottom: "1px solid var(--c-global-tertiary-1)" }}
            >
              <input
                ref={inputRef}
                className="adv2-multiselect__search focus-styling__input"
                placeholder="Start typing …"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                autoFocus
              />
            </div>
            <ul role="listbox" aria-multiselectable>
              {filtered.map((item) => {
                const isSelected = selected.has(item.value);
                return (
                  <li
                    key={item.value}
                    className="adv2-multiselect__option"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      commit(item.value);
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <CheckBox
                      id={`facets-rx-${item.value}`}
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
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default FacetsSelectRadix;
