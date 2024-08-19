import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import ErrorBoundaryAlertBody, {
  ErrorBoundaryAlertBodyProps
} from "./ErrorBoundaryAlertBody";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";

export default {
  title: "Components / Error Boundary Alert",
  component: ErrorBoundaryAlertBody,
  argTypes: {
    ...globalTextArgs,
    ...globalConfigArgs,
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
  }
} as Meta<typeof ErrorBoundaryAlertBody>;

const WrappedErrorBoundaryAlertBody = withText(
  withConfig(ErrorBoundaryAlertBody)
);
export const ErrorBoundaryAlert: StoryFn<typeof ErrorBoundaryAlertBody> = (
  args: ErrorBoundaryAlertBodyProps
) => (
  <WrappedErrorBoundaryAlertBody
    {...args}
    resetErrorBoundary={() => {
      // We just want to confirm that the click handler works and show it in storybook.
      // eslint-disable-next-line no-alert
      alert("Close button clicked!");
    }}
  />
);
