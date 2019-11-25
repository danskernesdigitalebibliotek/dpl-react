import React from "react";
import TextField from "./textfield.js";

export default { title: "Atoms|TextField" };

export function withText() {
  return <TextField label="Some label" placeholder="Value" />;
}
