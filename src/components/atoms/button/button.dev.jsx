import React from "react";
import Button from "./button";

export default { title: "Atoms|Button" };

export function LeftAligned() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button align="left">Grey</Button>
      <Button align="left" variant="black">
        Black
      </Button>
      <Button align="left" variant="secondary">
        Secondary
      </Button>
      <Button align="left" variant="charcoal">
        Charcoal
      </Button>
    </div>
  );
}

export function CenterAligned() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button>Grey</Button>
      <Button variant="black">Black</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="charcoal">Charcoal</Button>
    </div>
  );
}
