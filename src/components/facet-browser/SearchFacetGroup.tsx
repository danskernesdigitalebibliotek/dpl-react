import React, { useState } from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import CheckBox from "../checkbox/Checkbox";
import iconExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import iconPlus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Plus.svg";
import iconMinus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Minus.svg";

export interface SearchFacetGroupProps<
  TFacetField extends string | number,
  TValue extends { score?: number | null }
> {
  facetField: TFacetField;
  label: string;
  selectedValues: string[];
  selectedCount: number;
  facetValues: TValue[];
  showScore?: boolean;
  onChange: (selectedValues: string[]) => void;
  /**
   * Returns the string value used both as the checkbox label and the value stored in selectedValues.
   */
  getValue: (facetValue: TValue) => string;
}

const INITIAL_DISPLAY_LIMIT = 5;

function SearchFacetGroup<
  TFacetField extends string | number,
  TValue extends { score?: number | null }
>({
  facetField,
  label,
  selectedValues,
  selectedCount,
  facetValues,
  showScore = true,
  onChange,
  getValue
}: SearchFacetGroupProps<TFacetField, TValue>) {
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
              const value = getValue(facetValue);
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
                  {showScore && count > 0 && (
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
                  {showAll ? t("searchShowLessText") : t("searchShowAllText")}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
}

export default SearchFacetGroup;
