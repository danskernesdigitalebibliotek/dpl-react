import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Checklist from "./checklist.entry";
import "./checklist.scss";

export default {
  title: "Apps|Checklist",
  decorators: [withKnobs({ escapeHTML: false })]
};

export function Entry() {
  return (
    <Checklist
      materialListUrl={text(
        "MaterialList URL",
        "https://test.materiallist.dandigbib.org"
      )}
      materialUrl={text(
        "Material URL",
        "https://lollandbib.dk/ting/object/:pid"
      )}
      authorUrl={text(
        "Author URL",
        'https://lollandbib.dk/search/ting/phrase.creator=":author"'
      )}
      coverServiceUrl={text(
        "Cover Service URL",
        "https://cover.dandigbib.org/api"
      )}
      removeButtonText={text("Remove button text", "Fjern fra listen")}
      emptyListText={text("Empty list text", "Ingen materialer på listen")}
      errorText={text("Error text", "Et eller andet gik galt.")}
    />
  );
}
