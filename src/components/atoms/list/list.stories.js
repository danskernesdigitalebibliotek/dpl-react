import React from "react";
import List from "./list.js";

export default { title: "Atoms|Unordered list" };

export function withItems() {
  return (
    <List>
      <li>Agurk</li>
    </List>
  );
}
