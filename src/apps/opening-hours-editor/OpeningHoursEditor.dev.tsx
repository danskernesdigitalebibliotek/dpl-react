import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursEditor from "./OpeningHoursEditor.entry";

export default {
  title: "Apps / OpeningHoursEditor",
  component: OpeningHoursEditor,
  argTypes: {
    ...serviceUrlArgs,
    openingHoursRemoveEventButtonText: {
      name: "Opening hours remove event button",
      defaultValue: "Remove event",
      control: { type: "text" }
    },
    openingHoursCategories: {
      name: "Opening hours categories",
      defaultValue: [
        {
          title: "Åbent",
          color: "blue"
        },
        {
          title: "Selvbetjening",
          color: "yellow"
        },
        {
          title: "Med betjening",
          color: "green"
        },
        {
          title: "Telefontid",
          color: "grey"
        },
        {
          title: "Borgerservice",
          color: "orange"
        },
        {
          title: "Børneetagen",
          color: "lightblue"
        },
        {
          title: "Makerlab",
          color: "purple"
        }
      ],
      control: { type: "object" }
    },
    openingHoursBranchId: {
      name: "Opening hours branch id",
      defaultValue: 1,
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof OpeningHoursEditor>;

export const App: ComponentStory<typeof OpeningHoursEditor> = (args) => (
  <OpeningHoursEditor {...args} />
);
