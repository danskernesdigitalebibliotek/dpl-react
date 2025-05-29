import React from "react";
import { upperFirst } from "lodash";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import ButtonTag from "../Buttons/ButtonTag";
import DisclosureControllable from "../Disclosures/DisclosureControllable";
import { useModalButtonHandler } from "../../core/utils/modal";
import { FacetBrowserModalId } from "./helper";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import DisclosureSummary from "../Disclosures/DisclosureSummary";
import { Facets } from "../../core/utils/types/entities";

interface FacetBrowserModalBodyProps {
  facets: Facets;
}

const FacetBrowserModalBody: React.FunctionComponent<
  FacetBrowserModalBodyProps
> = ({ facets }) => {
  const { filters, addToFilter, removeFromFilter } = useFilterHandler();

  const t = useText();
  const { close } = useModalButtonHandler();

  return (
    <section className="facet-browser">
      <header className="facet-browser__header">
        <h2 className="text-header-h3">{t("filterListText")}</h2>
      </header>
      {facets &&
        facets.map((facet) => {
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
              detailsClassName="disclosure text-body-large disclosure--full-width"
              summary={
                <DisclosureSummary
                  title={t(`facet${upperFirst(name)}Text`)}
                  className="disclosure__headline--no-padding"
                />
              }
            >
              <ul className="facet-browser__facet-group">
                {values.map((termItem) => {
                  const { term } = termItem;

                  const selected = Boolean(
                    filters[name] && filters[name][term]
                  );

                  // If there is no term name (eg. when using placeholder data, see: FacetBrowserModal)
                  // then do not render term.
                  if (!termItem.term) {
                    return null;
                  }

                  const handleAddOrRemoveFilter = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    return selected
                      ? removeFromFilter({ facet: name, term: termItem })
                      : addToFilter({
                          facet: name,
                          term: termItem,
                          origin: "facetBrowser"
                        });
                  };

                  return (
                    <li key={termItem.key}>
                      <ButtonTag
                        key={term}
                        onClick={handleAddOrRemoveFilter}
                        selected={selected}
                        dataCy={`facet-browser-${name}-${term}`}
                      >
                        {termItem.term}
                      </ButtonTag>
                    </li>
                  );
                })}
              </ul>
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
