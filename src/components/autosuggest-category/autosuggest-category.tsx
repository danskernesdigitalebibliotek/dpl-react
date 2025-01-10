import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import * as React from "react";
import { FC } from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Suggestion } from "../../core/utils/types/autosuggest";
import { getAutosuggestCategoryList } from "../../apps/search-header/helpers";

export interface AutosuggestCategoryProps {
  categoryData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  highlightedIndex: number;
  textAndMaterialDataLength: number;
  dataCy?: string;
}

const AutosuggestCategory: FC<AutosuggestCategoryProps> = ({
  categoryData,
  getItemProps,
  highlightedIndex,
  textAndMaterialDataLength,
  dataCy = "autosuggest-category-item"
}) => {
  const t = useText();
  return (
    <>
      {/* The downshift combobox works this way by design (line 43) */}
      {categoryData.map((item, incorrectIndex) => {
        // incorrectIndex because in the whole of autosuggest dropdown it is
        // not the correct index for the item. We first need to add the length of
        // items from autosuggest string suggestion to it for it to be accurate (=> index)
        const index = incorrectIndex + textAndMaterialDataLength;
        return (
          <li
            className={clsx(
              "autosuggest__text-item text-body-medium-regular px-24",
              {
                "autosuggest__text-item--highlight": highlightedIndex === index
              }
            )}
            key={`${item.term}-${index}`}
            {...getItemProps({ item, index })}
            data-cy={dataCy}
          >
            <p className="autosuggest__text text-body-medium-regular">
              {`${item.term} ${t("inText")}`}
            </p>
            <div className="boxed-text text-tags noselect ml-8">
              {getAutosuggestCategoryList(t)[incorrectIndex].render}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default AutosuggestCategory;
