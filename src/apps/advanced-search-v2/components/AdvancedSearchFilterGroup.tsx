import React, { useState } from "react";
import clsx from "clsx";
import {
  ComplexSearchFacetsEnum,
  ComplexSearchFacetValue
} from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import CheckBox from "../../../components/checkbox/Checkbox";
import iconExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";

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
    <li className="advanced-search-filter-group">
      <button
        type="button"
        className="advanced-search-filter-group__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`filter-group-content-${facetField}`}
      >
        <div className="advanced-search-filter-group__header-content">
          <span className="advanced-search-filter-group__label">{label}</span>
          {selectedCount > 0 && (
            <span className="advanced-search-filter-group__count-badge">
              {selectedCount}
            </span>
          )}
        </div>
        <img
          src={iconExpandMore}
          alt=""
          className={clsx(
            "advanced-search-filter-group__chevron",
            isExpanded && "advanced-search-filter-group__chevron--expanded"
          )}
        />
      </button>

      {isExpanded && (
        <>
          <ul
            id={`filter-group-content-${facetField}`}
            className="advanced-search-filter-group__content"
          >
            {displayedValues.map((facetValue) => {
              const value = facetValue.key;
              const count = facetValue.score ?? 0;
              const isChecked = selectedValues.includes(value);

              return (
                <li key={value} className="advanced-search-filter-group__item">
                  <CheckBox
                    id={`filter-${facetField}-${value}`}
                    label={value}
                    selected={isChecked}
                    onChecked={(checked) =>
                      handleCheckboxChange(value, checked)
                    }
                  />
                  {count > 0 && (
                    <span className="advanced-search-filter-group__item-count">
                      {count}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {hasMoreValues && (
            <div className="advanced-search-filter-group__footer">
              <button
                type="button"
                className="advanced-search-filter-group__show-all"
                onClick={() => setShowAll(!showAll)}
              >
                <svg
                  className="advanced-search-filter-group__show-all-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M4 8H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
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
