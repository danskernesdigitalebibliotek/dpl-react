import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import * as React from "react";
import { FC } from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Suggestion } from "../../core/utils/types/autosuggest";

export interface AutosuggestCategoryProps {
  categoryData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  highlightedIndex: number;
  textAndMaterialDataLength: number;
  autosuggestCategoryList: { render: string; type: string }[];
}

const AutosuggestCategory: FC<AutosuggestCategoryProps> = ({
  categoryData,
  getItemProps,
  highlightedIndex,
  textAndMaterialDataLength,
  autosuggestCategoryList
}) => {
  const t = useText();
  return (
    <li>
      <ul>
        {/* eslint-disable react/jsx-props-no-spreading */}
        {/* The downshift combobox works this way by design (line 43) */}
        {categoryData.map((item, incorrectIndex) => {
          // incorrectIndex because in the whole of autosuggest dropdown it is
          // not the correct index for the item. We first need to add the length of
          // items from autosuggest string suggestion to it for it to be accurate (=> index)
          const index = incorrectIndex + textAndMaterialDataLength;
          return (
            <li
              className={`autosuggest__text text-body-medium-regular px-24 ${clsx(
                {
                  "autosuggest__text--highlight": highlightedIndex === index
                }
              )}`}
              key={item}
              {...getItemProps({ item, index })}
            >
              {`${item.term} ${t("inText")}`}
              <div className="boxed-text text-tags noselect ml-8">
                {autosuggestCategoryList[incorrectIndex].render}
              </div>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default AutosuggestCategory;
