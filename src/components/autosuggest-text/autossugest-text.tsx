import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";

export interface AutosuggestTextProps {
  responseData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  currentQ: string;
}

export const AutosuggestText: React.FC<AutosuggestTextProps> = ({
  responseData
}) => {
  return (
    <>
      {responseData.map((item) => {
        return (
          <li className="autosuggest-text-container__item text-body-medium-regular">
            {item.__typename === "Creator" ? `${item.name} (forfatter)` : null}
            {item.__typename === "Subject" ? `${item.value} (emne)` : null}
            {item.__typename === "Work"
              ? `${item.title} (manifestation)`
              : null}
          </li>
        );
      })}
    </>
  );
};

export default AutosuggestText;
