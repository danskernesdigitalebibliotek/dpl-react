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
      progressText={text("Progress text", "Bestiller materiale")}
      unavailableText={text("Unavaliable text", "Kan ikke fjernlånes")}
      invalidPickupBranchText={text(
        "Invalid pickup branch text",
        "Dit afhentningsbibliotek modtager ikke fjernlån"
      )}
      successText={text("Success text", "Bestilt")}
      successMessage={text(
        "Success message",
        "Materialet er bestilt, dit bibliotek vil give besked når det er klar til afhentning."
      )}
      // Prefer text instead of array knob here to simulate a naive mount using
      // data attributes (text) as props.
      ids={text(
        "Material IDs (separate by ,)",
        [
          "870970-basis:47092183",
          "870970-basis:51980190",
          "870970-basis:23154382"
        ].join(",")
      )}
      loginUrl={text(
        "Login URL",
        "https://lollandbib.dk/adgangsplatformen/login?destination=ting/object/:id"
      )}
      pickupBranch={text("Pickup branch", "790900")}
      expires={text("Order expiry date", "2021-06-24")}
    />
  );
}
