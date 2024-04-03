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
    openingHoursEditorCategoriesConfig: {
      name: "Opening hours categories",
      defaultValue:
        '[{"title":"\\u00c5bent","color":"#B3DC6C"},{"title":"Telefontid","color":"#FBE983"}]',
      control: { type: "text" }
    },
    openingHoursBranchIdConfig: {
      name: "Opening hours branch id",
      defaultValue: "12",
      control: { type: "text" }
    },
    useWireMockStartDate: {
      name: "Starting date for wiremock purposes",
      defaultValue: true,
      control: { type: "boolean" }
    }
  }
} as ComponentMeta<typeof OpeningHoursEditor>;

export const App: ComponentStory<typeof OpeningHoursEditor> = (args) => (
  <OpeningHoursEditor {...args} />
);
