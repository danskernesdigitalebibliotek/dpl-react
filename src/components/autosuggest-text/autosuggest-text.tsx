import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestTextItem from "./autosuggest-text-item";

export interface AutosuggestTextProps {
  textData: Suggestions;
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
}

export const AutosuggestText: React.FC<AutosuggestTextProps> = ({
  textData,
  highlightedIndex,
  getItemProps
}) => {
  return textData.map((item: Suggestion, index: number) => {
    const classes = {
      textSuggestion: clsx(
        "autosuggest__text-item text-body-medium-regular px-24",
        {
          "autosuggest__text-item--highlight": highlightedIndex === index
        }
      )
    };
    return (
      <AutosuggestTextItem
        key={index}
        classes={classes}
        item={item}
        index={index}
        getItemProps={getItemProps}
      />
    );
  });
};

export default AutosuggestText;
