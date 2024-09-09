import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import materialDev from "../../apps/material/material.stories";
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
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

const WrappedFindOnShelfModal = withText(
  withUrls(withConfig(FindOnShelfModal))
);
const WrappedMaterialButtonsFindOnShelf = withText(
  withUrls(withConfig(MaterialButtonsFindOnShelf))
);

const meta: Meta<typeof WrappedFindOnShelfModal> = {
  title: "Components / Find On Shelf Modal",
  component: WrappedFindOnShelfModal,
  argTypes: {
    ...serviceUrlArgs,
    // Spread material app argTypes so that we get access to system strings.
    // -> t() function strings in this story.
    ...materialDev.argTypes,
    ...globalTextArgs,
    ...globalConfigArgs,
    manifestations: {
      name: "Manifestations",
      control: { type: "object" }
    },
    workTitles: {
      name: "Work title(s)",
      control: { type: "object" }
    },
    authors: {
      name: "Author(s)",
      control: { type: "object" }
    },
    selectedPeriodical: {
      name: "Selected periodical",
      control: { type: "object" }
    },
    setSelectedPeriodical: {
      name: "Set selected periodical function",
      control: { type: "object" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted Pickup branches",
      control: { type: "text" }
    }
  },
  args: {
    ...materialDev.args,
    manifestations: mockedManifestationData,
    workTitles: ["Title 1", "Title 2"],
    authors: [
      { __typename: "Person", display: "author 1" },
      { __typename: "Person", display: "author 2" },
      { __typename: "Corporation", display: "author 3" }
    ],
    selectedPeriodical: null,
    setSelectedPeriodical: null,
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
  },
  render: (args: FindOnShelfModalProps) => {
    const storySelectedPeriodical = {
      volume: "",
      volumeYear: "2022",
      displayText: "2022, nr. 29",
      volumeNumber: "29",
      itemNumber: "5313131426"
    };

    const modifiedArgs = {
      ...args,
      selectedPeriodical: storySelectedPeriodical
    };
    /* eslint-enable no-param-reassign */
    const {
      manifestations: [{ pid }]
    } = args;

    return (
      <>
        <WrappedMaterialButtonsFindOnShelf
          {...modifiedArgs}
          size="small"
          faustIds={[convertPostIdToFaustId(pid)]}
        />
        <WrappedFindOnShelfModal {...modifiedArgs} />
      </>
    );
  }
};

export default meta;

type Story = StoryObj<typeof WrappedFindOnShelfModal>;

export const Primary: Story = {};

export const Periodical: Story = {
  args: {
    manifestations: mockedPeriodicalManifestationData
  }
};
