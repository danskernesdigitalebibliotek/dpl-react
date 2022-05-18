import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import DemoSearchHeader, {
  DemoSearchHeaderEntryProps
} from "./demo-search-header.entry";

export default {
  title: "Demo Search Header",
  component: DemoSearchHeader,
  argTypes: {
    searchUrl: {
      defaultValue: "/soeg",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof DemoSearchHeader>;

export const SearchHeader: ComponentStory<typeof DemoSearchHeader> = (
  args: DemoSearchHeaderEntryProps
) => <DemoSearchHeader {...args} />;
