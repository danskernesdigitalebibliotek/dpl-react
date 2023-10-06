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
import { useUrls } from "../../core/utils/url";
import {
  constructMaterialUrl,
  constructSearchUrl,
  constructSearchUrlWithFilter,
  redirectTo
} from "../../core/utils/helpers/url";
import { WorkId } from "../../core/utils/types/ids";
import { useText } from "../../core/utils/text";
import {
  AutosuggestCategoryList,
  AutosuggestCategory
} from "../../core/utils/types/material-type";
import { findNonWorkSuggestion } from "./helpers";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";

const SearchHeader: React.FC = () => {
  const [q, setQ] = useState<string>("");
  const [qWithoutQuery, setQWithoutQuery] = useState<string>(q);
  const [suggestItems, setSuggestItems] = useState<
    SuggestionsFromQueryStringQuery["suggest"]["result"] | []
  >([]);
  const minimalQueryLength = 3;
  // we need to convert between string and suggestion result object so
  // that the value in the search field on enter click doesn't become [object][object]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  } = useSuggestionsFromQueryStringQuery(
    { q },
    { enabled: q.length >= minimalQueryLength }
  );
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] =
    useState<boolean>(false);
  const { searchUrl, materialUrl, advancedSearchUrl } = useUrls();
  const t = useText();
  const autosuggestCategoryList: AutosuggestCategoryList[] = [
    {
      render: t("autosuggestBookCategoryText"),
      term: AutosuggestCategory.book,
      facet: "materialTypes"
    },
    {
      render: t("autosuggestEbookCategoryText"),
      term: AutosuggestCategory.ebook,
      facet: "materialTypes"
    },
    {
      render: t("autosuggestFilmCategoryText"),
      term: AutosuggestCategory.movie,
      facet: "workTypes"
    },
    {
      render: t("autosuggestAudioBookCategoryText"),
      term: AutosuggestCategory.audioBook,
      facet: "materialTypes"
    },
    {
      render: t("autosuggestMusicCategoryText"),
      term: AutosuggestCategory.music,
      facet: "workTypes"
    },
    {
      render: t("autosuggestGameCategoryText"),
      term: AutosuggestCategory.game,
      facet: "workTypes"
    },
    {
      render: t("autosuggestAnimatedSeriesCategoryText"),
      term: AutosuggestCategory.animatedSeries,
      facet: "materialTypes"
    }
  ];
  // Once we register the item select event the original highlighted index is
  // already set to -1 by Downshift.
  const [highlightedIndexAfterClick, setHighlightedIndexAfterClick] = useState<
    number | null
  >(null);
  const { track } = useStatistics();

  // Make sure to only assign the data once.
  useEffect(() => {
    if (data) {
      const arrayOfResults = data.suggest.result;
      setSuggestItems(arrayOfResults);
    }
  }, [data]);

  const originalData = suggestItems;
  const textData: Suggestion[] = [];
  const materialData: Suggestion[] = [];
  const categoryData: Suggestion[] = [];
  // The first suggestion that is not of SuggestionType.Title - used for showing/
  // /hiding autosuggest categories suggestions.
  let nonWorkSuggestion: Suggestion | undefined;
  let orderedData: SuggestionsFromQueryStringQuery["suggest"]["result"] = [];

  if (originalData) {
    nonWorkSuggestion = findNonWorkSuggestion(originalData);

    originalData.forEach((item: Suggestion) => {
      if (
        (item.type === SuggestionType.Composit ||
          item.type === SuggestionType.Title) &&
        item.work
      ) {
        if (materialData.length < 3) {
          materialData.push(item);
          return;
        }
      }
      textData.push(item);
    });
    orderedData = textData.concat(materialData);

    if (nonWorkSuggestion) {
      autosuggestCategoryList.forEach(() => {
        categoryData.push(nonWorkSuggestion as Suggestion);
      });
      orderedData = orderedData.concat(categoryData);
    }
  }

  // Autosuggest opening and closing based on input text length.
  useEffect(() => {
    if (data) {
      setIsAutosuggestOpen(true);
    } else {
      setIsAutosuggestOpen(false);
    }
  }, [data]);

  function determineSuggestionTerm(suggestion: Suggestion): string {
    if (suggestion.type === SuggestionType.Composit) {
      return suggestion.work?.titles.main[0] || "incomplete data";
    }
    return suggestion.term;
  }

  function isDisplayedAsWorkSuggestion(
    selectedItem: Suggestion["work"],
    currentMaterialData: Suggestion[]
  ) {
    const dataWithWorkId = currentMaterialData.filter(
      (item) => item.work?.workId === selectedItem?.workId
    );
    return Boolean(dataWithWorkId.length);
  }

  function handleSelectedItemChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const { selectedItem } = changes;
    if (!selectedItem) {
      return;
    }
    setCurrentlySelectedItem(determineSuggestionTerm(selectedItem));
  }

  function handleHighlightedIndexChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const { type } = changes;
    let { highlightedIndex } = changes;
    // Don't do anything for mouse leave events + exit function.
    if (type === useCombobox.stateChangeTypes.MenuMouseLeave) {
      return;
    }
    // Set highlighted index when hovering over with mouse + exit function.
    if (type === useCombobox.stateChangeTypes.ItemMouseMove) {
      if (highlightedIndex !== undefined && highlightedIndex > -1) {
        setHighlightedIndexAfterClick(highlightedIndex);
      }
      return;
    }
    // Set highlighted index for keyboard events, but continue on in function.
    if (
      type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
      type === useCombobox.stateChangeTypes.InputKeyDownArrowUp ||
      type === useCombobox.stateChangeTypes.InputKeyDownEnter
    ) {
      if (highlightedIndex !== undefined && highlightedIndex > -1) {
        setHighlightedIndexAfterClick(highlightedIndex);
      }
    }
    // Close autosuggest if there is no highlighted index.
    if (highlightedIndex && highlightedIndex < 0) {
      setIsAutosuggestOpen(false);
      return;
    }
    if (!highlightedIndex) {
      highlightedIndex = 0;
    }
    const arrayIndex: number = highlightedIndex;
    const currentlyHighlightedObject = orderedData[arrayIndex];
    const currentItemValue = determineSuggestionTerm(
      currentlyHighlightedObject
    );
    // Change text in the search field without new API request.
    if (
      type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
      type === useCombobox.stateChangeTypes.InputKeyDownArrowUp
    ) {
      setQWithoutQuery(currentItemValue);
      return;
    }
    // Make a new API suggestion request.
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
    // Escape if there is no selected item defined.
    if (!selectedItem) {
      return;
    }
    // Nothing happens if this is not a mouse click or enter click.
    if (
      type !== useCombobox.stateChangeTypes.ItemClick &&
      type !== useCombobox.stateChangeTypes.InputKeyDownEnter
    ) {
      return;
    }
    // If this item is shown as one of work suggestions redirect to material page.
    if (
      selectedItem.work?.workId &&
      isDisplayedAsWorkSuggestion(selectedItem.work, materialData)
    ) {
      track("click", {
        id: statistics.autosuggestClick.id,
        name: statistics.autosuggestClick.name,
        trackedData: selectedItem.work.titles.main.join(", ")
      }).then(() => {
        redirectTo(
          constructMaterialUrl(materialUrl, selectedItem.work?.workId as WorkId)
        );
      });
      return;
    }
    // If this item is shown as a category suggestion
    if (
      nonWorkSuggestion &&
      changes.selectedItem &&
      nonWorkSuggestion.term === changes.selectedItem.term &&
      highlightedIndexAfterClick &&
      highlightedIndexAfterClick >= textData.concat(materialData).length
    ) {
      const highlightedCategoryIndex =
        highlightedIndexAfterClick - (textData.length + materialData.length);
      const selectedItemString = determineSuggestionTerm(changes.selectedItem);
      track("click", {
        id: statistics.autosuggestClick.id,
        name: statistics.autosuggestClick.name,
        trackedData: selectedItemString
      }).then(() => {
        const { term, facet } =
          autosuggestCategoryList[highlightedCategoryIndex];

        redirectTo(
          constructSearchUrlWithFilter({
            searchUrl,
            selectedItemString,
            filter: { [facet]: term }
          })
        );
      });
      return;
    }
    // Otherwise redirect to search result page & track autosuggest click.
    track("click", {
      id: statistics.autosuggestClick.id,
      name: statistics.autosuggestClick.name,
      trackedData: determineSuggestionTerm(selectedItem)
    }).then(() => {
      redirectTo(
        constructSearchUrl(searchUrl, determineSuggestionTerm(selectedItem))
      );
    });
  }

  // This is the main Downshift hook.
  const {
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getLabelProps
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
    <form
      className="header__menu-second"
      action={String(constructSearchUrl(searchUrl, qWithoutQuery))}
    >
      {/* The downshift combobox uses prop spreading by design */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className="header__menu-search">
        <SearchBar
          getInputProps={getInputProps}
          getLabelProps={getLabelProps}
          setQWithoutQuery={setQWithoutQuery}
          setIsHeaderDropdownOpen={setIsHeaderDropdownOpen}
        />
        <Autosuggest
          textData={textData}
          materialData={materialData}
          categoryData={categoryData}
          status={status}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          isOpen={isAutosuggestOpen}
          autosuggestCategoryList={autosuggestCategoryList}
          isLoading={isLoading}
        />
        {isHeaderDropdownOpen && (
          <div className="header__menu-dropdown">
            <ul>
              <li className="header__menu-dropdown-item">
                <button
                  data-cy="search-header-dropdown"
                  className="cursor-pointer"
                  type="button"
                  onClick={() => redirectTo(advancedSearchUrl)}
                  onKeyUp={(e) =>
                    e.key === "Enter" && redirectTo(advancedSearchUrl)
                  }
                >
                  {t("headerDropdownItemAdvancedSearchText")}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchHeader;
