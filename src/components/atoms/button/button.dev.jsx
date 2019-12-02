import React from "react";
import Button from "./button";

export default { title: "Atoms|Button" };

export function WithText() {
  return (
    <>
      <Button>Grey</Button>
      <Button variant="black">Black</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="charcoal">Charcoal</Button>
    </>
  );
}
