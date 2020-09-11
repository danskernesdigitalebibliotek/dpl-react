import React from "react";
import ListItem from "./list-item";

export default {
  title: "Components/List Item"
};

export function Base() {
  return (
    <ul>
      <ListItem aside={<p>aside</p>}>
        <h2>children</h2>
      </ListItem>
      <ListItem aside={<p>aside</p>}>
        <h2>children</h2>
      </ListItem>
      <ListItem aside={<p>aside</p>}>
        <h2>children</h2>
      </ListItem>
    </ul>
  );
}
