import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import materialDev from "../../apps/material/material.dev";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import MaterialButtonsFindOnShelf from "../material/material-buttons/physical/MaterialButtonsFindOnShelf";
import FindOnShelfModal, { FindOnShelfModalProps } from "./FindOnShelfModal";

export default {
  title: "Components / Find On Shelf Modal",
  component: FindOnShelfModal,
  argTypes: {
    // Spread material app argTypes so that we get access to system strings.
    // -> t() function strings in this story.
    ...materialDev.argTypes,
    manifestations: {
      name: "Manifestations",
      defaultValue: [
        {
          pid: "870970-basis:52557240",
          genreAndForm: ["slægtsromaner"],
          source: ["Bibliotekskatalog"],
          titles: {
            main: ["De syv søstre"],
            original: ["The seven sisters"]
          },
          publicationYear: {
            display: "2016"
          },
          materialTypes: [
            {
              specific: "bog"
            }
          ],
          creators: [
            {
              display: "Lucinda Riley",
              __typename: "Person"
            }
          ],
          hostPublication: null,
          languages: {
            main: [
              {
                display: "dansk"
              }
            ]
          },
          identifiers: [
            {
              value: "9788763844116"
            }
          ],
          contributors: [
            {
              display: "Ulla Lauridsen"
            }
          ],
          edition: {
            summary: "1. udgave, 3. oplag (2018)"
          },
          audience: {
            generalAudience: []
          },
          physicalDescriptions: [
            {
              numberOfPages: null
            }
          ],
          accessTypes: [
            {
              code: "PHYSICAL"
            }
          ],
          access: [
            {
              __typename: "InterLibraryLoan",
              loanIsPossible: true
            }
          ],
          shelfmark: null
        },
        {
          pid: "870970-basis:52643414",
          genreAndForm: ["slægtsromaner"],
          source: ["Bibliotekskatalog"],
          titles: {
            main: ["De syv søstre (mp3)"],
            original: ["The seven sisters"]
          },
          publicationYear: {
            display: "2016"
          },
          materialTypes: [
            {
              specific: "lydbog (cd-mp3)"
            }
          ],
          creators: [
            {
              display: "Lucinda Riley",
              __typename: "Person"
            }
          ],
          hostPublication: null,
          languages: {
            main: [
              {
                display: "dansk"
              }
            ]
          },
          identifiers: [
            {
              value: "9788763850636"
            }
          ],
          contributors: [
            {
              display: "Maria Stokholm"
            },
            {
              display: "Ulla Lauridsen"
            }
          ],
          edition: {
            summary: "1. lydbogsudgave"
          },
          audience: {
            generalAudience: []
          },
          physicalDescriptions: [
            {
              numberOfPages: null
            }
          ],
          accessTypes: [
            {
              code: "PHYSICAL"
            }
          ],
          access: [
            {
              __typename: "InterLibraryLoan",
              loanIsPossible: true
            }
          ],
          shelfmark: { postfix: "Postfix, 24", shelfmark: "60.7" }
        }
      ],
      control: { type: "object" }
    },
    workTitles: {
      name: "Work title(s)",
      defaultValue: ["Title 1", "Title 2"],
      control: { type: "object" }
    },
    authors: {
      name: "Work title(s)",
      defaultValue: [
        { __typename: "Person", display: "author 1" },
        { __typename: "Person", display: "author 2" },
        { __typename: "Corporation", display: "author 3" }
      ],
      control: { type: "object" }
    },
    pid: {
      name: "Work title(s)",
      defaultValue: "870970-basis:52557240",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof FindOnShelfModal>;

export const Default: ComponentStory<typeof FindOnShelfModal> = (
  args: FindOnShelfModalProps
) => {
  const { pid } = args;
  const FindOnShelfModalWithText = withText(FindOnShelfModal);

  return (
    <>
      <MaterialButtonsFindOnShelf
        size="small"
        faustIds={[convertPostIdToFaustId(pid as Pid)]}
      />
      <FindOnShelfModalWithText {...args} />
    </>
  );
};
