import React, { useEffect, useRef } from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import ButtonTag from "../Buttons/ButtonTag";
import { useText } from "../../core/utils/text";

const FacetLineSelected = () => {
  const { filters, sorting, removeFromFilter } = useFilterHandler();
  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const t = useText();

  let _filters = filters;
  if (sorting) {
    _filters = {
      sorting: { [sorting.term]: sorting },
      ..._filters
    }
  }

  useEffect(() => {
    const lastFacet = Object.keys(_filters).slice(-1)[0];
    if (lastFacet) {
      const lastTerm = Object.keys(_filters[lastFacet]).slice(-1)[0];
      buttonsRef.current[`${lastFacet}-${lastTerm}`]?.focus();
    }
  }, [_filters]);

  return (
    <section>
      <h2 className="hide-visually">
        {t("intelligentFiltersSelectedAccessibleHeadlineText")}
      </h2>
      <ul className="facet-line-selected-terms">
        {Object.entries(_filters).map(([facet, value]) => (
          <React.Fragment key={facet}>
            {Object.entries(value).map(([label, term]) => (
              <li
                key={`${facet}-${label}`}
                className="facet-line-selected-terms__item"
              >
                <ButtonTag
                  ref={(el) => {
                    buttonsRef.current[`${facet}-${label}`] = el;
                  }}
                  selected
                  removable
                  onClick={() => removeFromFilter({ facet, term })}
                  dataCy={`facet-line-selected-term-${label}`}
                >
                  {label}
                </ButtonTag>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default FacetLineSelected;
