import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { AccessTypeCode } from "../../core/dbc-gateway/generated/graphql";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { withConfig } from "../../core/utils/config";
import { getCurrentLocation } from "../../core/utils/helpers/url";
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
    },
    cursorPointer: {
      name: "Cursor pointer",
      control: { type: "boolean" }
    },
    dataCy: {
      name: "Cypress data attribute",
      control: { type: "text" }
    },
    isbns: {
      name: "ISBN",
      control: { type: "text" }
    },
    accessTypes: {
      name: "Access types",
      options: [...Object.values(AccessTypeCode)],
      control: { type: "check" }
    }
  },
  args: {
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
  faustIds: ["62523611"],
  manifestText: "lydbog (cd-mp3)",
  selected: true
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  faustIds: ["62523611"],
  manifestText: "ebog"
};

export const EBogPrinsenHarry = Template.bind({});
EBogPrinsenHarry.args = {
  isbns: ["9788763844123"],
  manifestText: "ebog",
  accessTypes: [AccessTypeCode.Online]
};
