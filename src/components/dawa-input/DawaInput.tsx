import clsx from "clsx";
import Label from "../forms/label/Label";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import {
  DawaAddress,
  getAddressesFromLocationQuery
} from "../../core/address-lookup/dawa-reqests";

export type InputProps = {
  label: string;
  type: "text";
  id: string;
  description?: string;
  classNames?: string;
  placeholder?: string;
  query?: string;
  onDawaAddressSelect: (address: DawaAddress) => void;
  onQueryChange: (query: string) => void;
};

const MIN_QUERY_LENGTH = 3;

function useGetDawaAddresses(query: string) {
  const [addresses, setAddresses] = useState<DawaAddress[]>([]);

  useEffect(() => {
    async function fetchAddresses() {
      if (query.length < MIN_QUERY_LENGTH) return;

      const debouncedFetch = debounce(async () => {
        const result = await getAddressesFromLocationQuery(query);
        setAddresses(result);
      }, 300);

      debouncedFetch();
    }

    fetchAddresses();
  }, [query]);

  return addresses;
}

const DawaInput = (props: InputProps) => {
  const {
    label,
    type,
    id,
    classNames,
    placeholder,
    query = "",
    onDawaAddressSelect,
    onQueryChange
  } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addresses = useGetDawaAddresses(query);
  const dawaWrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleAddressSelect = (address: DawaAddress) => {
    inputRef.current?.focus();
    setShowSuggestions(false);
    onDawaAddressSelect(address);
  };

  const handleInputChange = (query: string) => {
    onQueryChange(query);

    if (query.length > MIN_QUERY_LENGTH) {
      setShowSuggestions(true);
    }
  };

  const dawaWrapperHasFocusWithin = () => {
    return dawaWrapperRef.current?.contains(document.activeElement);
  };

  return (
    <div
      ref={dawaWrapperRef}
      className={clsx("dawa-input-wrapper", classNames)}
    >
      <Label id={id} className="dawa-input-wrapper__label">
        {label}
      </Label>
      <div
        className={clsx(
          "dawa-input__input-wrapper",
          dawaWrapperHasFocusWithin() && "dawa-input__input-wrapper--focused"
        )}
      >
        <input
          className="dawa-input"
          ref={inputRef}
          placeholder={placeholder}
          id={id}
          type={type}
          value={query}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (query.length > MIN_QUERY_LENGTH) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow click event to register
            setTimeout(() => {
              if (!dawaWrapperHasFocusWithin()) {
                setShowSuggestions(false);
              }
            });
          }}
        />
        {showSuggestions && query.length > 3 && addresses.length > 0 && (
          <ul className="dawa-input__address-suggestions">
            {addresses.map((address) => (
              <li key={address.id}>
                <button
                  className="dawa-input__address-suggestions__item"
                  onClick={() => handleAddressSelect(address)}
                  onBlur={() => {
                    // Delay hiding suggestions to allow click event to register
                    setTimeout(() => {
                      if (!dawaWrapperHasFocusWithin()) {
                        setShowSuggestions(false);
                      }
                    });
                  }}
                >
                  {address.betegnelse}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DawaInput;
