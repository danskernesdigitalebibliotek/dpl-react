import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import DemoWayfinder, { DemoWayfinderLinkProps } from "./demo-wayfinder.entry";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";
import "../../components/wayfinder/wayfinder.scss";

export default {
  title: "Apps / Demo wayfinder",
  component: DemoWayfinder,
  decorators: [withQuery],
  argTypes: {
    ...globalTextArgs
  }
} as ComponentMeta<typeof DemoWayfinder>;

export const App: ComponentStory<typeof DemoWayfinder> = (
  props: DemoWayfinderLinkProps & GlobalEntryTextProps
) => <DemoWayfinder {...props} />;
