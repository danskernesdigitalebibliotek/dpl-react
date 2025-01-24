import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionTypeEnum } from "../../core/dbc-gateway/generated/graphql";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestTextItem from "./autosuggest-text-item";

export interface AutosuggestTextProps {
  textData: Suggestions;
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
}

export function itemToString(objectItem: Suggestion) {
  switch (objectItem.type) {
    case SuggestionTypeEnum.Composit:
      return objectItem.work?.titles.main[0] || "incomplete data";
    default:
      return objectItem.term;
  }
}

export function generateItemId(objectItem: Suggestion) {
  const id = `${objectItem.__typename}-${itemToString(
    objectItem
  )}-${Math.random().toString(36)}`;
  return id.replace(/\s+/g, "-");
}

export const AutosuggestText: React.FC<AutosuggestTextProps> = ({
  textData,
  highlightedIndex,
  getItemProps
}) => {
  return (
    <>
      {textData.map((item: Suggestion, index: number) => {
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
            generateItemId={generateItemId}
            getItemProps={getItemProps}
          />
        );
      })}
    </>
  );
};

export default AutosuggestText;
