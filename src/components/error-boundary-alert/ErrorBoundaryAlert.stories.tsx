import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ErrorBoundaryAlertBody, {
  ErrorBoundaryAlertBodyProps
} from "./ErrorBoundaryAlertBody";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";

const meta: Meta<typeof ErrorBoundaryAlertBody> = {
  title: "Components / Error Boundary Alert",
  component: ErrorBoundaryAlertBody,
  argTypes: {
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    message: {
      name: "Error Message",
      defaultValue: "Something went wrong, try again later.",
      control: { type: "text" }
    },
    showCloseButton: {
      name: "Show Close Button",
      defaultValue: true,
      control: { type: "boolean" }
    }
  },
  args: {
    ...globalTextArgs,
    ...globalConfigArgs,
    message: "Something went wrong, try again later.",
    showCloseButton: true
  }
};

export default meta;

type Story = StoryObj<typeof ErrorBoundaryAlertBody>;

const WrappedErrorBoundaryAlertBody = withText(
  withConfig(ErrorBoundaryAlertBody)
);

export const Primary: Story = {
  render: (args: ErrorBoundaryAlertBodyProps) => (
    <WrappedErrorBoundaryAlertBody
      // TODO: Explicitly define prop types for better clarity
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
      resetErrorBoundary={() => {
        // We just want to confirm that the click handler works and show it in storybook.
        // eslint-disable-next-line no-alert
        alert("Close button clicked!");
      }}
    />
  )
};
