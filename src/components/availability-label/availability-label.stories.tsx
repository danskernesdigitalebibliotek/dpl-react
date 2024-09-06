import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AccessTypeCode } from "../../core/dbc-gateway/generated/graphql";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { withConfig } from "../../core/utils/config";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import { withUrls } from "../../core/utils/url";
import { AvailabilityLabel } from "./availability-label";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

// The configuration below addresses the different variables,
// their default values, and how they translate into storybook
// controls.
const meta: Meta<typeof AvailabilityLabel> = {
  title: "Components/Availability Label",
  component: AvailabilityLabel,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
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
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    faustIds: ["62523611"],
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    cursorPointer: false,
    dataCy: "",
    isbns: [],
    accessTypes: [],
    manifestText: "Bog",
    availabilityText: "Hjemme",
    url: new URL("/", getCurrentLocation()),
    selected: false
  },
  decorators: [
    (Story) => {
      const DecoratedStory = withUrls(withConfig(Story));
      return <DecoratedStory />;
    }
  ]
};

export default meta;

type Story = StoryObj<typeof AvailabilityLabel>;

export const Available: Story = {
  args: {
    faustIds: ["61435867"]
  }
};

export const MoreThanOneID: Story = {
  args: {
    faustIds: ["62523611", "62150041", "61435867"]
  }
};

export const Selected: Story = {
  args: {
    faustIds: ["62523611"],
    manifestText: "lydbog (cd-mp3)",
    selected: true
  }
};

export const Unavailable: Story = {
  args: {
    faustIds: ["62523611"],
    manifestText: "ebog"
  }
};

export const EBogPrinsenHarry: Story = {
  args: {
    isbns: ["9788763844123"],
    manifestText: "ebog"
  }
};
