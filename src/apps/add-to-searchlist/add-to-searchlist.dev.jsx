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
      searchQuery={text("Search query", "star wars")}
      buttonText={text("Button text", "Tilføj til mine søgninger")}
      labelText={text("Label text", "Søgetitel")}
      defaultTitle={text("Default title", "Star Wars søgning")}
      errorText={text("Error text", "Det gik galt")}
      successText={text("Success text", "Tilføjet")}
      addButtonText={text("Add button text", "Gem")}
      helpText={text(
        "Help text",
        "Gem en søgning her og giv den en title så du let kan finde den igen."
      )}
    />
  );
}
