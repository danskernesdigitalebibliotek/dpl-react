import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import TextField from "./textfield";

export default {
  title: "Atoms|TextField",
  decorators: [withKnobs]
};

export function Base() {
  return (
    <TextField
      label={text("Field label", "Some label")}
      defaultValue={text("Default value", "Value")}
    />
  );
}

export function Error() {
  return (
    <TextField
      label={text("Field label", "Some label")}
      defaultValue={text("Default value", "Value")}
      error={text("Error", "Something is wrong")}
    />
  );
}
