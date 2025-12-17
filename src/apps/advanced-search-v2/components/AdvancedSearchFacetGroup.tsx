import React, { useState } from "react";
import clsx from "clsx";
import {
  ComplexSearchFacetsEnum,
  ComplexSearchFacetValue
} from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import CheckBox from "../../../components/checkbox/Checkbox";
import iconExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import iconPlus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Plus.svg";
import iconMinus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Minus.svg";

interface AdvancedSearchFilterGroupProps {
  facetField: ComplexSearchFacetsEnum;
  label: string;
  selectedValues: string[];
  selectedCount: number;
  facetValues: ComplexSearchFacetValue[];
  onChange: (selectedValues: string[]) => void;
}

const INITIAL_DISPLAY_LIMIT = 5;

const AdvancedSearchFilterGroup: React.FC<AdvancedSearchFilterGroupProps> = ({
  facetField,
  label,
  selectedValues,
  selectedCount,
  facetValues,
  onChange
}) => {
  const t = useText();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  const displayedValues = showAll
    ? facetValues
    : facetValues.slice(0, INITIAL_DISPLAY_LIMIT);
  const hasMoreValues = facetValues.length > INITIAL_DISPLAY_LIMIT;

  // Don't render if there are no facet values
  if (facetValues.length === 0) {
    return null;
  }

  return (
    <li className="advanced-search-facet-group">
      <button
        type="button"
        className="advanced-search-facet-group__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`filter-group-content-${facetField}`}
      >
        <div className="advanced-search-facet-group__header-content">
          <span className="advanced-search-facet-group__label">{label}</span>
          {selectedCount > 0 && (
            <span className="advanced-search-facet-group__count-badge">
              {selectedCount}
            </span>
          )}
        </div>
        <img
          src={iconExpandMore}
          alt=""
          className={clsx(
            "advanced-search-facet-group__chevron",
            isExpanded && "advanced-search-facet-group__chevron--expanded"
          )}
        />
      </button>

      {isExpanded && (
        <>
          <ul
            id={`filter-group-content-${facetField}`}
            className="advanced-search-facet-group__content"
          >
            {displayedValues.map((facetValue) => {
              const value = facetValue.key;
              const count = facetValue.score ?? 0;
              const isChecked = selectedValues.includes(value);
              const countId = `filter-${facetField}-${value}-count`;

              return (
                <li key={value} className="advanced-search-facet-group__item">
                  <CheckBox
                    id={`filter-${facetField}-${value}`}
                    label={value}
                    selected={isChecked}
                    onChecked={(checked) =>
                      handleCheckboxChange(value, checked)
                    }
                    ariaDescribedBy={count > 0 ? countId : undefined}
                  />
                  {count > 0 && (
                    <span
                      id={countId}
                      className="advanced-search-facet-group__item-count"
                    >
                      {count}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {hasMoreValues && (
            <div className="advanced-search-facet-group__footer">
              <button
                type="button"
                className="advanced-search-facet-group__show-all"
                onClick={() => setShowAll(!showAll)}
                aria-controls={`filter-group-content-${facetField}`}
                aria-expanded={showAll}
              >
                <img
                  src={showAll ? iconMinus : iconPlus}
                  alt=""
                  className="advanced-search-facet-group__show-all-icon"
                />
                <span>
                  {showAll
                    ? t("advancedSearchShowLessText")
                    : t("advancedSearchShowAllText")}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default AdvancedSearchFilterGroup;
