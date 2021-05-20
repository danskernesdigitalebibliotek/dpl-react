import React from "react";
import Checklist from "./checklist.entry";
import "./checklist.scss";

export default {
  title: "Apps/Checklist/List"
};

const Template = args => <Checklist {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  materialUrl: "https://lollandbib.dk/ting/object/:pid",
  authorUrl: 'https://lollandbib.dk/search/ting/phrase.creator=":author"',
  coverServiceUrl: "https://cover.dandigbib.org/api/v2",
  removeButtonText: "Fjern fra listen",
  emptyListText: "Ingen materialer på listen",
  errorText: "Et eller andet gik galt."
};
