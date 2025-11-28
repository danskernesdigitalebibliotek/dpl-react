import React from "react";
import { suggestionsToOptions } from "../lib/suggestions";
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
import SearchTermSelect from "./SearchTermSelect";

type AdvancedSearchSuggestProps = {
  selectedTerm: string;
  query: string;
  suggestType: ComplexSuggestionTypeEnum;
  inputPlaceholder: string;
  operator?: Operator;
  showRemoveButton?: boolean;
  shouldAutoFocus?: boolean;
  onSelectedTermChange: (value: string) => void;
  onQueryChange: (q: string) => void;
  onOperatorChange?: (operator: Operator) => void;
  onRemove?: () => void;
};

const AdvancedSearchSuggest = ({
  selectedTerm,
  query,
  suggestType,
  inputPlaceholder,
  operator = "and",
  showRemoveButton = false,
  shouldAutoFocus,
  onSelectedTermChange,
  onQueryChange,
  onOperatorChange,
  onRemove
}: AdvancedSearchSuggestProps) => {
  const t = useText();

  const { data } = useComplexSuggestQuery(
    { q: query, type: suggestType },
    { enabled: query.trim().length >= MIN_QUERY_LENGTH }
  );

  const items = suggestionsToOptions(data?.complexSuggest?.result);

  return (
    <>
      <div className="advanced-search-suggest-wrapper">
        <div className="advanced-search-suggest">
          <SearchTermSelect
            // Force remount so native autoFocus runs reliably when focusing a different row
            key={shouldAutoFocus ? "focus" : "idle"}
            shouldAutoFocus={shouldAutoFocus}
            value={selectedTerm}
            onChange={onSelectedTermChange}
          />

          <div className="advanced-search-suggest__combobox-wrapper">
            <ComboBoxAutosuggest
              items={items}
              value={query}
              onInputChange={(query) => onQueryChange(query)}
              placeholder={inputPlaceholder}
            />
          </div>
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
};

export default AdvancedSearchSuggest;
