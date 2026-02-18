/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from "react";
import { useCombobox } from "downshift";
import clsx from "clsx";
import { debounce } from "lodash";
import {
  AddressWithCoordinates,
  getAddressesFromLocationQuery
} from "../../core/address-lookup/gsearch-requests";

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

function useGetGSearchAddresses(query: string) {
  const [addresses, setAddresses] = useState<AddressWithCoordinates[]>([]);

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

const GSearchInput = ({
  label,
  id,
  placeholder,
  query,
  onAddressSelect,
  onQueryChange
}: InputProps) => {
  const { addresses } = useGetGSearchAddresses(query);

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
