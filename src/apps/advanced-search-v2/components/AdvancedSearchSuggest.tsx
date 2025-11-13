import React from "react";
import { suggestionsToOptions } from "../lib/suggestions";
import SearchIndexSelect from "./SearchIndexSelect";
import ComboBoxBase from "./ComboBoxBase";
import {
  ComplexSuggestionTypeEnum,
  useComplexSuggestQuery
} from "../../../core/dbc-gateway/generated/graphql";
import MinusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/MinusButton.svg";
import OperatorButtons from "./OperatorButtons";
import { MIN_QUERY_LENGTH } from "../lib/constants";
import { useText } from "../../../core/utils/text";
import { Operator } from "../types";

type AdvancedSearchSuggestProps = {
  selectedIndex: string;
  onSelectedIndexChange: (value: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
  suggestType: ComplexSuggestionTypeEnum;
  placeholderKey: string;
  operator?: Operator;
  onOperatorChange?: (operator: Operator) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
};

const AdvancedSearchSuggest: React.FC<AdvancedSearchSuggestProps> = ({
  selectedIndex,
  onSelectedIndexChange,
  query,
  onQueryChange,
  suggestType,
  placeholderKey,
  operator = "and",
  onOperatorChange,
  onRemove,
  showRemoveButton = false
}) => {
  const t = useText();

  const { data } = useComplexSuggestQuery(
    { q: query, type: suggestType },
    { enabled: query.trim().length >= MIN_QUERY_LENGTH }
  );

  const items = suggestionsToOptions(data?.complexSuggest?.result);

  return (
    <>
      <div className="advanced-search-suggest">
        <SearchIndexSelect
          value={selectedIndex}
          onChange={onSelectedIndexChange}
        />

        <div className="advanced-search-suggest__combobox-wrapper">
          <ComboBoxBase
            allowFreeInput
            items={items}
            query={query}
            onQueryChange={onQueryChange}
            placeholder={t(placeholderKey)}
            classes={{
              input: "advanced-search-select-search__combobox-input",
              options:
                "advanced-search-dropdown advanced-search-suggest__combobox-options"
            }}
          />
        </div>

        {showRemoveButton && (
          <button
            type="button"
            className="advanced-search-suggest__remove-button"
            onClick={onRemove}
            aria-label="Fjern søgelinje"
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
