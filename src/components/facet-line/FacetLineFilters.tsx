import React, { memo } from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import {
  FacetFieldEnum,
  FacetValue
} from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import ButtonTag from "../Buttons/ButtonTag";
import Dropdown from "../Dropdown/Dropdown";
import {
  createFacetsMap,
  findTermInFacetMap,
  getFacetFieldTranslation
} from "../facet-browser/helper";
import { Facets } from "../../core/utils/types/entities";

type FacetLineFiltersProps = {
  facets: Facets;
};

const FacetLineFilters: React.FunctionComponent<FacetLineFiltersProps> = ({
  facets = []
}) => {
  const t = useText();
  const { filters, addToFilter } = useFilterHandler();
  // TODO: Since the huge refactoring of the FBI API,
  // summer 2024, a lot of changes has been introduced
  // which implies refactoring of facet types/functionality.
  // Something here needs to be looked at.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const facetMap = createFacetsMap(facets);

  const formatValuesToDropdown = (facet: string, values: FacetValue[]) => {
    const dropdownValues = values.map((value) => {
      return {
        label: value.term,
        value: value.key
      };
    });
    if (facet.toUpperCase() === FacetFieldEnum.Year.toUpperCase()) {
      dropdownValues.sort((a, b) => Number(b.label) - Number(a.label));
    }
    return dropdownValues;
  };

  const handleDropdownOnchange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    facet: string
  ) => {
    const term = findTermInFacetMap(facet, e.target.value, facetMap);

    if (!term) return;

    addToFilter({
      facet,
      term,
      origin: "facetLine"
    });
  };

  return (
    <section>
      <h2 className="hide-visually">
        {t("intelligentFiltersAccessibleHeadlineText")}
      </h2>
      <ul className="facet-line mt-48">
        {facets &&
          facets.map(({ name, values }, index) => {
            if (values.length > 1) {
              const translatedName = getFacetFieldTranslation(
                name as FacetFieldEnum
              );
              return (
                <li key={index} className="facet-line__item">
                  <Dropdown
                    cyData={`facet-line-${name}-dropdown`}
                    placeholder={{
                      label: t(translatedName),
                      value: ""
                    }}
                    options={formatValuesToDropdown(name, values)}
                    ariaLabel={t(translatedName)}
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
                  const { term } = termObj;

                  const onClickHandler = () =>
                    addToFilter({
                      facet: name,
                      term: termObj,
                      origin: "facetLine"
                    });

                  // Removes the selected term from the filter line because it is now displayed in the selected line
                  if (filters?.[name]?.[term]) return null;

                  return (
                    <li key={termObj.key} className="facet-line__item">
                      <ButtonTag
                        key={term}
                        onClick={onClickHandler}
                        selected={false}
                        dataCy={`facet-line-term-${term}`}
                      >
                        {`${term}`}
                      </ButtonTag>
                    </li>
                  );
                })}
              </>
            );
          })}
      </ul>
    </section>
  );
};

export default memo(FacetLineFilters);
