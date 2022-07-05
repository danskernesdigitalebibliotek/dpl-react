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
    },
    data: {
      name: "Data",
      defaultValue: {
        suggest: {
          result: [
            {
              __typename: "Creator",
              name: "Adam August"
            },
            {
              __typename: "Creator",
              name: "Douglas Adams"
            },
            {
              __typename: "Creator",
              name: "Adam Neutzsky-Wulff"
            },
            {
              __typename: "Creator",
              name: "Andrew Adamson"
            },
            {
              __typename: "Creator",
              name: "Adam Wallensten"
            }
          ]
        }
      },
      control: { type: "object" }
    },
    isLoading: {
      name: "Is Loading",
      defaultValue: false,
      control: { type: "boolean" }
    },
    status: {
      name: "Status of the transaction",
      defaultValue: "success",
      control: { type: "text" }
    },
    isOpen: {
      name: "Is dropdown open",
      defaultValue: true,
      control: { type: "boolean" }
    },
    getMenuProps: {
      control: { type: null }
    },
    getItemProps: {
      control: { type: null }
    },
    highlightedIndex: {
      control: { type: null }
    }
  }
} as ComponentMeta<typeof Autosuggest>;

export const Default: ComponentStory<typeof Autosuggest> = (
  args: AutosuggestProps
) => {
  // The constants below are given to the story in order for it to now throw
  // errors. Downshift dropdown menu and menu items require we pass these down
  const getMenuProps = () => {
    return null;
  };
  const getItemProps = () => {
    return null;
  };
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
      <Autosuggest
        {...args}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
      />
    </div>
  );
};
