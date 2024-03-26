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
    title: {
      defaultValue: "Åbningstider",
      control: { type: "text" }
    },
    branchId: {
      defaultValue: 1,
      control: { type: "number" }
    },
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
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
