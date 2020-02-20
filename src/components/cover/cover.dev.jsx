import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Cover from "./cover";

export default {
  title: "Atoms|Cover",
  decorators: [withKnobs]
};

export function Base() {
  return (
    <Cover
      status="retrieved"
      src={text(
        "Image url",
        "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg"
      )}
      alt={text("Alternative text", "Value")}
      className={text("Class name", "")}
      coverClassName={text("Cover image class name", "")}
    />
  );
}

export function Initial() {
  return (
    <Cover
      status="initial"
      alt={text("Alternative text", "Loading...")}
      coverClassName={text("Cover image class name", "")}
    />
  );
}
