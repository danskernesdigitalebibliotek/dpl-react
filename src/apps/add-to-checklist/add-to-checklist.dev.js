import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import AddToChecklist from "./add-to-checklist.entry.js";
import "./add-to-checklist.scss";

export default {
  title: "Apps|Add to Checklist",
  decorators: [withKnobs]
};

export function entry() {
  return <AddToChecklist ddb-id={text("Material ID", "3A23607387")} />;
}
