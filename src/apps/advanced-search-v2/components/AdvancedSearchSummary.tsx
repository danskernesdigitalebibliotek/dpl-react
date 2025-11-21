import React from "react";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { useText } from "../../../core/utils/text";
import { useSearchQueries } from "../hooks/use-search-queries";
import { Operator } from "../types";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";

interface AdvancedSearchSummaryProps {
  onEditClick?: () => void;
}

const AdvancedSearchSummary: React.FC<AdvancedSearchSummaryProps> = ({
  onEditClick
}) => {
  const t = useText();
  const { urlState } = useSearchQueries();
  const { suggests, preSearchFacets } = urlState;

  const renderOperator = (operator: Operator) => {
    const operatorMap = {
      and: "clauseAndText",
      or: "clauseOrText",
      not: "clauseNotText"
    };
    return (
      <div className="advanced-search-summary__operator">
        {t(operatorMap[operator])}
      </div>
    );
  };

  const renderItem = (label: string, value: string) => (
    <div className="advanced-search-summary__item">
      <span className="advanced-search-summary__label">{label}:</span>
      <span className="advanced-search-summary__value">{value}</span>
    </div>
  );
  return (
    <div className="advanced-search-summary">
      <div className="advanced-search-summary__items">
        {suggests.map((suggest, index) => {
          if (!suggest.query.trim()) return null;
          const config = SEARCH_TERM_OPTIONS.find(
            (item) => item.value === suggest.term
          );
          if (!config) return null;

          const value =
            suggest.term === "term.default"
              ? `"${suggest.query}"`
              : suggest.query;

          return (
            <React.Fragment key={`suggest-${index}`}>
              {index > 0 &&
                suggest.operator &&
                renderOperator(suggest.operator)}
              {renderItem(t(config.labelKey), value)}
            </React.Fragment>
          );
        })}

        {preSearchFacets.map((preSearchFacet) => {
          const config = INITIAL_PRE_SEARCH_FACETS_STATE.find(
            (c) => c.facetField === preSearchFacet.facetField
          );

          if (!config) return null;

          // Ranges: show as range instead of individual values
          if (config.type === "range") {
            const [from, to] = preSearchFacet.selectedValues;

            const formatValue = (f: string, t: string) => {
              if (!t) return `${f}+`;
              if (f === t) return `${f}`;
              return `${f}-${t}`;
            };

            const value = formatValue(from, to);

            return (
              <React.Fragment key={preSearchFacet.facetField}>
                {renderOperator("and")}
                {renderItem(t(config.label), value)}
              </React.Fragment>
            );
          }

          // Other facets: show each value
          return preSearchFacet.selectedValues.map((value, i) => (
            <React.Fragment key={`${preSearchFacet.facetField}-${i}`}>
              {renderOperator(i === 0 ? "and" : "or")}
              {renderItem(t(config.label), value)}
            </React.Fragment>
          ));
        })}

        {onEditClick && (
          <button
            type="button"
            className="advanced-search-summary__edit-link"
            onClick={onEditClick}
          >
            {t("advancedSearchEditSearchText")}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchSummary;
