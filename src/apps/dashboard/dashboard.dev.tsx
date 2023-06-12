import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import DashBoard from "./dashboard.entry";
import groupModalArgs from "../../core/storybook/groupModalArgs";
import loanGroupModalArgs from "../../core/storybook/loanGroupModalArgs";
import reservationGroupModalArgs from "../../core/storybook/reservationGroupModalArgs";
import reservationMaterialDetailsProps from "../../core/storybook/reservationMaterialDetailsArgs";
import materialDetailsModalArgs from "../../core/storybook/materialDetailsModalArgs";
import deleteReservationModalArgs from "../../core/storybook/deleteReservationModalArgs";

export default {
  title: "Apps / Dashboard",
  argTypes: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...loanGroupModalArgs,
    ...reservationGroupModalArgs,
    ...reservationMaterialDetailsProps,
    ...materialDetailsModalArgs,
    ...deleteReservationModalArgs,
    // Urls
    loansOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    physicalLoansUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    feesUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    reservationsUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    yourProfileText: {
      defaultValue: "Your profile",
      control: { type: "text" }
    },
    feesText: {
      defaultValue: "Fees",
      control: { type: "text" }
    },
    totalOwedText: {
      defaultValue: "You owe in total",
      control: { type: "text" }
    },
    payOwedText: {
      defaultValue: "Pay",
      control: { type: "text" }
    },
    totalAmountFeeText: {
      defaultValue: "@total,-",
      control: { type: "text" }
    },
    physicalLoansText: {
      defaultValue: "Loans",
      control: { type: "text" }
    },
    loansOverdueText: {
      defaultValue: "Returned too late",
      control: { type: "text" }
    },
    loansSoonOverdueText: {
      defaultValue: "To be returned soon",
      control: { type: "text" }
    },
    loansNotOverdueText: {
      defaultValue: "Longer return time",
      control: { type: "text" }
    },
    reservationsText: {
      defaultValue: "Reservations",
      control: { type: "text" }
    },
    queuedReservationsText: {
      defaultValue: "Queued reservations",
      control: { type: "text" }
    },
    reservationsReadyText: {
      defaultValue: "Ready for you",
      control: { type: "text" }
    },
    reservationsStillInQueueForText: {
      defaultValue: "Still in queue",
      control: { type: "text" }
    },
    noPhysicalLoansText: {
      defaultValue: "At the moment, you have 0 physical loans",
      control: { type: "text" }
    },
    noReservationsText: {
      defaultValue: "At the moment, you have 0 reservations",
      control: { type: "text" }
    },
    statusBadgeWarningText: {
      control: {
        type: "text"
      },
      defaultValue: "Expires soon"
    },
    readyForLoanText: {
      defaultValue: "Ready for pickup",
      control: { type: "text" }
    },
    publizonAudioBookText: {
      control: {
        type: "text"
      },
      defaultValue: "Audiobook"
    },
    publizonEbookText: {
      control: {
        type: "text"
      },
      defaultValue: "E-book"
    },
    publizonPodcastText: {
      control: {
        type: "text"
      },
      defaultValue: "Podcast"
    },
    listDetailsNothingSelectedLabelText: {
      defaultValue: "Pick",
      control: { type: "text" }
    },
    dashboardNumberInLineText: {
      control: {
        type: "text"
      },
      defaultValue: "Number @count in line"
    },
    loanListMaterialDaysText: {
      control: {
        type: "text"
      },
      defaultValue: "days"
    },
    physicalReservationsModalHeaderText: {
      defaultValue: "Physical reservations",
      control: { type: "text" }
    },
    digitalReservationsModalHeaderText: {
      defaultValue: "Digital reservations",
      control: { type: "text" }
    },
    etAlText: {
      control: {
        type: "text"
      },
      defaultValue: "et al."
    },
    materialByAuthorText: {
      defaultValue: "By",
      control: { type: "text" }
    },
    materialAndAuthorText: {
      defaultValue: "and",
      control: { type: "text" }
    },
    // Config
    thresholdConfig: {
      defaultValue:
        '{\n      "colorThresholds":{\n      "danger":"0",\n      "warning":"6"\n   }\n   }',
      control: { type: "text" }
    }
  },
  component: DashBoard
} as ComponentMeta<typeof DashBoard>;

const Template: ComponentStory<typeof DashBoard> = (props) => (
  <DashBoard {...props} />
);

export const DashboardEntry = Template.bind({});

DashboardEntry.args = {};
