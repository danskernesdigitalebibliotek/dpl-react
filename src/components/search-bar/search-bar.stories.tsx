import { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import SearchBar, { SearchBarProps } from "./search-bar";
import StorySearchBar from "./search-bar.stories.inc";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Components / Search Bar",
  component: SearchBar,
  argTypes: {
    ...globalTextArgs,
    ...globalConfigArgs,
    altText: {
      name: "Alt text for search button image",
      defaultValue: "søgeikon",
      control: { type: "text" }
    },
    inputPlaceholderText: {
      name: "Input field placeholder",
      defaultValue: "Søg blandt bibliotekets materialer",
      control: { type: "text" }
    }
  }
} as Meta<typeof SearchBar>;

export const Default: StoryFn<typeof SearchBar> = (args: SearchBarProps) => {
  return <StorySearchBar storybookArgs={args} />;
};
