import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { useText } from "../../core/utils/text";

export interface AutosuggestTextItemProps {
  classes: {
    textSuggestion: string;
  };
  item: Suggestion;
  index: number;
  generateItemId: (objectItem: Suggestion) => string;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
}

export interface SuggestionCreator {
  __typename: "Creator";
  name: string;
}
export interface SuggestionSubject {
  __typename: "Subject";
  value: string;
}
export interface SuggestionWork {
  __typename: "Work";
  title?: string | null | undefined;
  fullTitle?: string | null | undefined;
  creators: {
    __typename?: "Creator" | undefined;
    name: string;
  }[];
  manifestations: {
    pid: string;
  }[];
}
export type Suggestion = SuggestionCreator | SuggestionSubject | SuggestionWork;

const AutosuggestTextItem: React.FC<AutosuggestTextItemProps> = ({
  classes,
  item,
  index,
  generateItemId,
  getItemProps
}) => {
  const t = useText();
  console.log(getItemProps({ item, index }));
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
          ? `${item.name} (${t("stringSuggestionAuthorText")})`
          : null}
        {item.__typename === "Subject"
          ? `${item.value} (${t("stringSuggestionTopicText")})`
          : null}
        {item.__typename === "Work"
          ? `${item.title} (${t("stringSuggestionWorkText")})`
          : null}
      </li>
    </>
  );
};

export default AutosuggestTextItem;
