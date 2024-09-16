import React, { memo } from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import {
  FacetFieldEnum,
  FacetValue
  FacetField,
  SearchSortingOption
} from "../../core/dbc-gateway/generated/graphql";
import { useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import ButtonTag from "../Buttons/ButtonTag";
import Dropdown from "../Dropdown/Dropdown";
import {
  FacetBrowserModalId,
  createFacetsMap,
  findTermInFacetMap,
  getFacetFieldTranslation
} from "../facet-browser/helper";
import { Facets } from "../../core/utils/types/entities";

type FacetLineFiltersProps = {
  facets: Facets;
  sorting: SearchSortingOption[] | null;
};

const formatValuesToDropdown = (facet: string, values: FacetValue[]) => {
  return values.map((value) => {
    return {
      label: value.term,
      value: value.key
    };
  });
};

const formatSortingOptionsToDropdown = (
  sortingOptions: SearchSortingOption[]
) => {
  return sortingOptions.map((option) => {
    return {
      label: option.name,
      value: option.value
    };
  });
};

const FacetLineFilters: React.FunctionComponent<FacetLineFiltersProps> = ({
  facets = [],
  sorting = null
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { filters, addToFilter, setSorting } = useFilterHandler();
  // TODO: Since the huge refactoring of the FBI API,
  // summer 2024, a lot of changes has been introduced
  // which implies refactoring of facet types/functionality.
  // Something here needs to be looked at.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const facetMap = createFacetsMap(facets);

  const handleDropdownOnchange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    facet: string
  ) => {
    const term = findTermInFacetMap(facet, e.target.value, facetMap);

    if (!term) return;

    addToFilter({
      facet,
      term
    });
  };

  const onSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(
      (sorting || []).find((option) => option.value === event.target.value)
    );
  };

  return (
    <section>
      <h2 className="hide-visually">
        {t("intelligentFiltersAccessibleHeadlineText")}
      </h2>
      <ul className="facet-line mt-48">
        {sorting && sorting.length !== 0 ? (
          <li className="facet-line__item">
            <Dropdown
              cyData="sorting-line-dropdown"
              placeholder={{
                label: t("searchSortingOptionText"),
                value: ""
              }}
              options={formatSortingOptionsToDropdown(sorting)}
              ariaLabel={t("searchSortingOptionText")}
              arrowIcon="chevron"
              classNames="dropdown--grey-borders"
              innerClassNames={{
                select: "dropdown__select--inline",
                arrowWrapper: "dropdown__arrows--inline "
              }}
              handleOnChange={(e) => onSortingChange(e)}
            />
          </li>
        ) : null}
        {facets &&
          facets.map(({ name, values }) => {
            if (values.length > 1) {
              const translatedName = getFacetFieldTranslation(
                name as FacetFieldEnum
              );
              return (
                <li className="facet-line__item">
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
    </section>
  );
};

export default memo(FacetLineFilters);
