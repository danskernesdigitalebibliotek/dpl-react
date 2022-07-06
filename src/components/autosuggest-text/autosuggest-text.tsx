import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import AutosuggestTextItem, { Suggestion } from "./autosuggest-text-item";

export interface AutosuggestTextProps {
  textData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
}

export function itemToString(objectItem: Suggestion) {
  switch (objectItem.__typename) {
    case "Creator":
      return objectItem.name;
    case "Subject":
      return objectItem.value;
    default:
      return objectItem.title;
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
        {textData.map((item, index) => {
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
