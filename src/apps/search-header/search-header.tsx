import React, { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import {
  SuggestionsFromQueryStringQuery,
  useSuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import SearchBar from "../../components/search-bar/search-bar";
import { Autosuggest } from "../../components/autosuggest/autosuggest";

export interface SearchHeaderProps {
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholder?: string;
}

export type SearchResultArray =
  SuggestionsFromQueryStringQuery["suggest"]["result"];

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchHeaderUrl = "/search",
  altText = "search icon",
  inputPlaceholder = "Search here"
}) => {
  const [q, setQ] = useState("");

  // get all the data we need from our graphQL query
  const {
    data,
    isLoading,
    status
  }: {
    data: SuggestionsFromQueryStringQuery | undefined;
    isLoading: boolean;
    status: string;
  } = useSuggestionsFromQueryStringQuery({ q });

  const [allItems, setAllItems] = useState<object[]>([]);

  const [inputItems, setInputItems] = useState<any[]>([]);

  // once we have data, we set it into our useSate
  useEffect(() => {
    if (data) {
      const arayOfResults = data.suggest.result;
      setAllItems(arayOfResults);
      setInputItems(arayOfResults);
    }
  }, [data]);

  // here we get all the downshift properties for a combobox that we will need
  const {
    isOpen,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps
  } = useCombobox({
    items: inputItems
  });

  return (
    <div className="header__menu-second">
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <form
        action={searchHeaderUrl}
        className="header__menu-search"
        {...getComboboxProps()}
      >
        {/* eslint-enable react/jsx-props-no-spreading */}
        <SearchBar
          q={q}
          setQuery={setQ}
          searchHeaderUrl={searchHeaderUrl}
          altText={altText}
          inputPlaceholder={inputPlaceholder}
          getInputProps={getInputProps}
        />
        <Autosuggest
          q={q}
          data={allItems}
          isLoading={isLoading}
          status={status}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          isOpen={isOpen}
        />
      </form>
    </div>
  );
};

export default SearchHeader;
