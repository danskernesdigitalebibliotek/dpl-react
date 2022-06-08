import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import { AutosuggestText } from "../autosuggest-text/autossugest-text";

export interface AutosuggestProps {
  q: string;
  data: SuggestionsFromQueryStringQuery | undefined;
  isLoading: boolean;
  status: string;
  // TODO: find out what type this can be from downshifts official types
  getMenuProps: any;
  highlightedIndex: any;
  getItemProps: any;
  isOpen: boolean;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  q = "query",
  data,
  isLoading,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen
}) => {
  // if (q.length < 3) {
  //   return (
  //     <ul className="autosuggest-text-container" style={{ display: "none" }} />
  //   );
  // }

  // if (isLoading) {
  //   return <ul className="autosuggest-text-container">Loading</ul>;
  // }

  // // if the service cannot find any suggestions
  // if (data && data.suggest.result.length < 1) {
  //   return <ul className="autosuggest-text-container">Ingen suggestions</ul>;
  // }
  console.log(data);
  if (data && status === "success") {
    return (
      <>
        {/* eslint-disable react/jsx-props-no-spreading */}
        {/* The downshift combobox works this way by design */}
        <ul className="autosuggest-text-container" {...getMenuProps()}>
          {/* eslint-enable react/jsx-props-no-spreading */}
          {isOpen && isLoading ? (
            <li>...Loading</li>
          ) : (
            isOpen && (
              <AutosuggestText
                responseData={data.suggest.result}
                currentQ={q}
                highlightedIndex={highlightedIndex}
                getItemProps={getItemProps}
              />
            )
          )}
        </ul>
      </>
    );
  }

  return null;
};
