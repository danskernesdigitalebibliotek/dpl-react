import React from "react";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { getOperatorLabels } from "../lib/operators";
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
  const { filters, preSearchFacets } = urlState;

  const renderOperator = (operator: Operator) => (
    <div className="advanced-search-summary__operator">
      {getOperatorLabels(t)[operator]}
    </div>
  );

  const renderItem = (label: string, value: string) => (
    <div className="advanced-search-summary__item">
      <span className="advanced-search-summary__label">{label}:</span>
      <span className="advanced-search-summary__value">{value}</span>
    </div>
  );
  return (
    <div className="advanced-search-summary">
      <div className="advanced-search-summary__items">
        {filters.map((filter, index) => {
          if (!filter.query.trim()) return null;
          const config = SEARCH_TERM_OPTIONS.find(
            (item) => item.value === filter.term
          );
          if (!config) {
            // eslint-disable-next-line no-console
            console.warn(
              `AdvancedSearchSummary: No config found for filter term "${filter.term}"`
            );
            return null;
          }

          const value =
            filter.term === "term.default" ? `"${filter.query}"` : filter.query;

          return (
            <React.Fragment key={`filter-${index}`}>
              {index > 0 && filter.operator && renderOperator(filter.operator)}
              {renderItem(t(config.labelKey), value)}
            </React.Fragment>
          );
        })}

        {preSearchFacets.map((preSearchFacet, facetIndex) => {
          const config = INITIAL_PRE_SEARCH_FACETS_STATE.find(
            (c) => c.facetField === preSearchFacet.facetField
          );

          if (!config) {
            // eslint-disable-next-line no-console
            console.warn(
              `AdvancedSearchSummary: No config found for facet field "${preSearchFacet.facetField}"`
            );
            return null;
          }

          const hasFilters = filters.some((s) => s.query.trim().length > 0);
          const isFirstFacet = facetIndex === 0;
          const showOperator = hasFilters || !isFirstFacet;

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
                {showOperator && renderOperator("and")}
                {renderItem(t(config.label), value)}
              </React.Fragment>
            );
          }

          // Other facets: show values joined by comma
          const value = preSearchFacet.selectedValues.join(", ");
          if (!value) return null;

          return (
            <React.Fragment key={preSearchFacet.facetField}>
              {showOperator && renderOperator("and")}
              {renderItem(t(config.label), value)}
            </React.Fragment>
          );
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
