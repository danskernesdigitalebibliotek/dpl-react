import clsx from "clsx";
import Label from "../forms/label/Label";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

export type InputProps = {
  label: string;
  type: "text";
  id: string;
  description?: string;
  classNames?: string;
  labelClassName?: string;
  placeholder?: string;
  onDawaAddressSelect: (address: DawaAddress) => void;
};

export type DawaAddress = {
  vejnavn: string;
  betegnelse: string;
  x: number;
  y: number;
  id: string;
  postnr: string;
  postnrnavn: string;
  lat?: number;
  lng?: number;
};

const MIN_QUERY_LENGTH = 3;

function getAddresses(query: string) {
  return fetch(
    `https://api.dataforsyningen.dk/adresser?q=${query}&struktur=mini&fuzzy&per_side=10`
  )
    .then((response) => response.json())
    .then((addresses) => {
      // Add lat/lng from x/y coordinates (DAWA returns both WGS84 and ETRS89)
      return addresses.map((addr: any) => ({
        ...addr,
        lat: addr.y, // In mini structure, y is latitude
        lng: addr.x // In mini structure, x is longitude
      }));
    })
    .catch((error) => {
      return [];
    });
}

function useGetDawaAddresses(query: string) {
  const [addresses, setAddresses] = useState<DawaAddress[]>([]);

  useEffect(() => {
    async function fetchAddresses() {
      if (query.length < MIN_QUERY_LENGTH) return;

      const debouncedFetch = debounce(async () => {
        const result = await getAddresses(query);
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
    labelClassName,
    placeholder,
    onDawaAddressSelect
  } = props;
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addresses = useGetDawaAddresses(query);

  const handleAddressSelect = (address: DawaAddress) => {
    setQuery(address.betegnelse);
    setShowSuggestions(false);
    onDawaAddressSelect(address);
  };

  const handleInputChange = (query: string) => {
    setQuery(query);

    if (query.length > MIN_QUERY_LENGTH) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={clsx("dawa-input", classNames)}>
      <Label id={id} className={labelClassName}>
        {label}
      </Label>
      <div className="dawa-input__input-wrapper">
        <input
          placeholder={placeholder}
          id={id}
          type={type}
          value={query}
          onChange={(event) => handleInputChange(event.target.value)}
        />
        {showSuggestions && query.length > 3 && addresses.length > 0 && (
          <div className="dawa-input__address-suggestions">
            {addresses.map((address) => (
              <button
                key={address.id}
                className="dawa-input__address-suggestions__item"
                onClick={() => handleAddressSelect(address)}
              >
                {address.betegnelse}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DawaInput;
