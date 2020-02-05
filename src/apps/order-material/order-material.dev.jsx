import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import OrderMaterial from "./order-material.entry";

export default {
  title: "Apps|Order material",
  decorators: [withKnobs]
};

export function Entry() {
  return (
    <OrderMaterial
      text={text("Text", "Bestil materiale")}
      errorText={text("Error text", "Der opstod en fejl")}
      checkingText={text("Checking text", "Undersøger mulighed for fjernlån")}
      unavailableText={text("Unavaliable text", "Kan ikke fjernlånes")}
      invalidPickupBranchText={text(
        "Invalid pickup branch text",
        "Dit afhentningsbibliotek modtager ikke fjernlån"
      )}
      successText={text("Success text", "Bestilt")}
      id={text("Material ID", "870970-basis:54172613")}
      loginUrl={text(
        "Login URL",
        "https://lollandbib.dk/adgangsplatformen/login?destination=ting/object/:id"
      )}
      pickupBranch={text("Pickup branch", "722300")}
      expires={text("Order expiry date", "2019-06-24T00:00:00.000Z")}
    />
  );
}
