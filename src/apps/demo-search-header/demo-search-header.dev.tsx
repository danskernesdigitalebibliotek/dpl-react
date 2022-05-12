import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import { setToken, TOKEN_LIBRARY_KEY } from "../../core/token";
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
