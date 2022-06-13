import React from "react";
import { AutosuggestText } from "../autosuggest-text/autossugest-text";

export interface AutosuggestProps {
  q: string | undefined;
  data: any | undefined;
  isLoading: boolean;
  status: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  q = "query",
  data,
  isLoading,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic"
}) => {
  return (
    <>
      {/* console.log({ ...getMenuProps() }) */}
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <ul
        className="autosuggest-text-container"
        {...getMenuProps()}
        style={!isOpen ? { display: "none" } : {}}
      >
        {/* eslint-enable react/jsx-props-no-spreading */}

        {isLoading && <div>Loading</div>}

        {data && data.suggest.result.length < 1 && null}

        {data && status === "success" && isOpen && (
          <AutosuggestText
            responseData={data.suggest.result}
            currentQ={q}
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
            stringSuggestionAuthorText={stringSuggestionAuthorText}
            stringSuggestionWorkText={stringSuggestionWorkText}
            stringSuggestionTopicText={stringSuggestionTopicText}
          />
        )}
      </ul>
    </>
  );
};
