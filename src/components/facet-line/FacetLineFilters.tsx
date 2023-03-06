import { upperFirst } from "lodash";
import React, { memo } from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
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
};

const FacetLineFilters: React.FunctionComponent<FacetLineFiltersProps> = ({
  facets = []
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { filters, addToFilter } = useFilterHandler();

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
      ?.values.find((item) => item.key === e.target.value);

    if (!term) return;

    addToFilter({
      facet,
      term
    });
  };

  return (
    <ul className="facet-line mt-48">
      {facets.map(({ name, values }) => {
        if (values.length > 1) {
          return (
            <li className="facet-line__item">
              <Dropdown
                cyData={`facet-line-${name}-dropdown`}
                placeholder={{
                  label: t(`facet${upperFirst(name)}Text`),
                  value: ""
                }}
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

              const onClickHandler = () =>
                addToFilter({
                  facet: name,
                  term: termObj
                });

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

export default memo(FacetLineFilters);
