import React from "react";
import List from "./list";

export default { title: "Atoms/Unordered list" };

export function WithItems() {
  return (
    <List>
      <li>Agurk</li>
    </List>
  );
}
