import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import DashBoard from "./dashboard.entry";

export default {
  title: "Apps / Dashboard",
  argTypes: {
    ...serviceUrlArgs,
    // Urls
    feesPageUrl: {
      defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
      control: { type: "text" }
    },
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
    ereolenMyPageUrl: {
      defaultValue: "https://ereolen.dk/user/me/",
      control: { type: "text" }
    },
    yourProfileText: {
      defaultValue: "Your profile",
      control: { type: "text" }
    },
    deleteReservationModalAriaDescriptionText: {
      defaultValue:
        "This button opens a modal that covers the entire page and contains the possibility to delete a selected reservation, or multiple selected reservations",
      control: { type: "text" }
    },
    deleteReservationModalCloseModalText: {
      defaultValue: "Close delete reservation modal",
      control: { type: "text" }
    },
    deleteReservationModalDeleteQuestionText: {
      defaultValue:
        '{"type":"plural","text":["Do you want to cancel your reservation?","Do you want to cancel your reservations?"]}',
      control: { type: "text" }
    },
    deleteReservationModalNotRegrettableText: {
      defaultValue: "You cannot regret this action",
      control: { type: "text" }
    },
    deleteReservationModalDeleteButtonText: {
      defaultValue:
        '{"type":"plural","text":["Cancel reservation","Cancel reservations"]}',
      control: { type: "text" }
    },
    deleteReservationModalHeaderText: {
      defaultValue:
        '{"type":"plural","text":["Cancel reservation","Cancel reservations"]}',
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
    interestPeriodsConfig: {
      defaultValue:
        '[\n   {\n      "value":"30",\n      "label":"1 month"\n   },\n   {\n      "value":"60",\n      "label":"2 months"\n   },\n   {\n      "value":"90",\n      "label":"3 months"\n   },\n   {\n      "value":"180",\n      "label":"6 months"\n   },\n   {\n      "value":"360",\n      "label":"1 year"\n   }\n]',
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
    groupModalCloseModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Close modal with grouped loans"
    },
    loansOverdueText: {
      defaultValue: "Returned too late",
      control: { type: "text" }
    },
    groupModalHiddenLabelCheckboxOnMaterialText: {
      control: {
        type: "text"
      },
      defaultValue: "Select @label for renewal"
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
    reservationsReadyForPickupText: {
      defaultValue: "Reservations ready for pickup",
      control: { type: "text" }
    },
    queuedReservationsText: {
      defaultValue: "Queued reservations",
      control: { type: "text" }
    },
    removeAllReservationsText: {
      defaultValue: "Remove reservations (@amount)",
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
    readyForLoanCounterLabelText: {
      defaultValue: "Ready",
      control: { type: "text" }
    },
    materialDetailsCloseModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Close material details modal"
    },
    materialDetailsLinkToPageWithFeesText: {
      control: {
        type: "text"
      },
      defaultValue: "Read more about fees"
    },
    materialDetailsModalAriaDescriptionText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This modal shows material details, and makes it possible to renew a material, of that material is renewable"
    },
    materialDetailsOverdueText: {
      control: {
        type: "text"
      },
      defaultValue: "Expired"
    },
    materialDetailsMaterialNumberLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Material Item Number"
    },
    materialDetailsLoanDateLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Loan date"
    },
    materialDetailsPhysicalDueDateLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Afleveres"
    },
    groupModalDueDateLinkToPageWithFeesText: {
      control: {
        type: "text"
      },
      defaultValue: "Read more about fees"
    },
    materialDetailsWarningLoanOverdueText: {
      control: {
        type: "text"
      },
      defaultValue:
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
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
      defaultValue: "Can be returned to all branches of Samsøs libraries",
      control: { type: "text" }
    },
    groupModalCheckboxText: {
      control: {
        type: "text"
      },
      defaultValue: "Choose all"
    },
    groupModalAriaDescriptionText: {
      control: {
        type: "text"
      },
      defaultValue: "This modal makes it possible to renew materials"
    },
    groupModalButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "Renewable (@count)"
    },
    reservationDetailsRemoveDigitalReservationText: {
      defaultValue: "Remove your reservation",
      control: { type: "text" }
    },
    reservationDetailsDateOfReservationTitleText: {
      defaultValue: "Date of reservation",
      control: { type: "text" }
    },
    listDetailsNothingSelectedLabelText: {
      defaultValue: "Pick",
      control: { type: "text" }
    },
    reservationDetailsNoInterestAfterTitleText: {
      defaultValue: "Not interested after",
      control: { type: "text" }
    },
    reservationDetailsChangeText: {
      defaultValue: "Apply changes",
      control: { type: "text" }
    },
    reservationDetailsPickUpAtTitleText: {
      defaultValue: "Pickup branch",
      control: { type: "text" }
    },
    reservationDetailsButtonRemoveText: {
      defaultValue: "Remove your reservation",
      control: { type: "text" }
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
    reservationDetailsStatusTitleText: {
      defaultValue: "Status",
      control: { type: "text" }
    },
    reservationDetailsBorrowBeforeText: {
      defaultValue: "Borrow before @date",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      defaultValue: "Showing @itemsShown out of @hitcount elements",
      control: { type: "text" }
    },
    reservationDetailsDigitalReservationGoToEreolenText: {
      defaultValue: "Go to eReolen",
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
    reservationDetailsReadyForLoanText: {
      defaultValue: "Ready for pickup",
      control: { type: "text" }
    },
    reservationDetailsPickupDeadlineTitleText: {
      defaultValue: "Pickup deadline",
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
      defaultValue: "Pick up before @date",
      control: { type: "text" }
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
    reservationDetailAllowRemoveReadyReservationsConfig: {
      defaultValue: "1",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    branchesConfig: {
      name: "Branches",
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    thresholdConfig: {
      defaultValue:
        '{\n      "colorThresholds":{\n      "danger":"0",\n      "warning":"6"\n   }\n   }',
      control: { type: "text" }
    },
    pageSizeDesktop: {
      defaultValue: 10,
      control: { type: "number" }
    },
    pageSizeMobile: {
      defaultValue: 5,
      control: { type: "number" }
    }
  },
  component: DashBoard
} as ComponentMeta<typeof DashBoard>;

const Template: ComponentStory<typeof DashBoard> = (props) => (
  <DashBoard {...props} />
);

export const DashboardEntry = Template.bind({});

DashboardEntry.args = {};
