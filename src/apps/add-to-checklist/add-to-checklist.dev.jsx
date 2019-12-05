import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import AddToChecklist from "./add-to-checklist.entry";

export default {
  title: "Apps|Add to Checklist",
  decorators: [withKnobs]
};

export function Entry() {
  return (
    <AddToChecklist
      text={text("Text", "Tilføj til den bedste huskeliste")}
      errorText={text("Error text", "Der opstod en fejl")}
      successText={text("Success text", "Tilføjet")}
      id={text("Material ID", "870970-basis:54172613")}
    />
  );
}
