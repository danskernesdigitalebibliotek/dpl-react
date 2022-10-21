import React from "react";
import { FacetResult } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import Disclosure from "../material/disclosures/disclosure";
import Tag from "../tag/Tag";

interface FacetBrowserModalBodyProps {
  facets: FacetResult[];
}

const FacetBrowserModalBody: React.FunctionComponent<
  FacetBrowserModalBodyProps
> = ({ facets }) => {
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
      {facets.map(({ name, values }) => {
        // Remove facets disclosures with no tags
        if (values.length === 0) return null;

        return (
          <Disclosure
            key={name}
            fullWidth
            removeHeadlinePadding
            title={t(`${name}Text`)}
          >
            <div className="facet-browser__facet-group">
              {values.map(({ term, score }) => (
                <Tag>
                  {term} ({score})
                </Tag>
              ))}
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
