import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import {
  AvailabilityLabelProps,
  AvailabilityLabel
} from "./availability-label";

// The configuration below addresses the different variables,
// their default values, and how they translate into storybook
// controls.
export default {
  title: "Components/Availability Label",
  component: AvailabilityLabel,
  argTypes: {
    manifestText: {
      name: "Manifestation text",
      defaultValue: "Bog",
      control: { type: "text" }
    },
    availabilityText: {
      name: "Availability text",
      defaultValue: "Hjemme",
      control: { type: "text" }
    },
    state: {
      name: "State",
      description:
        "To change availaility, select from Storybook Availability Label components",
      defaultValue: "available",
      control: { type: null }
    },
    link: {
      name: "Link",
      defaultValue: "https://www.google.com",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof AvailabilityLabel>;

const Template: ComponentStory<typeof AvailabilityLabel> = (
  args: AvailabilityLabelProps
) => <AvailabilityLabel {...args} />;

export const Available = Template.bind({});

export const Selected = Template.bind({});
Selected.args = {
  manifestText: "lydbog (cd-mp3)",
  availabilityText: "udlånt",
  state: "selected",
  link: undefined
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  manifestText: "ebog",
  availabilityText: "online",
  state: "unavailable",
  link: undefined
};
