import React from "react";
import {
  FilterItemTerm,
  TagOnclickHandler
} from "../../apps/search-result/types";
import { FacetResult } from "../../core/dbc-gateway/generated/graphql";
import { capitalizeFirstLetter } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import Disclosure from "../material/disclosures/disclosure";
import Tag from "../tag/Tag";

interface FacetBrowserModalBodyProps {
  facets: FacetResult[];
  filterHandler: TagOnclickHandler;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
}

const FacetBrowserModalBody: React.FunctionComponent<
  FacetBrowserModalBodyProps
> = ({ facets, filterHandler, filters }) => {
  const t = useText();
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
          <Disclosure
            key={name}
            fullWidth
            removeHeadlinePadding
            title={t(`facet${capitalizeFirstLetter(name)}Text`)}
          >
            <div className="facet-browser__facet-group">
              {values.map((termItem) => {
                const { term } = termItem;

                const selected = Boolean(filters[name] && filters[name][term]);

                return (
                  <Tag
                    key={term}
                    onClick={() =>
                      filterHandler({
                        filterItem: {
                          facet: name,
                          term: termItem
                        },
                        action: selected ? "remove" : "add"
                      })
                    }
                    selected={selected}
                  >
                    {termItem.term} ({termItem.score})
                  </Tag>
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
          </Disclosure>
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
      />
    </section>
  );
};

export default FacetBrowserModalBody;
