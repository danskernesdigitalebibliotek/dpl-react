import React from "react";
import { withKnobs, text, array } from "@storybook/addon-knobs";
import SimpleMaterial from "./simple-material";

export default {
  title: "Components|Simple Material",
  decorators: [withKnobs]
};

export function Base() {
  return (
    <SimpleMaterial
      item={{
        coverUrl: text(
          "Cover",
          "https://bibliotek.kk.dk/sites/koebenhavn.ddbcms.dk/files/styles/ding_primary_large/public/ting/covers/ODcwOTcwLWJhc2lzOjUyODM2OTEz.jpg?itok=CGCNIio-"
        ),
        creators: array("Creators", ["Pablo Hidalgo"]),
        pid: text("pid", "870970-basis:52836913"),
        title: text(
          "Title",
          "Star wars - Rogue One : ultimativ illustreret guide"
        ),
        type: text("Type", "Bog"),
        year: text("Year", "2016")
      }}
      ofText={text("ofText", "Af")}
    />
  );
}
