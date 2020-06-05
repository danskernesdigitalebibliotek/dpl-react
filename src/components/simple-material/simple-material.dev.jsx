import React from "react";
import { withKnobs, text, array } from "@storybook/addon-knobs";
import SimpleMaterial from "./simple-material";

export default {
  title: "Components/Simple Material",
  decorators: [withKnobs]
};

export function Base() {
  return (
    <SimpleMaterial
      item={{
        creators: array("Creators", ["Pablo Hidalgo"]),
        pid: text("pid", "870970-basis:52836913"),
        title: text(
          "Title",
          "Star wars - Rogue One : ultimativ illustreret guide"
        ),
        type: text("Type", "Bog"),
        year: text("Year", "2016")
      }}
      coverSize={text("Cover size", "small")}
      ofText={text("ofText", "Af")}
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
        "https://cover.dandigbib.org/api/v2"
      )}
    />
  );
}
