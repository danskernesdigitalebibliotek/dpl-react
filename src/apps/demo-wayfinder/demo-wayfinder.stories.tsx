import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import DemoWayfinder, { DemoWayfinderLinkProps } from "./demo-wayfinder.entry";
import globalTextArgs from "../../core/storybook/globalTextArgs";

const meta: Meta<typeof DemoWayfinder> = {
  title: "Apps / Demo wayfinder",
  component: DemoWayfinder,
  argTypes: {
    ...globalTextArgs
  }
} as Meta<typeof DemoWayfinder>;

export default meta;

export const App: StoryFn<typeof DemoWayfinder> = (props: DemoWayfinderLinkProps) => {
  return <DemoWayfinder {...props} />;
};
