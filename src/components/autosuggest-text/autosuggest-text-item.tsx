import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionType } from "../../core/dbc-gateway/generated/graphql";
import { Suggestion } from "../../core/utils/types/autosuggest";

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

        {item.type === SuggestionType.Creator
          ? `${item.term} (${stringSuggestionAuthorText})`
          : null}
        {item.type === SuggestionType.Subject
          ? `${item.term} (${stringSuggestionTopicText})`
          : null}
        {item.type === SuggestionType.Composit
          ? `${item?.work?.titles?.main} (${stringSuggestionWorkText})`
          : null}
      </li>
    </>
  );
};

export default AutosuggestTextItem;
