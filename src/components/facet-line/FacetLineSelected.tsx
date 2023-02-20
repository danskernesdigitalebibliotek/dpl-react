import React from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import { Filter, FilterPayloadType } from "../../core/filter.slice";

import ButtonTag from "../Buttons/ButtonTag";

const FacetLineSelected = () => {
  const { filters, removeFromFilter } = useFilterHandler();

  return (
    <ul className="facet-line-selected-terms">
      {Object.entries(filters as Filter).map(([facet, value]) => {
        return (
          <>
            {Object.entries(value).map(([label, term]) => {
              return (
                <li className="facet-line-selected-terms__item">
                  <ButtonTag
                    selected
                    removable
                    onClick={() =>
                      removeFromFilter({
                        facet,
                        term
                      } as FilterPayloadType)
                    }
                    dataCy={`facet-line-selected-term-${label}`}
                  >
                    {label}
                  </ButtonTag>
                </li>
              );
            })}
          </>
        );
      })}
    </ul>
  );
};

export default FacetLineSelected;
