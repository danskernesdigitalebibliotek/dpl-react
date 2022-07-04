import React, { useEffect, useState } from "react";
import { useCombobox, UseComboboxStateChange } from "downshift";
import {
  SuggestionsFromQueryStringQuery,
  useSuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import SearchBar from "../../components/search-bar/search-bar";
import { Autosuggest } from "../../components/autosuggest/autosuggest";
import {
  Suggestion,
  SuggestionWork
} from "../../components/autosuggest-text/autosuggest-text-item";
import { useText } from "../../core/utils/text";

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

  // once the query returns data, we set it into our useSate
  useEffect(() => {
    if (data) {
      const arayOfResults = data.suggest.result;
      setSuggestItems(arayOfResults);
    }
  }, [data]);
  const originalData = suggestItems;
  const textData: Suggestion[] = [];
  const materialData: SuggestionWork[] = [];
  let orderedData: SuggestionsFromQueryStringQuery["suggest"]["result"] = [];

  if (originalData) {
    originalData.forEach((item) => {
      if (item.__typename === "Work") {
        if (materialData.length < 3) {
          materialData.push(item);
          return;
        }
      }
      textData.push(item);
    });
    orderedData = textData.concat(materialData);
  }

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
    const { selectedItem } = changes;
    if (!selectedItem) {
      return;
    }
    setCurrentlySelectedItem(determinSuggestionType(selectedItem));
  }

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
    const { selectedItem, highlightedIndex, type } = changes;
    if (
      selectedItem === undefined ||
      selectedItem === null ||
      highlightedIndex === undefined
    ) {
      return;
    }
    if (type === "__item_mouse_move__" || type === "__menu_mouse_leave__") {
      return;
    }
    if (highlightedIndex < 0) {
      setIsAutosuggestOpen(false);
      return;
    }
    const arrayIndex: number = highlightedIndex;
    const currentlyHighlightedObject = orderedData[arrayIndex];
    const currentItemValue = determinSuggestionType(currentlyHighlightedObject);
    // is it was an enter click we need to manually redirect to the search result
    if (type === "__controlled_prop_updated_selected_item__") {
      manualRedirect(currentItemValue);
    }
    if (
      type === "__input_keydown_arrow_down__" ||
      type === "__input_keydown_arrow_up__"
    ) {
      setQWithoutQuery(currentItemValue);
      return;
    }
    setQ(currentItemValue);
  }

  function handleInputValueChange(changes: UseComboboxStateChange<Suggestion>) {
    const { inputValue, type } = changes;
    if (inputValue === undefined) {
      return;
    }

    if (type === "__input_change__") {
      setQ(inputValue);
      setQWithoutQuery(inputValue);
      return;
    }
    setQWithoutQuery(inputValue);
    // is it was an enter click we need to manually redirect to the search result
    if (type === "__controlled_prop_updated_selected_item__") {
      manualRedirect(inputValue);
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
    items: textData.concat(materialData),
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
