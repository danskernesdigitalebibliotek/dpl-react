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
      defaultTitle={text("Default title", "")}
      errorText={text("Error text", "Det gik galt")}
      successText={text("Success text", "Tilføjet til dine gemte søgninger.")}
      successLink={text("Success link", "/?path=/story/apps-searchlist--entry")}
      successLinkText={text("Success link text", "Se dine gemte søgnigner.")}
      addButtonText={text("Add button text", "Gem")}
      helpText={text(
        "Help text",
        "Gem en søgning her og giv den en titel så du nemt kan kende forskel på alle dine mange gemte søgninger."
      )}
      loginUrl={text(
        "Login URL",
        "https://www.aakb.dk/ding-list/login-attach/search_query/:query"
      )}
    />
  );
}
