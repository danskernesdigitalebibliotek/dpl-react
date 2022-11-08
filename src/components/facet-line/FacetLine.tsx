import { upperFirst } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";

import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import {
  FacetResult,
  FacetValue
} from "../../core/dbc-gateway/generated/graphql";
import { openModal } from "../../core/modal.slice";
import { useText } from "../../core/utils/text";
import ButtonTag from "../Buttons/ButtonTag";
import { FacetBrowserModalId } from "../facet-browser/FacetBrowserModal";
import {
  defaultFacetLineTerms,
  showFacetAsSelect
} from "../facet-browser/helper";
import Dropdown from "./Dropdown";

type FacetLineProps = {
  facets: FacetResult[];
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  filterHandler: TermOnClickHandler;
};

const FacetLine: React.FunctionComponent<FacetLineProps> = ({
  facets,
  filters,
  filterHandler
}) => {
  const t = useText();
  const dispatch = useDispatch();

  const formatValuesToDropdown = (values: FacetValue[]) => {
    return values.map((value) => {
      return {
        title: value.term,
        value,
        disabled: Boolean(filters?.genreAndForm?.[value.term]),
        selected: Boolean(filters?.genreAndForm?.[value.term])
      };
    });
  };

  const handleDropdownOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreAndForm = facets.find((facet) => facet.name === "genreAndForm");
    const term = genreAndForm?.values.find(
      (value) => value.term === e.target.value
    );
    if (term) {
      filterHandler({
        filterItem: {
          facet: "genreAndForm",
          term: term as FilterItemTerm
        },
        action: "add"
      });
    }
  };

  return (
    <ul className="facet-line mt-48">
      {facets.map(({ name, values }) => {
        if (showFacetAsSelect.includes(name)) {
          return (
            <li className="facet-line__item">
              <Dropdown
                placeholder={t(`facet${upperFirst(name)}Text`)}
                list={formatValuesToDropdown(values)}
                ariaLabel={name}
                arrowIcon="chevron"
                classNames="dropdown--grey-borders"
                innerClassNames={{
                  select: "dropdown__select--inline",
                  arrowWrapper: "dropdown__arrows--inline "
                }}
                handleOnChange={handleDropdownOnchange}
              />
            </li>
          );
        }

        return (
          <>
            {values.map((termObj) => {
              const { term, score } = termObj;
              if (defaultFacetLineTerms.includes(term)) {
                return (
                  <li className="facet-line__item">
                    <ButtonTag
                      key={term}
                      onClick={() =>
                        filterHandler({
                          filterItem: {
                            facet: name,
                            term: termObj as FilterItemTerm
                          },
                          action: "add"
                        })
                      }
                      removeAriaPressed={Boolean(filters?.[name]?.[term])}
                    >
                      {`${term} (${score})`}
                    </ButtonTag>
                  </li>
                );
              }
              return null;
            })}
          </>
        );
      })}
      <li className="facet-line__item">
        <ButtonTag
          onClick={() => dispatch(openModal({ modalId: FacetBrowserModalId }))}
        >
          {t("addMoreFiltersText")}
        </ButtonTag>
      </li>
    </ul>
  );
};

export default FacetLine;
