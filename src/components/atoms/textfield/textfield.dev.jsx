import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import TextField from "./textfield";

export default {
  title: "Atoms|TextField",
  decorators: [withKnobs]
};

export function WithText() {
  return (
    <TextField
      label={text("Field label", "Some label")}
      value={text("Default value", "Value")}
    />
  );
}
