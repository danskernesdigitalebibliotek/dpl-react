import React, { useEffect, useRef } from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";

import ButtonTag from "../Buttons/ButtonTag";

const FacetLineSelected = () => {
  const { filters, removeFromFilter } = useFilterHandler();
  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const lastFacet = Object.keys(filters).slice(-1)[0];
    if (lastFacet) {
      const lastTerm = Object.keys(filters[lastFacet]).slice(-1)[0];
      buttonsRef.current[`${lastFacet}-${lastTerm}`]?.focus();
    }
  }, [filters]);

  return (
    <ul className="facet-line-selected-terms">
      {Object.entries(filters).map(([facet, value]) => (
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
  );
};

export default FacetLineSelected;
