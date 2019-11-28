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
      text={text("Text", "Add to followed searches")}
      label={text("Label", "Name")}
      defaultTitle={text("Default title", "Harry Potter")}
      searchQuery={text("Search query", "harry potter")}
      addButtonLabel={text("Add button label", "Add")}
      helpText={text("Help text", "Give your search a name.")}
    />
  );
}
