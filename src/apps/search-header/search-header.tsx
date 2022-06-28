import React, { useEffect, useState } from "react";
import { useCombobox, UseComboboxStateChange } from "downshift";
import {
  SuggestionsFromQueryStringQuery,
  useSuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import SearchBar from "../../components/search-bar/search-bar";
import { Autosuggest } from "../../components/autosuggest/autosuggest";
import { Suggestion } from "../../components/autosuggest-text/autosuggest-text-item";

export interface SearchHeaderProps {
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchHeaderUrl = "/search",
  altText = "search icon",
  inputPlaceholderText = "Search here",
  stringSuggestionAuthorText = "Author",
  stringSuggestionWorkText = "Work",
  stringSuggestionTopicText = "Topic"
}) => {
  const [q, setQ] = useState<string>("");
  const [suggestItems, setSuggestItems] = useState<any[]>([]);
  const [currentlySelectedItem, setCurrentlySelectedItem] = useState<any>("");
  const [isAutosuggestOpen, setIsAutosuggestOpen] = useState<boolean>(false);
  const {
    data,
    isLoading,
    status
  }: {
    data: SuggestionsFromQueryStringQuery | undefined;
    isLoading: boolean;
    status: string;
  } = useSuggestionsFromQueryStringQuery({ q });

  // once the query returns data, we set it into our useSate
  useEffect(() => {
    if (data) {
      const arayOfResults = data.suggest.result;
      setSuggestItems(arayOfResults);
    }
  }, [data]);

  // if there are at least 3 chars in the search-field we open the autosuggest
  // by design this is how the autosuggest should work
  useEffect(() => {
    if (q) {
      const minimalLengthQuery = 3;
      if (q.length >= minimalLengthQuery) {
        setIsAutosuggestOpen(true);
      } else {
        setIsAutosuggestOpen(false);
      }
    } else {
      setIsAutosuggestOpen(false);
    }
  }, [q]);

  function determinSuggestionType(suggestion: Suggestion): string {
    switch (suggestion.__typename) {
      case "Creator":
        return suggestion.name;
      case "Subject":
        return suggestion.value;
      default:
        return suggestion.title !== null && suggestion.title !== undefined
          ? suggestion.title
          : "incomplete data";
    }
  }

  function handleSelectedItemChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const item = changes.selectedItem;
    if (!item) {
      return;
    }
    setCurrentlySelectedItem(determinSuggestionType(item));
  }

  function handleHighlightedIndexChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    if (
      changes.selectedItem === undefined ||
      changes.selectedItem === null ||
      changes.highlightedIndex === undefined
    ) {
      return;
    }
    if (changes.highlightedIndex > -1) {
      const arrayIndex: number = changes.highlightedIndex;
      const currentlyHighlightedObject = suggestItems[arrayIndex];
      const currentItemValue = determinSuggestionType(
        currentlyHighlightedObject
      );
      setQ(currentItemValue);
    } else {
      setIsAutosuggestOpen(false);
    }
  }

  // here we get all downshift properties for the dropdown that we will need
  const {
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps
  } = useCombobox({
    isOpen: isAutosuggestOpen,
    items: suggestItems,
    inputValue: q,
    defaultIsOpen: false,
    onInputValueChange: ({ inputValue = "" }) => {
      setQ(inputValue);
    },
    onSelectedItemChange: handleSelectedItemChange,
    selectedItem: currentlySelectedItem,
    onHighlightedIndexChange: handleHighlightedIndexChange
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
          searchHeaderUrl={searchHeaderUrl}
          altText={altText}
          inputPlaceholderText={inputPlaceholderText}
          getInputProps={getInputProps}
        />
        <Autosuggest
          q={q}
          data={data}
          isLoading={isLoading}
          status={status}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          isOpen={isAutosuggestOpen}
          stringSuggestionAuthorText={stringSuggestionAuthorText}
          stringSuggestionWorkText={stringSuggestionWorkText}
          stringSuggestionTopicText={stringSuggestionTopicText}
        />
      </form>
    </div>
  );
};

export default SearchHeader;
