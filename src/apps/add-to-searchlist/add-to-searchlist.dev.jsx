import React from "react";
import AddToSearchlist from "./add-to-searchlist.entry";
import "./add-to-searchlist.scss";

export default {
  title: "Apps/Searchlist/Add"
};

const Template = args => <AddToSearchlist {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  followSearchesUrl: "https://stage.followsearches.dandigbib.org",
  searchQuery: "star wars",
  buttonText: "Tilføj til mine søgninger",
  labelText: "Søgetitel",
  defaultTitle: "",
  errorText: "Det gik galt",
  successText: "Tilføjet til dine gemte søgninger.",
  successLinkUrl: "/?path=/story/apps-searchlist--entry",
  successLinkText: "Se dine gemte søgnigner.",
  addButtonText: "Gem",
  helpText:
    "Gem en søgning her og giv den en titel så du nemt kan kende forskel på alle dine mange gemte søgninger.",
  loginUrl:
    "https://lollandbib.dk/adgangsplatformen/login?destination=search/ting/:query"
};
