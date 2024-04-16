import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHours, { OpeningHoursEntryProps } from "./OpeningHours.entry";

export default {
  title: "Apps / Opening Hours",
  component: OpeningHours,
  argTypes: {
    initialDate: {
      defaultValue: new Date("2024-03-21"),
      control: { type: "date" }
    },
    branchId: {
      defaultValue: 1,
      control: { type: "number" }
    },
    showOpeningHoursForWeekText: {
      defaultValue: "Show opening hours for week",
      control: { type: "text" }
    },
    weekText: {
      defaultValue: "Week",
      control: { type: "text" }
    },
    libraryIsClosedText: {
      defaultValue: "The library is closed this day",
      control: { type: "text" }
    },
    openingHoursHeadingText: {
      defaultValue: "Opening hours",
      control: { type: "text" }
    },
    ...globalConfigArgs,
    ...globalTextArgs,
    ...serviceUrlArgs
  }
} as ComponentMeta<typeof OpeningHours>;

export const Default: ComponentStory<typeof OpeningHours> = (
  args: OpeningHoursEntryProps & GlobalEntryTextProps
) => <OpeningHours {...args} />;

export const materialWithoutType = Default.bind({});
