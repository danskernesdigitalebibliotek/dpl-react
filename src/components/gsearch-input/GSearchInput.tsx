/* eslint-disable react/jsx-props-no-spreading -- downshift's prop getter API is designed for spreading */
import React, { useState, useMemo, useCallback } from "react";
import { useCombobox, UseComboboxStateChangeTypes } from "downshift";
import clsx from "clsx";
import { debounce } from "lodash";
import {
  AddressWithCoordinates,
  getAddressesFromLocationQuery
} from "../../core/address-lookup/gsearch-requests";
import { useConfig } from "../../core/utils/config";

export type InputProps = {
  label: string;
  id: string;
  query: string;
  description?: string;
  classNames?: string;
  placeholder?: string;
  onAddressSelect: (address: AddressWithCoordinates) => void;
  onQueryChange: (query: string) => void;
};

const MIN_QUERY_LENGTH = 3;

const GSearchInput = ({
  label,
  id,
  placeholder,
  query,
  onAddressSelect,
  onQueryChange
}: InputProps) => {
  const config = useConfig();
  const token = config<string>("dataforsyningenTokenConfig") || "";
  const [addresses, setAddresses] = useState<AddressWithCoordinates[]>([]);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (searchQuery.length < MIN_QUERY_LENGTH) {
          setAddresses([]);
          return;
        }

        const result = await getAddressesFromLocationQuery({
          query: searchQuery,
          token
        });
        setAddresses(result);
      }, 300),
    [token]
  );

  const handleInputValueChange = useCallback(
    ({
      inputValue: newInputValue,
      type
    }: {
      inputValue?: string;
      type: UseComboboxStateChangeTypes;
    }) => {
      const value = newInputValue || "";
      onQueryChange(value);

      // Only fetch when the user is typing, not on programmatic changes
      // (e.g. reverse geocode or selecting a suggestion).
      if (type === useCombobox.stateChangeTypes.InputChange) {
        debouncedFetch(value);
      } else {
        debouncedFetch.cancel();
        setAddresses([]);
      }
    },
    [onQueryChange, debouncedFetch]
  );

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
    onInputValueChange: handleInputValueChange,
    onSelectedItemChange({ selectedItem: newSelectedItem }) {
      if (newSelectedItem) {
        onAddressSelect(newSelectedItem);
      }
    }
  });

  return (
    <div className="address-input-wrapper">
      <label className="address-input-wrapper__label" {...getLabelProps()}>
        {label}
      </label>
      <div className="address-input__combobox">
        <input
          id={id}
          placeholder={placeholder}
          className="address-input"
          {...getInputProps()}
        />
        <ul
          className={clsx(
            "address-input__suggestions",
            !(isOpen && addresses.length) &&
              "address-input__suggestions--hidden"
          )}
          {...getMenuProps()}
        >
          {isOpen &&
            addresses.map((address, index) => (
              <li
                className={clsx(
                  "address-input__suggestions__item",
                  highlightedIndex === index &&
                    "address-input__suggestions__item--highlighted",
                  selectedItem === address &&
                    "address-input__suggestions__item--selected"
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

export default GSearchInput;
