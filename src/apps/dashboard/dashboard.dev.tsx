import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";

import DashBoard from "./dashboard.entry";

export default {
  title: "Apps / DashBoard",
  argTypes: {
    ...serviceUrlArgs,
    yourProfileText: {
      defaultValue: "Your profile",
      control: { type: "text" }
    },
    intermediateText: {
      defaultValue: "Intermediates",
      control: { type: "text" }
    },
    intermediateUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    totalOwedText: {
      defaultValue: "You owe in total",
      control: { type: "text" }
    },
    payOwedText: {
      defaultValue: "Read more",
      control: { type: "text" }
    },
    payOwedUrl: {
      defaultValue: "https://unsplash.com/photos/KRztl5I6xac", // open source image of a dank fox
      control: { type: "text" }
    },
    physicalLoansText: {
      defaultValue: "Physical loans",
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
      defaultValue: "Returned too late",
      control: { type: "text" }
    },
    loansOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    loansSoonOverdueText: {
      defaultValue: "To be returned soon",
      control: { type: "text" }
    },
    loansSoonOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    loansNotOverdueText: {
      defaultValue: "Longer return time",
      control: { type: "text" }
    },
    loansNotOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/7LzKELgdzzI", // open source image of a fox
      control: { type: "text" }
    },
    reservationsText: {
      defaultValue: "Reservations",
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
    readyForLoanText: {
      defaultValue: "Ready for loan",
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
    dashboardNumberInLineText: {
      control: {
        type: "text"
      },
      defaultValue: "Number @count in line"
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
      defaultValue: "To be returned @date"
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
    },
    groupModalRenewLoanDeniedInterLibraryLoanText: {
      defaultValue:
        "The item has been lent to you by another library and renewal is therefore conditional of the acceptance by that library",
      control: { type: "text" }
    },
    pickUpLatestText: {
      defaultValue: "Pick up before",
      control: { type: "text" }
    },
    warningIconAltText: {
      defaultValue: " warningIconAltText",
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

export const DashBoardEntry = Template.bind({});

DashBoardEntry.args = {};
