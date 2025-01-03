import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { useText } from "../../core/utils/text";
import { SuggestionTypeEnum } from "../../core/dbc-gateway/generated/graphql";
import { Suggestion } from "../../core/utils/types/autosuggest";
import { getManifestationLanguageIsoCode } from "../../apps/material/helper";

export interface AutosuggestTextItemProps {
  classes: {
    textSuggestion: string;
  };
  item: Suggestion;
  index: number;
  generateItemId: (objectItem: Suggestion) => string;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  dataCy?: string;
}

const AutosuggestTextItem: React.FC<AutosuggestTextItemProps> = ({
  classes,
  item,
  index,
  generateItemId,
  getItemProps,
  dataCy = "autosuggest-text-item"
}) => {
  const isoLang =
    item.work?.manifestations.bestRepresentation &&
    getManifestationLanguageIsoCode([
      item.work.manifestations.bestRepresentation
    ]);

  const t = useText();
  return (
    <>
      {}
      {/* The downshift combobox works this way by design */}
      <li
        className={classes.textSuggestion}
        key={generateItemId(item)}
        {...getItemProps({ item, index })}
        data-cy={dataCy}
        lang={isoLang}
      >
        <p className="autosuggest__text text-body-medium-regular">
          {}
          {item.type === SuggestionTypeEnum.Creator
            ? `${item.term} (${t("stringSuggestionAuthorText")})`
            : null}
          {item.type === SuggestionTypeEnum.Subject
            ? `${item.term} (${t("stringSuggestionTopicText")})`
            : null}
          {item.type === SuggestionTypeEnum.Composit
            ? `${item.work?.titles.main} (${t("stringSuggestionWorkText")})`
            : null}
          {item.type === SuggestionTypeEnum.Title
            ? `${item.term} (${t("stringSuggestionWorkText")})`
            : null}
        </p>
      </li>
    </>
  );
};

export default AutosuggestTextItem;
