import React from "react";
import OrderMaterial from "./order-material.entry";

export default {
  title: "Apps/Order material"
};

const Template = args => <OrderMaterial {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  text: "Bestil materiale",
  errorText: "Der opstod en fejl",
  checkingText: "Undersøger mulighed for fjernlån",
  progressText: "Bestiller materiale",
  unavailableText: "Kan ikke fjernlånes",
  invalidPickupBranchText: "Dit afhentningsbibliotek modtager ikke fjernlån",
  successText: "Bestilt",
  successMessage:
    "Materialet er bestilt, dit bibliotek vil give besked når det er klar til afhentning.",
  ids: "870970-basis:47092183,870970-basis:51980190,870970-basis:23154382",
  loginUrl:
    "https://lollandbib.dk/adgangsplatformen/login?destination=ting/object/:id",
  pickupBranch: "790900",
  expires: "2021-06-24"
};
