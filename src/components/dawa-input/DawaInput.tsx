/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from "react";
import { useCombobox } from "downshift";
import clsx from "clsx";
import { debounce } from "lodash";
import {
  DawaAddress,
  getAddressesFromLocationQuery
} from "../../core/address-lookup/dawa-reqests";

export type InputProps = {
  label: string;
  type: "text";
  id: string;
  query: string;
  description?: string;
  classNames?: string;
  placeholder?: string;
  onDawaAddressSelect: (address: DawaAddress) => void;
  onQueryChange: (query: string) => void;
};

const MIN_QUERY_LENGTH = 3;

function useGetDawaAddresses(query: string) {
  const [addresses, setAddresses] = useState<DawaAddress[]>([]);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (searchQuery.length < MIN_QUERY_LENGTH) {
          setAddresses([]);
          return;
        }

        const result = await getAddressesFromLocationQuery(searchQuery);
        setAddresses(result);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(query);
    return () => {
      debouncedFetch.cancel();
    };
  }, [query, debouncedFetch]);

  return { addresses };
}

const DawaInput = ({
  label,
  id,
  placeholder,
  query,
  onDawaAddressSelect,
  onQueryChange
}: InputProps) => {
  const { addresses } = useGetDawaAddresses(query);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useCombobox({
    items: addresses,
    inputValue: query,
    itemToString(item) {
      return item ? item.betegnelse : "";
    },
    onInputValueChange({ inputValue: newInputValue }) {
      onQueryChange(newInputValue || "");
    },
    onSelectedItemChange({ selectedItem: newSelectedItem }) {
      if (newSelectedItem) {
        onDawaAddressSelect(newSelectedItem);
      }
    }
  });

  return (
    <div className="dawa-input-wrapper">
      <label className="dawa-input-wrapper__label" {...getLabelProps()}>
        {label}
      </label>
      <div className="dawa-input__input-wrapper">
        <input
          id={id}
          placeholder={placeholder}
          className="dawa-input"
          {...getInputProps()}
        />
        <ul
          className={clsx(
            "dawa-input__address-suggestions",
            !(isOpen && addresses.length) &&
              "dawa-input__address-suggestions--hidden"
          )}
          {...getMenuProps()}
        >
          {isOpen &&
            addresses.map((address, index) => (
              <li
                className={clsx(
                  "dawa-input__address-suggestions__item",
                  highlightedIndex === index &&
                    "dawa-input__address-suggestions__item--highlighted",
                  selectedItem === address &&
                    "dawa-input__address-suggestions__item--selected"
                )}
                key={address.id}
                {...getItemProps({ item: address, index })}
              >
                <span>{address.betegnelse}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DawaInput;
