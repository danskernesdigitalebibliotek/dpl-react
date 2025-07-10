import type { Meta, StoryObj } from "@storybook/react-webpack5";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import DashBoard from "./dashboard.entry";
import groupModalArgs, {
  argTypes as groupModalArgTypes
} from "../../core/storybook/groupModalArgs";
import loanGroupModalArgs, {
  argTypes as loanGroupModalArgTypes
} from "../../core/storybook/loanGroupModalArgs";
import renewalArgs, {
  argTypes as renewalArgTypes
} from "../../core/storybook/renewalArgs";
import reservationGroupModalArgs, {
  argTypes as reservationGroupModalArgTypes
} from "../../core/storybook/reservationGroupModalArgs";
import reservationMaterialDetailsProps, {
  argTypes as reservationMaterialDetailsPropsArgTypes
} from "../../core/storybook/reservationMaterialDetailsArgs";
import materialDetailsModalArgs, {
  argTypes as materialDetailsModalArgTypes
} from "../../core/storybook/materialDetailsModalArgs";
import deleteReservationModalArgs, {
  argTypes as deleteReservationModalArgTypes
} from "../../core/storybook/deleteReservationModalArgs";
import reservationListArgs, {
  argTypes as reservationListArgTypes
} from "../../core/storybook/reservationListArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import blockedArgs, {
  argTypes as blockedArgTypes
} from "../../core/storybook/blockedArgs";

const meta: Meta<typeof DashBoard> = {
  title: "Apps / Dashboard",
  component: DashBoard,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type this
  argTypes: {
    ...blockedArgTypes,
    ...serviceUrlArgTypes,
    ...groupModalArgTypes,
    ...loanGroupModalArgTypes,
    ...renewalArgTypes,
    ...reservationGroupModalArgTypes,
    ...reservationMaterialDetailsPropsArgTypes,
    ...materialDetailsModalArgTypes,
    ...deleteReservationModalArgTypes,
    ...reservationListArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    // Urls
    physicalLoansUrl: {
      control: { type: "text" }
    },
    reservationsUrl: {
      control: { type: "text" }
    },
    yourProfileText: {
      control: { type: "text" }
    },
    feesText: {
      control: { type: "text" }
    },
    totalOwedText: {
      control: { type: "text" }
    },
    dashboardSeeMoreFeesText: {
      control: { type: "text" }
    },
    dashboardSeeMoreFeesAriaLabelText: {
      control: { type: "text" }
    },
    totalAmountFeeText: {
      control: { type: "text" }
    },
    physicalLoansText: {
      control: { type: "text" }
    },
    loansOverdueText: {
      control: { type: "text" }
    },
    loansSoonOverdueText: {
      control: { type: "text" }
    },
    reservationsText: {
      control: { type: "text" }
    },
    queuedReservationsText: {
      control: { type: "text" }
    },
    reservationsReadyText: {
      control: { type: "text" }
    },
    noPhysicalLoansText: {
      control: { type: "text" }
    },
    noReservationsText: {
      control: { type: "text" }
    },
    statusBadgeWarningText: {
      control: { type: "text" }
    },
    readyForLoanText: {
      control: { type: "text" }
    },
    publizonAudioBookText: {
      control: { type: "text" }
    },
    publizonEbookText: {
      control: { type: "text" }
    },
    publizonPodcastText: {
      control: { type: "text" }
    },
    dashboardNumberInLineText: {
      control: { type: "text" }
    },
    loanListMaterialDaysText: {
      control: { type: "text" }
    },
    etAlText: {
      control: { type: "text" }
    },
    materialByAuthorText: {
      control: { type: "text" }
    },
    materialAndAuthorText: {
      control: { type: "text" }
    },
    reservationListLoanBeforeText: {
      control: { type: "text" }
    },
    expirationWarningDaysBeforeConfig: {
      control: { type: "text" }
    },
    dashboardLoansLinkText: {
      control: { type: "text" }
    },
    dashboardReservationsLinkText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof DashBoard>;

export const Primary: Story = {
  args: {
    ...blockedArgs,
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
    physicalLoansUrl: "/user/me/loans",
    reservationsUrl: "/user/me/reservations",
    yourProfileText: "Your profile",
    feesText: "Fees",
    totalOwedText: "You owe in total",
    dashboardSeeMoreFeesText: "See more",
    dashboardSeeMoreFeesAriaLabelText: "See your fees and how to pay",
    totalAmountFeeText: "@total",
    physicalLoansText: "Loans",
    loansOverdueText: "Returned too late",
    loansSoonOverdueText: "To be returned soon",
    reservationsText: "Reservations",
    queuedReservationsText: "Queued reservations",
    reservationsReadyText: "Ready for you",
    noPhysicalLoansText: "At the moment, you have 0 physical loans",
    noReservationsText: "At the moment, you have 0 reservations",
    statusBadgeWarningText: "Expires soon",
    readyForLoanText: "Ready for pickup",
    publizonAudioBookText: "Audiobook",
    publizonEbookText: "E-book",
    publizonPodcastText: "Podcast",
    dashboardNumberInLineText: "Number @count in line",
    loanListMaterialDaysText: "days",
    etAlText: "et al.",
    materialByAuthorText: "By",
    materialAndAuthorText: "and",
    reservationListLoanBeforeText: "Borrow before @date",
    expirationWarningDaysBeforeConfig: "6",
    dashboardLoansLinkText: "All loans",
    dashboardReservationsLinkText: "All reservations",
    materialDetailsOverdueText: "Overdue"
  }
};
