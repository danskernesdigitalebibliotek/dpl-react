import React, { useEffect, useState } from "react";
import { useCombobox, UseComboboxStateChange } from "downshift";
import {
  SuggestionsFromQueryStringQuery,
  SuggestionType,
  useSuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import SearchBar from "../../components/search-bar/search-bar";
import { Autosuggest } from "../../components/autosuggest/autosuggest";
import { Suggestion } from "../../core/utils/types/autosuggest";
import { useText } from "../../core/utils/text";
import { itemToString } from "../../components/autosuggest-text/autosuggest-text";

export interface SearchHeaderProps {
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
}

const SearchHeader: React.FC = () => {
  const t = useText();
  const [q, setQ] = useState<string>("");
  const [qWithoutQuery, setQWithoutQuery] = useState<string>(q);
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

  // make sure to only assign the data once
  useEffect(() => {
    if (data) {
      const arayOfResults = data.suggest.result;
      setSuggestItems(arayOfResults);
    }
  }, [data]);
  const originalData = suggestItems;
  const textData: Suggestion[] = [];
  const materialData: Suggestion[] = [];
  let orderedData: SuggestionsFromQueryStringQuery["suggest"]["result"] = [];

  if (originalData) {
    originalData.forEach((item: Suggestion) => {
      if (
        item.type === SuggestionType.Composit ||
        item.type === SuggestionType.Title
      ) {
        if (materialData.length < 3) {
          materialData.push(item);
          return;
        }
      }
      textData.push(item);
    });
    orderedData = textData.concat(materialData);
  }

  // autosuggest dropdown opening and closing based on input text length
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
    if (suggestion.type === SuggestionType.Composit) {
      return suggestion.work?.titles.main[0] || "incomplete data";
    }
    return suggestion.term;
  }

  function handleSelectedItemChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const { selectedItem } = changes;
    if (!selectedItem) {
      return;
    }
    setCurrentlySelectedItem(determinSuggestionType(selectedItem));
  }

  // downshift prevents the default form submission event when the autosuggest
  // is open - that's why in some cases we have to simulate form sumbission
  function manualRedirect(inputValue: string) {
    const baseUrl = t("searchHeaderUrlText");
    const params = inputValue;
    if (window.top) {
      window.top.location.href = `${baseUrl}?q=${params}`;
    }
  }

  function handleHighlightedIndexChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const { type } = changes;
    let { highlightedIndex } = changes;
    if (
      type === useCombobox.stateChangeTypes.ItemMouseMove ||
      type === useCombobox.stateChangeTypes.MenuMouseLeave
    ) {
      return;
    }
    if (highlightedIndex && highlightedIndex < 0) {
      setIsAutosuggestOpen(false);
      return;
    }
    if (!highlightedIndex) {
      highlightedIndex = 0;
    }
    const arrayIndex: number = highlightedIndex;
    const currentlyHighlightedObject = orderedData[arrayIndex];
    const currentItemValue = determinSuggestionType(currentlyHighlightedObject);
    if (
      type === useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem
    ) {
      manualRedirect(currentItemValue);
      return;
    }
    if (
      type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
      type === useCombobox.stateChangeTypes.InputKeyDownArrowUp
    ) {
      setQWithoutQuery(currentItemValue);
      return;
    }
    setQ(currentItemValue);
  }

  function handleInputValueChange(changes: UseComboboxStateChange<Suggestion>) {
    const { inputValue, selectedItem, type } = changes;
    if (inputValue === undefined) {
      return;
    }
    if (type === useCombobox.stateChangeTypes.InputChange) {
      setQ(inputValue);
      setQWithoutQuery(inputValue);
      return;
    }
    setQWithoutQuery(inputValue);
    if (
      type === useCombobox.stateChangeTypes.ItemClick ||
      type === useCombobox.stateChangeTypes.InputKeyDownEnter
    ) {
      if (!selectedItem) {
        return;
      }
      manualRedirect(itemToString(selectedItem));
    }
  }
  // this is the main Downshift hook
  const {
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps
  } = useCombobox({
    isOpen: isAutosuggestOpen,
    items: orderedData,
    inputValue: qWithoutQuery,
    defaultIsOpen: false,
    onInputValueChange: handleInputValueChange,
    onSelectedItemChange: handleSelectedItemChange,
    selectedItem: currentlySelectedItem,
    onHighlightedIndexChange: handleHighlightedIndexChange
  });

  return (
    <div className="header__menu-second">
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <form
        action={t("searchHeaderUrlText")}
        className="header__menu-search"
        id="autosuggestForm"
        {...getComboboxProps()}
      >
        {/* eslint-enable react/jsx-props-no-spreading */}
        <SearchBar getInputProps={getInputProps} />
        <Autosuggest
          originalData={originalData}
          textData={textData}
          materialData={materialData}
          isLoading={isLoading}
          status={status}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          isOpen={isAutosuggestOpen}
        />
      </form>
    </div>
  );
};

export default SearchHeader;
