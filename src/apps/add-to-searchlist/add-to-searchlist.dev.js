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
      text={text("Button text", "Add search")}
      label={text("Field title", "Search title")}
      default-title={text("Default title", "Harry Potter")}
      search-query={text("Search query", "harry potter")}
      add-button-label={text("Add button label", "Add")}
    />
  );
}
