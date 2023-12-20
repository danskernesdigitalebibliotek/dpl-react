import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import SearchBar, { SearchBarProps } from "./search-bar";
import StorySearchBar from "./search-bar.dev.inc";
import globalTextArgs from "../../core/storybook/globalTextArgs";

export default {
  title: "Components / Search Bar",
  component: SearchBar,
  argTypes: {
    ...globalTextArgs,
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
} as ComponentMeta<typeof SearchBar>;

export const Default: ComponentStory<typeof SearchBar> = (
  args: SearchBarProps
) => {
  return <StorySearchBar storybookArgs={args} />;
};
