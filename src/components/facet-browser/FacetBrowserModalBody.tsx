import React from "react";
import { isEmpty, upperFirst } from "lodash";
import { useDeepCompareEffect } from "react-use";
import { FacetResult } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import ButtonTag from "../Buttons/ButtonTag";
import DisclosureControllable from "../Disclosures/DisclosureControllable";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { useModalButtonHandler } from "../../core/utils/modal";
import { FacetBrowserModalId, getAllFilterPathsAsString } from "./helper";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import DisclosureSummary from "../Disclosures/DisclosureSummary";

interface FacetBrowserModalBodyProps {
  facets: FacetResult[];
}

const FacetBrowserModalBody: React.FunctionComponent<
  FacetBrowserModalBodyProps
> = ({ facets }) => {
  const { filters, addToFilter, removeFromFilter } = useFilterHandler();

  const t = useText();
  const { close } = useModalButtonHandler();
  const { track } = useStatistics();

  useDeepCompareEffect(() => {
    if (isEmpty(filters)) {
      return;
    }
    track("click", {
      id: statistics.searchFacets.id,
      name: statistics.searchFacets.name,
      trackedData: getAllFilterPathsAsString(filters)
    });
    // We only want to track when filters change value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <section className="facet-browser">
      <header className="facet-browser__header">
        <h2 className="text-header-h3">{t("filterListText")}</h2>
      </header>
      {facets.map((facet) => {
        const { name, values } = facet;
        // Remove facets disclosures with no tags
        if (values.length === 0) return null;

        const hasSelectedTerms = Boolean(filters[name]);

        return (
          <DisclosureControllable
            key={name}
            cyData={`facet-browser-${name}`}
            id={name}
            showContent={hasSelectedTerms}
            className="disclosure--full-width"
            summary={
              <DisclosureSummary
                title={t(`facet${upperFirst(name)}Text`)}
                className="disclosure__headline--no-padding"
              />
            }
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

                const handleAddOrRemoveFilter = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  return selected
                    ? removeFromFilter({ facet: name, term: termItem })
                    : addToFilter({ facet: name, term: termItem });
                };

                return (
                  <ButtonTag
                    key={term}
                    onClick={handleAddOrRemoveFilter}
                    selected={selected}
                    dataCy={`facet-browser-${name}-${term}`}
                  >
                    {termItem.term} {termItem?.score && `(${termItem.score})`}
                  </ButtonTag>
                );
              })}
            </div>
          </DisclosureControllable>
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
