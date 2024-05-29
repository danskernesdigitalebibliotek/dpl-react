import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import DashBoard from "./dashboard.entry";
import groupModalArgs from "../../core/storybook/groupModalArgs";
import loanGroupModalArgs from "../../core/storybook/loanGroupModalArgs";
import renewalArgs from "../../core/storybook/renewalArgs";
import reservationGroupModalArgs from "../../core/storybook/reservationGroupModalArgs";
import reservationMaterialDetailsProps from "../../core/storybook/reservationMaterialDetailsArgs";
import materialDetailsModalArgs from "../../core/storybook/materialDetailsModalArgs";
import deleteReservationModalArgs from "../../core/storybook/deleteReservationModalArgs";
import reservationListArgs from "../../core/storybook/reservationListArgs";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Apps / Dashboard",
  argTypes: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...loanGroupModalArgs,
    ...renewalArgs,
    ...reservationGroupModalArgs,
    ...reservationMaterialDetailsProps,
    ...materialDetailsModalArgs,
    ...deleteReservationModalArgs,
    ...reservationListArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    // Urls
    physicalLoansUrl: {
      defaultValue: "/user/me/loans",
      control: { type: "text" }
    },
    reservationsUrl: {
      defaultValue: "/user/me/reservations",
      control: { type: "text" }
    },
    ereolenHomepageUrl: {
      defaultValue: "https://ereolen.dk/",
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
    dashboardSeeMoreFeesText: {
      defaultValue: "See more",
      control: { type: "text" }
    },
    dashboardSeeMoreFeesAriaLabelText: {
      defaultValue: "See your fees and how to pay",
      control: { type: "text" }
    },
    totalAmountFeeText: {
      defaultValue: "@total",
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
    reservationListLoanBeforeText: {
      defaultValue: "Borrow before @date",
      control: { type: "text" }
    },
    expirationWarningDaysBeforeConfig: {
      defaultValue: "6",
      control: { type: "text" }
    },
    dashboardLoansLinkText: {
      defaultValue: "All loans",
      control: { type: "text" }
    },
    dashboardReservationsLinkText: {
      defaultValue: "All reservations",
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
