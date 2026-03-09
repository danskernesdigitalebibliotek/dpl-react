import React from "react";
import { suggestionsToOptions } from "../lib/suggestions";
import {
  ComplexSuggestionTypeEnum,
  useComplexSuggestQuery
} from "../../../core/dbc-gateway/generated/graphql";
import MinusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/MinusButton.svg";
import OperatorButtons from "./OperatorButtons";
import { useText } from "../../../core/utils/text";
import { Operator } from "../types";
import ComboBoxAutosuggest from "./ComboBoxAutosuggest";
import SearchTermSelect from "./SearchTermSelect";

type AdvancedSearchFilterRowProps = {
  selectedTerm: string;
  onSelectedTermChange: (value: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
  suggestType: ComplexSuggestionTypeEnum;
  inputPlaceholder: string;
  operator?: Operator;
  onOperatorChange?: (operator: Operator) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  shouldAutoFocus?: boolean;
  disableSuggest?: boolean;
};

const AdvancedSearchFilterRow = ({
  selectedTerm,
  onSelectedTermChange,
  query,
  onQueryChange,
  suggestType,
  inputPlaceholder,
  operator = "and",
  onOperatorChange,
  onRemove,
  showRemoveButton = false,
  shouldAutoFocus,
  disableSuggest = false
}: AdvancedSearchFilterRowProps) => {
  const t = useText();

  const { data } = useComplexSuggestQuery(
    { q: query, type: suggestType },
    { enabled: !disableSuggest && query.length > 0 }
  );

  const items = suggestionsToOptions(data?.complexSuggest?.result);

  const onQueryChangeHandler = (q: string) => {
    onQueryChange(q);
  };

  return (
    <>
      <div className="search-filter-wrapper">
        <div className="search-filter">
          <SearchTermSelect
            // Force remount so native autoFocus runs reliably when focusing a different row
            key={shouldAutoFocus ? "focus" : "idle"}
            shouldAutoFocus={shouldAutoFocus}
            value={selectedTerm}
            onChange={onSelectedTermChange}
          />

          <div className="search-filter__combobox-wrapper">
            <ComboBoxAutosuggest
              items={items}
              value={query}
              onInputChange={onQueryChangeHandler}
              placeholder={inputPlaceholder}
            />
          </div>
        </div>
        {showRemoveButton && (
          <button
            type="button"
            className="search-filter__remove-button"
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

export default AdvancedSearchFilterRow;
