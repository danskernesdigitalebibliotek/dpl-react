import type { Meta, StoryObj } from "@storybook/react-webpack5";
import * as React from "react";
import SearchBar, { SearchBarProps } from "./search-bar";
import StorySearchBar from "./search-bar.dev.inc";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof SearchBar> = {
  title: "Components / Search Bar",
  component: SearchBar,
  argTypes: {
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    altText: {
      description: "Alt text for search button image",
      control: { type: "text" }
    },
    inputPlaceholderText: {
      description: "Input field placeholder",
      control: { type: "text" }
    },
    searchHeaderIconAltText: {
      control: { type: "text" }
    },
    searchNoValidCharactersErrorText: {
      control: { type: "text" }
    },
    searchHeaderDropdownText: {
      control: { type: "text" }
    },
    searchHeaderInputLabelText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {
  args: {
    ...globalTextArgs,
    ...globalConfigArgs,
    altText: "søgeikon",
    inputPlaceholderText: "Søg blandt bibliotekets materialer",
    searchHeaderIconAltText: "søgeikon",
    searchNoValidCharactersErrorText: "Søgefeltet indeholder ikke gyldige tegn",
    searchHeaderDropdownText: "Søg i",
    searchHeaderInputLabelText: "Søg"
  },
  render: (args: SearchBarProps) => {
    return <StorySearchBar storybookArgs={args} />;
  }
};
