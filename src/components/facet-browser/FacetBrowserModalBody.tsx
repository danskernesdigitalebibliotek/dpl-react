import React from "react";
import { isEmpty, upperFirst } from "lodash";
import { useDeepCompareEffect } from "react-use";
import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import { FacetResult } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import ButtonTag from "../Buttons/ButtonTag";
import FacetBrowserDisclosure from "./FacetBrowserDisclosure";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { useModalButtonHandler } from "../../core/utils/modal";
import { FacetBrowserModalId } from "./helper";

interface FacetBrowserModalBodyProps {
  facets: FacetResult[];
  filterHandler: TermOnClickHandler;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  openFacets: string[];
  setOpenFacets: (openFacets: string[]) => void;
}

const FacetBrowserModalBody: React.FunctionComponent<
  FacetBrowserModalBodyProps
> = ({ facets, filterHandler, filters, openFacets, setOpenFacets }) => {
  const { close } = useModalButtonHandler();
  const t = useText();

  const toggleFacets = (facet: string) => () => {
    if (openFacets.includes(facet)) {
      setOpenFacets(openFacets.filter((f) => f !== facet));
    } else {
      setOpenFacets([...openFacets, facet]);
    }
  };
  const { track } = useStatistics();

  useDeepCompareEffect(() => {
    if (isEmpty(filters)) {
      return;
    }
    track("click", {
      id: statistics.searchFacets.id,
      name: statistics.searchFacets.name,
      trackedData: JSON.stringify(
        mapValues(filters, (filter) => {
          return Object.keys(filter).join(", ");
        })
      )
    });
    // We only want to track when filters change value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <section className="facet-browser">
      <header className="facet-browser__header">
        <h3 className="text-header-h3">{t("filterListText")}</h3>
        {/* TODO: It will be used in the future to remove all selected facets */}
        {false && (
          <button
            type="button"
            className="link-tag cursor-pointer facet-browser__clear-btn"
          >
            {t("clearAllText")}
          </button>
        )}
      </header>
      {facets.map((facet) => {
        const { name, values } = facet;
        // Remove facets disclosures with no tags
        if (values.length === 0) return null;

        return (
          <FacetBrowserDisclosure
            key={name}
            id={name}
            fullWidth
            removeHeadlinePadding
            title={t(`facet${upperFirst(name)}Text`)}
            showContent={openFacets.includes(name)}
            onClick={toggleFacets(name)}
          >
            <div className="facet-browser__facet-group">
              {values.map((termItem) => {
                const { term } = termItem;

                const selected = Boolean(filters[name] && filters[name][term]);

                // If there is no term name (eg. when using placeholder data, see: FacetBrowserModal)
                // then do not render term.
                if (!termItem.term) {
                  return null;
                }

                return (
                  <ButtonTag
                    key={term}
                    onClick={(e) => {
                      // This to prevent the disclosure from closing when clicking on a tag because event bobbling
                      e.stopPropagation();
                      filterHandler({
                        filterItem: {
                          facet: name,
                          term: termItem
                        },
                        action: selected ? "remove" : "add"
                      });
                    }}
                    selected={selected}
                  >
                    {termItem.term} {termItem?.score && `(${termItem.score})`}
                  </ButtonTag>
                );
              })}
            </div>

            {/* TODO: It will be used in the future to check if there is more tags to show */}
            {false && (
              <button
                type="button"
                className="link-tag cursor-pointer facet-browser__more-btn"
              >
                {t("showMoreText")}
              </button>
            )}
          </FacetBrowserDisclosure>
        );
      })}

      <Button
        classNames="facet-browser__results-btn"
        label={t("showResultsText")}
        buttonType="none"
        disabled={false}
        collapsible={false}
        size="medium"
        variant="filled"
        onClick={() => {
          close(FacetBrowserModalId);
        }}
      />
    </section>
  );
};

export default FacetBrowserModalBody;
