import React from "react";
import { AutosuggestText } from "../autosuggest-text/autossugest-text";

export interface AutosuggestProps {
  q: string | undefined;
  data: any | undefined;
  isLoading: boolean;
  status: string;
  // TODO: find out what type this can be from downshifts official types
  getMenuProps: any;
  highlightedIndex: any;
  getItemProps: any;
  isOpen: any;
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
          />
        )}
      </ul>
    </>
  );
};
