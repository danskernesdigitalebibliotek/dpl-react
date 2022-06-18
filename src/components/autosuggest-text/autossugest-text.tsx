import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";

export interface AutosuggestTextProps {
  responseData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  currentQ: string | undefined;
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
}

interface SuggestionCreator {
  __typename: "Creator";
  name: string;
}
interface SuggestonSubject {
  __typename: "Subject";
  value: string;
}
interface SuggestionWork {
  __typename: "Work";
  title?: string | null;
}
export type Suggestion = SuggestionCreator | SuggestonSubject | SuggestionWork;

export const AutosuggestText: React.FC<AutosuggestTextProps> = ({
  responseData,
  highlightedIndex,
  getItemProps,
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic"
}) => {
  function itemToString(objectItem: Suggestion) {
    switch (objectItem.__typename) {
      case "Creator":
        return objectItem.name;
      case "Subject":
        return objectItem.value;
      default:
        return objectItem.title;
    }
  }

  function generateItemId(objectItem: Suggestion) {
    return `${objectItem.__typename}-${itemToString(objectItem)}`;
  }

  return (
    <>
      {responseData.map((item, index) => {
        return (
          <>
            {/* eslint-disable react/jsx-props-no-spreading */}
            {/* The downshift combobox works this way by design */}
            <li
              className={`autosuggest__item--text text-body-medium-regular px-24 ${
                highlightedIndex === index
                  ? "autosuggest__item--text--highlight"
                  : ""
              }`}
              key={generateItemId(item)}
              {...getItemProps({ item, index })}
            >
              {/* eslint-enable react/jsx-props-no-spreading */}
              {item.__typename === "Creator"
                ? `${item.name} (${stringSuggestionAuthorText})`
                : null}
              {item.__typename === "Subject"
                ? `${item.value} (${stringSuggestionTopicText})`
                : null}
              {item.__typename === "Work"
                ? `${item.title} (${stringSuggestionWorkText})`
                : null}
            </li>
          </>
        );
      })}
    </>
  );
};

export default AutosuggestText;
