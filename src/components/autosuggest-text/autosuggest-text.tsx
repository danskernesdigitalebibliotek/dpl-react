import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionType } from "../../core/dbc-gateway/generated/graphql";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestTextItem from "./autosuggest-text-item";

export interface AutosuggestTextProps {
  textData: Suggestions;
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
}

export function itemToString(objectItem: Suggestion) {
  switch (objectItem.type) {
    case SuggestionType.Composit:
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
    <li>
      <ul>
        {textData.map((item: Suggestion, index: number) => {
          const classes = {
            textSuggestion: `autosuggest__text text-body-medium-regular px-24 ${clsx(
              {
                "autosuggest__text--highlight": highlightedIndex === index
              }
            )}`
          };
          return (
            <AutosuggestTextItem
              classes={classes}
              item={item}
              index={index}
              generateItemId={generateItemId}
              getItemProps={getItemProps}
            />
          );
        })}
      </ul>
    </li>
  );
};

export default AutosuggestText;
