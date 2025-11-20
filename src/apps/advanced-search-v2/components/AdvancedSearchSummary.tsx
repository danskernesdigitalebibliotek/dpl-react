import React from "react";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { useText } from "../../../core/utils/text";
import { useSearchQueries } from "../hooks/use-search-queries";
import { Operator } from "../types";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

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
          // Ages & Publicationyear: show as range instead of individual values
          if (
            preSearchFacet.facetField === ComplexSearchFacetsEnum.Ages ||
            preSearchFacet.facetField ===
              ComplexSearchFacetsEnum.Publicationyear
          ) {
            const [from, to] = preSearchFacet.selectedValues;
            const hasRange = to && from !== to;
            const value = hasRange ? `${from}-${to}` : `${from}+`;

            return (
              <React.Fragment key={preSearchFacet.facetField}>
                {renderOperator("and")}
                {renderItem(preSearchFacet.label, value)}
              </React.Fragment>
            );
          }

          // Other facets: show each value
          return preSearchFacet.selectedValues.map((value, i) => (
            <React.Fragment key={`${preSearchFacet.facetField}-${i}`}>
              {renderOperator("and")}
              {renderItem(preSearchFacet.label, value)}
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
