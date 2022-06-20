import { UseComboboxPropGetters } from "downshift";
import React from "react";

export interface AutosuggestTextItemProps {
  classes: {
    textSuggestion: string;
  };
  item: Suggestion;
  index: number;
  generateItemId: (objectItem: Suggestion) => string;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
}

export interface SuggestionCreator {
  __typename: "Creator";
  name: string;
}
export interface SuggestonSubject {
  __typename: "Subject";
  value: string;
}
export interface SuggestionWork {
  __typename: "Work";
  id: string;
  title?: string | null | undefined;
  fullTitle?: string | null | undefined;
  creators: {
    __typename?: "Creator" | undefined;
    name: string;
  }[];
}
export type Suggestion = SuggestionCreator | SuggestonSubject | SuggestionWork;

const AutosuggestTextItem: React.FC<AutosuggestTextItemProps> = ({
  classes,
  item,
  index,
  generateItemId,
  getItemProps,
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic"
}) => {
  return (
    <>
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <li
        className={classes.textSuggestion}
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
};

export default AutosuggestTextItem;
