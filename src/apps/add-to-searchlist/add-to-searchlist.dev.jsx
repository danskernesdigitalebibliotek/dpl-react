import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import AddToSearchlist from "./add-to-searchlist.entry";
import "./add-to-searchlist.scss";

export default {
  title: "Apps|Add to Searchlist",
  decorators: [withKnobs]
};

export function Entry() {
  return (
    <AddToSearchlist
      text={text("Text", "Add search")}
      label={text("Label", "Search")}
      defaultValue={text("Default search value", "Harry Potter")}
      searchQuery={text("Search query", "harry potter")}
      addButtonLabel={text("Add button label", "Add")}
      helpText={text("Help text", "Type your search query here.")}
    />
  );
}
