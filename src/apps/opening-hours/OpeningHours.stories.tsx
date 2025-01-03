import type { Meta, StoryObj } from "@storybook/react";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import OpeningHours from "./OpeningHours.entry";

const meta: Meta<typeof OpeningHours> = {
  title: "Apps / Opening Hours",
  component: OpeningHours,

  // @ts-ignore: can't figure out how to type globalConfigArgTypes, globalTextArgTypes and serviceUrlArgTypes
  argTypes: {
    ...globalConfigArgTypes,
    ...globalTextArgTypes,
    ...serviceUrlArgTypes,
    initialDate: {
      defaultValue: new Date("2024-03-25"),
      control: { type: "date" }
    },
    branchId: {
      defaultValue: 12,
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
    }
  }
};

export default meta;

type Story = StoryObj<typeof OpeningHours>;

export const Primary: Story = {
  args: {
    ...globalConfigArgs,
    ...globalTextArgs,
    ...serviceUrlArgs,
    initialDate: new Date("2024-03-25"),
    branchId: 12,
    showOpeningHoursForWeekText: "Show opening hours for week",
    weekText: "Week",
    libraryIsClosedText: "The library is closed this day",
    openingHoursHeadingText: "Opening hours"
  }
};

export const materialWithoutType: Story = {
  args: {
    ...Primary.args
  }
};
