import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import AdvancedSearchV2Entry from "./AdvancedSearchV2.entry";

const meta: Meta<typeof AdvancedSearchV2Entry> = {
  title: "Apps / Advanced Search V2",
  component: AdvancedSearchV2Entry,
  argTypes: {
    ...serviceUrlArgTypes
  }
};

export default meta;

type Story = StoryObj<typeof AdvancedSearchV2Entry>;

export const Default: Story = {
  args: {
    ...serviceUrlArgs
  }
};
