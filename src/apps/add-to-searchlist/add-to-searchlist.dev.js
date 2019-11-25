import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import AddToSearchlist from "./add-to-searchlist.entry.js";

export default {
  title: "Apps|Add to Searchlist",
  decorators: [withKnobs]
};

export function entry() {
  return (
    <AddToSearchlist
      ddb-text={text("Button text", "Add search")}
      ddb-label={text("Field title", "Search title")}
      ddb-default-title={text("Default title", "Harry Potter")}
      ddb-search-query={text("Search query", "harry potter")}
      ddb-add-button-label={text("Add button label", "Add")}
    />
  );
}
