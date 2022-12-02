import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { withConfig } from "../../core/utils/config";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import { serviceUrlKeys } from "../../core/utils/reduxMiddleware/extractServiceBaseUrls";
import { withUrls } from "../../core/utils/url";
import {
  AvailabilityLabelProps,
  AvailabilityLabel
} from "./availability-label";

// The configuration below addresses the different variables,
// their default values, and how they translate into storybook
// controls.
export default {
  title: "Components/Availability Label",
  component: AvailabilityLabel,
  argTypes: {
    ...serviceUrlArgs,
    faustIds: {
      name: "Faust Ids",
      control: { type: "array" }
    },
    manifestText: {
      name: "Manifestation text",
      control: { type: "text" }
    },

    url: {
      name: "Link",
      control: { type: "text" }
    },
    selected: {
      name: "selected",
      control: { type: "boolean" }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    }
  },
  args: {
    faustIds: ["62523611"],
    manifestText: "Bog",
    availabilityText: "Hjemme",
    url: new URL("/", getCurrentLocation()),
    selected: false
  }
} as ComponentMeta<typeof AvailabilityLabel>;

const Template: ComponentStory<typeof AvailabilityLabel> = (
  args: AvailabilityLabelProps
) => {
  const ConfiguredAvailabilityLabel = withUrls(withConfig(AvailabilityLabel));
  return <ConfiguredAvailabilityLabel {...args} />;
};

export const Available = Template.bind({});
Available.args = {
  faustIds: ["61435867"]
};

export const MoreThanOneID = Template.bind({});
MoreThanOneID.args = {
  faustIds: ["62523611", "62150041", "61435867"]
};

export const Selected = Template.bind({});
Selected.args = {
  manifestText: "lydbog (cd-mp3)",
  selected: true
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  manifestText: "ebog"
};
