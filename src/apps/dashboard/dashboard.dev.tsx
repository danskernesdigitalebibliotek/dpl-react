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
    physicalText: {
      defaultValue: "Physical",
      control: { type: "text" }
    },
    digitalText: {
      defaultValue: "Digital",
      control: { type: "text" }
    },
    digitalLoansUrl: {
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
    chooseAllText: {
      defaultValue: "Select all",
      control: { type: "text" }
    },
    removeAllReservationsText: {
      defaultValue: "Remove reservations",
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
    },
    readyForLoanText: {
      defaultValue: "Reservationer klar til lån",
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
    groupModalDueDateHeaderText: {
      control: {
        type: "text"
      },
      defaultValue: "Due date @date"
    },
    groupModalReturnLibraryText: {
      defaultValue: "",
      control: { type: "text" }
    },
    groupModalCheckboxText: {
      control: {
        type: "text"
      },
      defaultValue: "Choose all renewable"
    },
    groupModalButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "Renewable (@count)"
    },
    groupModalRenewLoanDeniedMaxRenewalsReachedText: {
      control: {
        type: "text"
      },
      defaultValue: "The item cannot be renewed further "
    },
    groupModalDueDateMaterialText: {
      control: {
        type: "text"
      },
      defaultValue: "Afleveres @date"
    },
    groupModalGoToMaterialText: {
      defaultValue: "Go to material details",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      defaultValue: "Showing @itemsShown out of @hitcount loans",
      control: { type: "text" }
    },
    loanListMaterialDaysText: {
      control: {
        type: "text"
      },
      defaultValue: "days"
    },
    groupModalDueDateWarningLoanOverdueText: {
      control: {
        type: "text"
      },
      defaultValue:
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
    },
    groupModalDueDateLinkToPageWithFeesText: {
      control: {
        type: "text"
      },
      defaultValue: "Read more about fees"
    },
    feesPageUrl: {
      defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
      control: { type: "text" }
    },
    groupModalRenewLoanDeniedReservedText: {
      control: {
        type: "text"
      },
      defaultValue: "The item is reserved by another patron"
    }
  },
  component: DashBoard
} as ComponentMeta<typeof DashBoard>;

const Template: ComponentStory<typeof DashBoard> = (props) => (
  <DashBoard {...props} />
);

export const DashBoardEntry = Template.bind({});

DashBoardEntry.args = {};
