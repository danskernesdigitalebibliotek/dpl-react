import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import LoanList, { LoanListEntryProps } from "./loan-list.entry";

export default {
  title: "Apps / Loan list",
  component: LoanList,
  parameters: {
    query: {
      modal: "2022-07-14"
    }
  },
  argTypes: {},
  decorators: [withQuery]
} as ComponentMeta<typeof LoanList>;

export const LoanListEntry: ComponentStory<typeof LoanList> = (
  args: LoanListEntryProps
) => <LoanList {...args} />;
