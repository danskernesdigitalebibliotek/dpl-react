import React from "react";
import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import ButtonTag from "../Buttons/ButtonTag";

type FacetLineSelectedProps = {
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  filterHandler: TermOnClickHandler;
};

const FacetLineSelected: React.FunctionComponent<FacetLineSelectedProps> = ({
  filters,
  filterHandler
}) => {
  return (
    <ul className="facet-line-selected-terms">
      {Object.entries(filters).map(([facet, value]) => {
        return (
          <>
            {Object.entries(value).map(([label, term]) => {
              return (
                <li className="facet-line-selected-terms__item">
                  <ButtonTag
                    selected
                    removable
                    onClick={() =>
                      filterHandler({
                        filterItem: {
                          facet,
                          term
                        },
                        action: "remove"
                      })
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
