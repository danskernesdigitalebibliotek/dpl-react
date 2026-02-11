import React, { useEffect, useRef } from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import ButtonTag from "../Buttons/ButtonTag";
import { useText } from "../../core/utils/text";
import { FacetBrowserModalId } from "../facet-browser/helper";
import IconFilter from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-filter.svg";
import { useModalButtonHandler } from "../../core/utils/modal";

const FacetLineSelected = () => {
  const { filters, removeFromFilter } = useFilterHandler();
  const { open } = useModalButtonHandler();
  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const t = useText();

  useEffect(() => {
    const lastFacet = Object.keys(filters).slice(-1)[0];
    if (lastFacet) {
      const lastTerm = Object.keys(filters[lastFacet]).slice(-1)[0];
      buttonsRef.current[`${lastFacet}-${lastTerm}`]?.focus();
    }
  }, [filters]);

  return (
    <section>
      <h2 className="hide-visually">
        {t("intelligentFiltersSelectedAccessibleHeadlineText")}
      </h2>
      <ul className="facet-line-selected-terms">
        {Object.entries(filters).map(([facet, value]) => (
          <React.Fragment key={facet}>
            {Object.entries(value).map(([label, term]) => (
              <li
                key={`${facet}-${label}`}
                className="facet-line-selected-terms__item"
              >
                <ButtonTag
                  ref={(el) => {
                    buttonsRef.current[`${facet}-${label}`] = el;
                  }}
                  selected
                  removable
                  onClick={() => removeFromFilter({ facet, term })}
                  dataCy={`facet-line-selected-term-${label}`}
                >
                  {label}
                </ButtonTag>
              </li>
            ))}
          </React.Fragment>
        ))}
        <li className="facet-line-more-filters">
          <ButtonTag
            onClick={() => open(FacetBrowserModalId)}
            dataCy="facet-line-open-browser"
            className="btn--link-styling"
          >
            <img src={IconFilter} alt="" className="mr-8" />
            <span className="link-tag">{t("addMoreFiltersText")}</span>
          </ButtonTag>
        </li>
      </ul>
    </section>
  );
};

export default FacetLineSelected;
