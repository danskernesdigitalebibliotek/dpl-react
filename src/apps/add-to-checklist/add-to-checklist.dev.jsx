import React from "react";
import AddToChecklist from "./add-to-checklist.entry";

export default {
  title: "Apps/Add to Checklist"
};

const Template = args => <AddToChecklist {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  text: "Tilføj til din huskeliste",
  errorText: "Der opstod en fejl",
  successText: "Tilføjet",
  id: "870970-basis:54172613",
  loginUrl:
    "https://lollandbib.dk/adgangsplatformen/login?destination=ting/object/:id"
};
