import React from "react";
import ChecklistMaterialButton from "./checklist-material-button.entry";

export default {
  title: "Apps/Checklist/Material button"
};

const Template = args => <ChecklistMaterialButton {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  materialListUrl: "http://localhost:8000",
  addText: "Tilføj til din huskeliste",
  addErrorText: "Der opstod en fejl",
  addSuccessText: "Tilføjet",
  removeText: "Fjern fra din huskeliste",
  removeErrorText: "Der opstod en fejl",
  removeSuccessText: "Fjernet",
  id: "870970-basis:54172613",
  loginUrl:
    "https://lollandbib.dk/adgangsplatformen/login?destination=ting/object/:id",
  initialOnList: "unknown"
};
