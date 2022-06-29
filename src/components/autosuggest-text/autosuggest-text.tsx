import clsx from "clsx";
import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import AutosuggestTextItem, { Suggestion } from "./autosuggest-text-item";

export interface AutosuggestTextProps {
  responseData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  currentQ: string | undefined;
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
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
  responseData,
  highlightedIndex,
  getItemProps,
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic"
}) => {
  return (
    <>
      {responseData.map((item, index) => {
        const classes = {
          textSuggestion: `autosuggest__item--text text-body-medium-regular px-24 ${clsx(
            {
              "autosuggest__item--text--highlight": highlightedIndex === index
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
            stringSuggestionAuthorText={stringSuggestionAuthorText}
            stringSuggestionWorkText={stringSuggestionWorkText}
            stringSuggestionTopicText={stringSuggestionTopicText}
          />
        );
      })}
    </>
  );
};

export default AutosuggestText;
