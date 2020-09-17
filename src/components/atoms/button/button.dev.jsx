import React from "react";
import Button from "./button";

export default {
  title: "Atoms/Button"
};

const Template = args => <Button {...args}>{args.children}</Button>;

export const Base = Template.bind({});
Base.args = {
  children: "Label",
  align: "center"
};
Base.argTypes = {
  align: {
    control: {
      type: "inline-radio",
      options: ["left", "center", "right"]
    }
  }
};

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

LeftAligned.parameters = {
  controls: { hideNoControlsWarning: true }
};

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

CenterAligned.parameters = {
  controls: { hideNoControlsWarning: true }
};
