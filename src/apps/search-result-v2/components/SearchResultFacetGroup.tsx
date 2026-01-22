import React, { useState } from "react";
import clsx from "clsx";
import {
  FacetFieldEnum,
  FacetValue
} from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import CheckBox from "../../../components/checkbox/Checkbox";
import iconExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import iconPlus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Plus.svg";
import iconMinus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Minus.svg";

interface SearchResultFacetGroupProps {
  facetField: FacetFieldEnum;
  label: string;
  selectedValues: string[];
  selectedCount: number;
  facetValues: FacetValue[];
  onChange: (selectedValues: string[]) => void;
}

const INITIAL_DISPLAY_LIMIT = 5;

const SearchResultFacetGroup: React.FC<SearchResultFacetGroupProps> = ({
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
    <li className="search-v2-facet-group">
      <button
        type="button"
        className="search-v2-facet-group__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`filter-group-content-${facetField}`}
      >
        <div className="search-v2-facet-group__header-content">
          <span className="search-v2-facet-group__label">{label}</span>
          {selectedCount > 0 && (
            <span className="search-v2-facet-group__count-badge">
              {selectedCount}
            </span>
          )}
        </div>
        <img
          src={iconExpandMore}
          alt=""
          className={clsx(
            "search-v2-facet-group__chevron",
            isExpanded && "search-v2-facet-group__chevron--expanded"
          )}
        />
      </button>

      {isExpanded && (
        <>
          <ul
            id={`filter-group-content-${facetField}`}
            className="search-v2-facet-group__content"
          >
            {displayedValues.map((facetValue) => {
              const value = facetValue.term;
              const count = facetValue.score ?? 0;
              const isChecked = selectedValues.includes(value);
              const countId = `filter-${facetField}-${value}-count`;

              return (
                <li key={value} className="search-v2-facet-group__item">
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
                      className="search-v2-facet-group__item-count"
                    >
                      {count}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {hasMoreValues && (
            <div className="search-v2-facet-group__footer">
              <button
                type="button"
                className="search-v2-facet-group__show-all"
                onClick={() => setShowAll(!showAll)}
                aria-controls={`filter-group-content-${facetField}`}
                aria-expanded={showAll}
              >
                <img
                  src={showAll ? iconMinus : iconPlus}
                  alt=""
                  className="search-v2-facet-group__show-all-icon"
                />
                <span>
                  {showAll
                    ? 't("advancedSearchShowLessText")'
                    : 't("advancedSearchShowAllText")'}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default SearchResultFacetGroup;
