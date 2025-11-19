import React, { forwardRef } from "react";
import { suggestionsToOptions } from "../lib/suggestions";
import SearchIndexSelect from "./SearchIndexSelect";
import {
  ComplexSuggestionTypeEnum,
  useComplexSuggestQuery
} from "../../../core/dbc-gateway/generated/graphql";
import MinusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/MinusButton.svg";
import OperatorButtons from "./OperatorButtons";
import { MIN_QUERY_LENGTH } from "../lib/constants";
import { useText } from "../../../core/utils/text";
import { Operator } from "../types";
import ComboBoxAutosuggest from "./ComboBoxAutosuggest";

type AdvancedSearchSuggestProps = {
  selectedIndex: string;
  onSelectedIndexChange: (value: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
  suggestType: ComplexSuggestionTypeEnum;
  inputPlaceholder: string;
  operator?: Operator;
  onOperatorChange?: (operator: Operator) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
};

const AdvancedSearchSuggest = forwardRef<
  HTMLButtonElement,
  AdvancedSearchSuggestProps
>(
  (
    {
      selectedIndex,
      onSelectedIndexChange,
      query,
      onQueryChange,
      suggestType,
      inputPlaceholder,
      operator = "and",
      onOperatorChange,
      onRemove,
      showRemoveButton = false
    },
    ref
  ) => {
    const t = useText();

    const { data } = useComplexSuggestQuery(
      { q: query, type: suggestType },
      { enabled: query.trim().length >= MIN_QUERY_LENGTH }
    );

    const items = suggestionsToOptions(data?.complexSuggest?.result);

    const onQueryChangeHandler = (q: string) => {
      onQueryChange(q);
    };

    return (
      <>
        <div className="advanced-search-suggest">
          <SearchTermSelect
            ref={ref}
            value={selectedIndex}
            onChange={onSelectedIndexChange}
          />

          <div className="advanced-search-suggest__combobox-wrapper">
            <ComboBoxAutosuggest
              items={items}
              value={query}
              onInputChange={onQueryChangeHandler}
              placeholder={inputPlaceholder}
            />
          </div>

          {showRemoveButton && (
            <button
              type="button"
              className="advanced-search-suggest__remove-button"
              onClick={onRemove}
              aria-label={t("advancedSearchRemoveRowText")}
            >
              <img src={MinusButtonIcon} alt="" />
            </button>
          )}
        </div>

        {onOperatorChange && (
          <OperatorButtons value={operator} onChange={onOperatorChange} />
        )}
      </>
    );
  }
);

export default AdvancedSearchSuggest;
