import { upperFirst } from "lodash";
import React from "react";

import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import {
  FacetResult,
  FacetValue
} from "../../core/dbc-gateway/generated/graphql";
import { useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import ButtonTag from "../Buttons/ButtonTag";
import Dropdown from "../Dropdown/Dropdown";
import { FacetBrowserModalId } from "../facet-browser/helper";

type FacetLineFiltersProps = {
  facets: FacetResult[];
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  filterHandler: TermOnClickHandler;
};

const FacetLineFilters: React.FunctionComponent<FacetLineFiltersProps> = ({
  facets = [],
  filters,
  filterHandler
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();

  const formatValuesToDropdown = (facet: string, values: FacetValue[]) => {
    return values.map((value) => {
      return {
        label: value.term,
        value: value.key
      };
    });
  };

  const handleDropdownOnchange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    facet: string
  ) => {
    const term = facets
      .find((item) => item.name === facet)
      ?.values.find((item) => item.key === e.target.value) as FilterItemTerm;

    filterHandler({
      filterItem: {
        facet,
        term
      },
      action: "add"
    });
  };

  return (
    <ul className="facet-line mt-48">
      {facets.map(({ name, values }) => {
        if (values.length > 1) {
          return (
            <li className="facet-line__item">
              <Dropdown
                placeholder={t(`facet${upperFirst(name)}Text`)}
                options={formatValuesToDropdown(name, values)}
                ariaLabel={name}
                arrowIcon="chevron"
                classNames="dropdown--grey-borders"
                innerClassNames={{
                  select: "dropdown__select--inline",
                  arrowWrapper: "dropdown__arrows--inline "
                }}
                handleOnChange={(e) => handleDropdownOnchange(e, name)}
              />
            </li>
          );
        }

        return (
          <>
            {values.map((termObj) => {
              const { term, score } = termObj;

              const onClickHandler = () => {
                filterHandler({
                  filterItem: {
                    facet: name,
                    term: termObj as FilterItemTerm
                  },
                  action: "add"
                });
              };

              // Removes the selected term from the filter line because it is now displayed in the selected line
              if (filters?.[name]?.[term]) return null;

              return (
                <li className="facet-line__item">
                  <ButtonTag
                    key={term}
                    onClick={onClickHandler}
                    selected={false}
                    dataCy={`facet-line-term-${term}`}
                  >
                    {`${term} (${score})`}
                  </ButtonTag>
                </li>
              );
            })}
          </>
        );
      })}
      <li className="facet-line__item">
        <ButtonTag
          onClick={() => open(FacetBrowserModalId)}
          dataCy="facet-line-open-browser"
        >
          {t("addMoreFiltersText")}
        </ButtonTag>
      </li>
    </ul>
  );
};

export default FacetLineFilters;
