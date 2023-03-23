import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import Disclosure from "./disclosure";
import DisclosureSummary from "./DisclosureSummary";

// The configuration below addresses the different variables,
// their default values, and how they translate into storybook
// controls.
export default {
  title: "Components/Disclosure",
  component: Disclosure,
  argTypes: {},
  args: {}
} as ComponentMeta<typeof Disclosure>;

const Template: ComponentStory<typeof Disclosure> = () => {
  return (
    <Disclosure
      summary={
        <DisclosureSummary
          title="Some disclosure title"
          mainIconPath={Receipt}
        />
      }
    >
      <>
        <p>Some text</p>
        <p>Some other text</p>
      </>
    </Disclosure>
  );
};

export const Item = Template.bind({});
