import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";

import DashBoard from "./dashboard.entry";

export default {
  title: "Apps / DashBoard",
  argTypes: {
    ...serviceUrlArgs,
    yourProfileText: {
      defaultValue: "Din profil",
      control: { type: "text" }
    },
    intermediateText: {
      defaultValue: "Mellemværender",
      control: { type: "text" }
    },
    intermediateUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    totalOwedText: {
      defaultValue: "Du skylder i alt",
      control: { type: "text" }
    },
    payOwedText: {
      defaultValue: "Se mere",
      control: { type: "text" }
    },
    payOwedUrl: {
      defaultValue: "https://unsplash.com/photos/KRztl5I6xac", // open source image of a dank fox
      control: { type: "text" }
    },
    physicalLoansText: {
      defaultValue: "Fysiske lån",
      control: { type: "text" }
    },
    physicalLoansUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    loansOverdueText: {
      defaultValue: "Afleveret for sent",
      control: { type: "text" }
    },
    loansOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    loansSoonOverdueText: {
      defaultValue: "Afleveres snart",
      control: { type: "text" }
    },
    loansSoonOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    loansNotOverdueText: {
      defaultValue: "Længere afleveringstid",
      control: { type: "text" }
    },
    loansNotOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    reservationsText: {
      defaultValue: "Reserveringer",
      control: { type: "text" }
    },
    reservationsUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    reservationsReadyText: {
      defaultValue: "Klar til dig",
      control: { type: "text" }
    },
    reservationsStillInQueueForText: {
      defaultValue: "Stadig i kø",
      control: { type: "text" }
    },
    noPhysicalLoansText: {
      defaultValue: "Du har i øjeblikket 0 fysiske lån",
      control: { type: "text" }
    },
    noReservationsText: {
      defaultValue: "Du har i øjeblikket 0 reserveringer",
      control: { type: "text" }
    }
  },
  component: DashBoard
} as ComponentMeta<typeof DashBoard>;

const Template: ComponentStory<typeof DashBoard> = (props) => (
  <DashBoard {...props} />
);

export const DashBoardEntry = Template.bind({});

DashBoardEntry.args = {};
