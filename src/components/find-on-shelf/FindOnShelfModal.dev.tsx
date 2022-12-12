import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import materialDev from "../../apps/material/material.dev";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { withConfig } from "../../core/utils/config";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import MaterialButtonsFindOnShelf from "../material/material-buttons/physical/MaterialButtonsFindOnShelf";
import FindOnShelfModal, { FindOnShelfModalProps } from "./FindOnShelfModal";
import {
  mockedManifestationData,
  mockedPeriodicalManifestationData
} from "./mocked-data";

export default {
  title: "Components / Find On Shelf Modal",
  component: FindOnShelfModal,
  argTypes: {
    ...serviceUrlArgs,
    // Spread material app argTypes so that we get access to system strings.
    // -> t() function strings in this story.
    ...materialDev.argTypes,
    manifestations: {
      name: "Manifestations",
      defaultValue: mockedManifestationData,
      control: { type: "object" }
    },
    workTitles: {
      name: "Work title(s)",
      defaultValue: ["Title 1", "Title 2"],
      control: { type: "object" }
    },
    authors: {
      name: "Author(s)",
      defaultValue: [
        { __typename: "Person", display: "author 1" },
        { __typename: "Person", display: "author 2" },
        { __typename: "Corporation", display: "author 3" }
      ],
      control: { type: "object" }
    },
    selectedPeriodical: {
      name: "Selected periodical",
      defaultValue: null,
      control: { type: "null" }
    },
    setSelectedPeriodical: {
      name: "Set selected periodical function",
      defaultValue: null,
      control: { type: "null" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted Pickup branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof FindOnShelfModal>;

const Template: ComponentStory<typeof FindOnShelfModal> = (
  args: FindOnShelfModalProps
) => {
  const [storySelectedPeriodical, setStorySelectedPeriodical] = useState({
    volume: "",
    volumeYear: "2022",
    displayText: "2022, nr. 29",
    volumeNumber: "29",
    itemNumber: "5313131426"
  });
  // We would like useState values to be passed to the story so that it rerenders
  // upon dropdown change.
  /* eslint-disable no-param-reassign */
  args.selectedPeriodical = storySelectedPeriodical;
  args.setSelectedPeriodical = setStorySelectedPeriodical;
  /* eslint-enable no-param-reassign */
  const {
    manifestations: [{ pid }]
  } = args;
  const FindOnShelfModalWithConfigAndText = withUrls(
    withConfig(withText(FindOnShelfModal))
  );
  return (
    <>
      <MaterialButtonsFindOnShelf
        size="small"
        faustIds={[convertPostIdToFaustId(pid)]}
      />
      <FindOnShelfModalWithConfigAndText {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Periodical = Template.bind({});
Periodical.args = {
  manifestations: mockedPeriodicalManifestationData
};
