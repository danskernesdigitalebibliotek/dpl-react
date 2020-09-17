import React from "react";
import Searchlist from "./searchlist.entry";
import "./searchlist.scss";

export default { title: "Apps/Searchlist" };

const Template = args => <Searchlist {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  followSearchesUrl: "https://stage.followsearches.dandigbib.org",
  searchUrl: "https://lollandbib.dk/search/ting/:query"
};
