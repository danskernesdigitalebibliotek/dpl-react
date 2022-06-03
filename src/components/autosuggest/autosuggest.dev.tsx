import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Autosuggest, AutosuggestProps } from "./autosuggest";

export default {
  title: "Components / Autosuggest",
  component: Autosuggest,
  argTypes: {
    q: {
      name: "Query",
      defaultValue: "Adam",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof Autosuggest>;

export const Default: ComponentStory<typeof Autosuggest> = (
  args: AutosuggestProps
) => {
  return (
    // The markup below is used to give the autosuggest contextual elements
    // that its design depends on (so that the story looks presentable).
    // The markup is styled inline, but also using some of the dpl-design-system
    // npm package classes to minimize the amount of code we add here, as the
    // search bar component also depends on its parents and siblings.
    // If you find out that it no longer represents reality, feel free to adjust
    // the markup.
    <div
      style={{
        position: "relative",
        width: "90%",
        height: "71px",
        margin: "20px 20px 0 20px",
        backgroundColor: "#F6F5F0",
        outline: "solid 1px #DBDBDB"
      }}
    >
      <input
        type="text"
        style={{ width: "100%" }}
        placeholder="I am here just for context."
        className="header__menu-search-input text-body-medium-regular"
      />
      <Autosuggest {...args} />
    </div>
  );
};
