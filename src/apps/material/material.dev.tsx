import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    searchUrl: {
      name: "Path to the search result page",
      defaultValue: "/search",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    dplCmsBaseUrl: {
      name: "DPL CMS base URL",
      defaultValue: "http://dpl-cms.docker",
      control: { type: "text" }
    },
    wid: {
      name: "Work ID",
      defaultValue: "work-of:870970-basis:52557240",
      control: { type: "text" }
    },
    smsNotificationsForReservationsEnabledConfig: {
      name: "SMS notifications for reservations is enabled",
      defaultValue: "1",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted Pickup branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    branchesConfig: {
      name: "Branches",
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    materialHeaderAllEditionsText: {
      name: "Text for the fiction edition text",
      defaultValue: "All editions",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "By (author)",
      defaultValue: "By",
      control: { type: "text" }
    },
    periodicalSelectYearText: {
      name: "Year",
      defaultValue: "Year",
      control: { type: "text" }
    },
    periodicalSelectEditionText: {
      name: "Edition/Week",
      defaultValue: "Edition",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve",
      defaultValue: "Reserve book",
      control: { type: "text" }
    },
    reserveText: {
      name: "Reserve",
      defaultValue: "Reserve",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      name: "Find on bookshelf",
      defaultValue: "Find on shelf",
      control: { type: "text" }
    },
    descriptionHeadlineText: {
      name: "Description headline",
      defaultValue: "Description",
      control: { type: "text" }
    },
    identifierText: {
      name: "Identifier/topic text",
      defaultValue: "Tags",
      control: { type: "text" }
    },
    inSameSeriesText: {
      name: "In same series as",
      defaultValue: "In the same series",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number",
      defaultValue: "Nr.",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "in series",
      control: { type: "text" }
    },
    loginToSeeReviewText: {
      name: "Login to see Review",
      defaultValue: "Login to see the review.",
      control: { type: "text" }
    },
    cantViewReviewText: {
      name: "Cannot view Review",
      defaultValue: "Cannot view the review.",
      control: { type: "text" }
    },
    ratingIsText: {
      name: "Rating is",
      defaultValue:
        "Rating of this item is @heartCount out of @numberOfHeartsPossible hearts",
      control: { type: "text" }
    },
    outOfText: {
      name: "X 'out of' Y",
      defaultValue: "out of",
      control: { type: "text" }
    },
    detailsOfTheMaterialText: {
      name: "Details of the material",
      defaultValue: "Details about the material",
      control: { type: "text" }
    },
    editionsText: {
      name: "Editions",
      defaultValue: "Editions",
      control: { type: "text" }
    },
    fictionNonfictionText: {
      name: "Fiction Nonfiction",
      defaultValue: "Fictional",
      control: { type: "text" }
    },
    detailsText: {
      name: "Details",
      defaultValue: "Details",
      control: { type: "text" }
    },
    reviewsText: {
      name: "Reviews",
      defaultValue: "Reviews",
      control: { type: "text" }
    },
    typeText: {
      name: "Type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    languageText: {
      name: "Language",
      defaultValue: "Language",
      control: { type: "text" }
    },
    contributorsText: {
      name: "Contributors",
      defaultValue: "Contributors",
      control: { type: "text" }
    },
    originalTitleText: {
      name: "Original title",
      defaultValue: "Original title",
      control: { type: "text" }
    },
    isbnText: {
      name: "ISBN",
      defaultValue: "ISBN",
      control: { type: "text" }
    },
    editionText: {
      name: "Edition",
      defaultValue: "Edition",
      control: { type: "text" }
    },
    scopeText: {
      name: "Scope",
      defaultValue: "Scope",
      control: { type: "text" }
    },
    publisherText: {
      name: "Publisher",
      defaultValue: "Publisher",
      control: { type: "text" }
    },
    audienceText: {
      name: "Audience",
      defaultValue: "Audience",
      control: { type: "text" }
    },
    genreAndFormText: {
      name: "Genre and form",
      defaultValue: "Genre",
      control: { type: "text" }
    },
    creatorsAreMissingText: {
      name: "Creators are missing",
      defaultValue: "Creators are missing",
      control: { type: "text" }
    },
    goToEReolenText: {
      name: "Go to e-Reolen",
      defaultValue: "Go to e-Reolen",
      control: { type: "text" }
    },
    readArticleText: {
      name: "Read article",
      defaultValue: "Read article",
      control: { type: "text" }
    },
    loadingText: {
      name: "Loading",
      defaultValue: "Loading",
      control: { type: "text" }
    },
    getOnlineText: {
      name: "Get online",
      defaultValue: "Get online",
      control: { type: "text" }
    },
    seeOnlineText: {
      name: "See online",
      defaultValue: "See online",
      control: { type: "text" }
    },
    cantReserveText: {
      name: "Can't be reserved",
      defaultValue: "Can't be reserved",
      control: { type: "text" }
    },
    goToText: {
      name: "Go to",
      defaultValue: "Go to",
      control: { type: "text" }
    },
    materialIsLoanedOutText: {
      name: "Material is loaned out",
      defaultValue: "Material is loaned out",
      control: { type: "text" }
    },
    findOnShelfExpandButtonExplanationText: {
      name: "Find on shelf expand button explanation text",
      defaultValue: "This button opens a modal",
      control: { type: "text" }
    },
    materialIsIncludedText: {
      name: "Material is included",
      defaultValue: "This material doesn't count towards your loan quota",
      control: { type: "text" }
    },
    materialsInStockInfoText: {
      name: "Materials in stock info text",
      defaultValue:
        '{"type":"plural","text":["We have 1 copy of the material in stock","We have @count copies of the material in stock"]}',
      control: { type: "text" }
    },
    materialReservationInfoText: {
      name: "Material Reservation info text",
      defaultValue:
        '{"type":"plural","text":["1 copy has been reserved","@count copies have been reserved"]}',
      control: { type: "text" }
    },
    onlineLimitMonthInfoText: {
      name: "Online limit info text",
      defaultValue:
        "You have borrowed @count out of @limit possible e-books this month",
      control: { type: "text" }
    },
    approveReservationText: {
      name: "Approve reservation",
      defaultValue: "Approve reservation",
      control: { type: "text" }
    },
    shiftText: {
      name: "Change",
      defaultValue: "Change",
      control: { type: "text" }
    },
    pickupLocationText: {
      name: "Pick up at",
      defaultValue: "Pick up at",
      control: { type: "text" }
    },
    receiveSmsWhenMaterialReadyText: {
      name: "You will receive an SMS when the material is ready",
      defaultValue: "You will receive an SMS when the material is ready",
      control: { type: "text" }
    },
    receiveEmailWhenMaterialReadyText: {
      name: "Receive mail when the material is ready",
      defaultValue: "You will receive an email when the material is ready",
      control: { type: "text" }
    },
    haveNoInterestAfterText: {
      name: "Have no interest after",
      defaultValue: "Have no interest after",
      control: { type: "text" }
    },
    oneMonthText: {
      name: "One month",
      defaultValue: "1 month",
      control: { type: "text" }
    },
    twoMonthsText: {
      name: "Two months",
      defaultValue: "2 months",
      control: { type: "text" }
    },
    threeMonthsText: {
      name: "Three months",
      defaultValue: "3 months",
      control: { type: "text" }
    },
    sixMonthsText: {
      name: "Six months",
      defaultValue: "6 months",
      control: { type: "text" }
    },
    oneYearText: {
      name: "Twelve months",
      defaultValue: "12 months",
      control: { type: "text" }
    },
    daysText: {
      name: "Days",
      defaultValue: "Days",
      control: { type: "text" }
    },
    reservationSuccesTitleText: {
      name: "Reservation Success title",
      defaultValue: "Material is available and reserved for you!",
      control: { type: "text" }
    },
    reservationSuccesIsReservedForYouText: {
      name: "Reservation Success Title",
      defaultValue: "is reserved for you",
      control: { type: "text" }
    },
    reservationSuccessPreferredPickupBranchText: {
      name: "Reservation Preferred pickup branch",
      defaultValue:
        "Material is available and you will get a message when it is ready for pickup - pickup at @branch",
      control: { type: "text" }
    },
    reservationErrorsTitleText: {
      name: "Reservation Error title",
      defaultValue: "Failed to reserve the material",
      control: { type: "text" }
    },
    reservationErrorsDescriptionText: {
      name: "Reservation Error description",
      defaultValue:
        "We're sorry. Unfortunately, there has been an error. Try again, please.",
      control: { type: "text" }
    },
    tryAginButtonText: {
      name: "Try again button text",
      defaultValue: "Try again",
      control: { type: "text" }
    },
    okButtonText: {
      name: "Ok button text",
      defaultValue: "Ok",
      control: { type: "text" }
    },
    missingDataText: {
      name: "Missing data text",
      defaultValue: "Missing data",
      control: { type: "text" }
    },
    reservationModalScreenReaderModalDescriptionText: {
      name: "Reservation modal screen reader description",
      defaultValue: "Modal for reservation",
      control: { type: "text" }
    },
    reservationModalCloseModalAriaLabelText: {
      name: "Close Reservation modal",
      defaultValue: "Close reservation modal",
      control: { type: "text" }
    },
    librariesHaveTheMaterialText: {
      name: "Libraries have the material",
      defaultValue: "libraries have material",
      control: { type: "text" }
    },
    findOnShelfModalScreenReaderModalDescriptionText: {
      name: "Reservation modal screen reader description",
      defaultValue: "Modal for reservation",
      control: { type: "text" }
    },
    findOnShelfModalCloseModalAriaLabelText: {
      name: "Close findOnShelf modal",
      defaultValue: "Close reservation modal",
      control: { type: "text" }
    },
    findOnShelfModalListMaterialText: {
      name: "Material",
      defaultValue: "Material",
      control: { type: "text" }
    },
    findOnShelfModalListFindOnShelfText: {
      name: "Find it on shelf",
      defaultValue: "Find it on shelf",
      control: { type: "text" }
    },
    findOnShelfModalListItemCountText: {
      name: "Home",
      defaultValue: "home",
      control: { type: "text" }
    },
    findOnShelfModalNoLocationSpecifiedText: {
      name: "No location for find on shelf specified",
      defaultValue: "-",
      control: { type: "text" }
    },
    findOnShelfModalPeriodicalYearDropdownText: {
      name: "Find on shelf modal periodical dropdown - choose year",
      defaultValue: "Choose periodical year",
      control: { type: "text" }
    },
    findOnShelfModalPeriodicalEditionDropdownText: {
      name: "Find on shelf modal periodical dropdown - choose edition/volume",
      defaultValue: "Choose periodical edition",
      control: { type: "text" }
    },
    numberInQueueText: {
      name: "Number in queue text",
      defaultValue: "You are number @number in the queue",
      control: { type: "text" }
    },
    alreadyReservedText: {
      name: "Already reserved text",
      defaultValue: "You already reserved this material",
      control: { type: "text" }
    },
    closeText: {
      name: "Close text",
      defaultValue: "Close",
      control: { type: "text" }
    },
    modalReservationFormEmailHeaderTitleText: {
      name: "Modal reservation form email header title",
      defaultValue: "Change email",
      control: { type: "text" }
    },
    modalReservationFormEmailHeaderDescriptionText: {
      name: "Modal reservation form email header description",
      defaultValue:
        "If you wish to receive notification emails you can add or change your email address here.",
      control: { type: "text" }
    },
    modalReservationFormEmailInputFieldLabelText: {
      name: "Modal reservation form email input field label",
      defaultValue: "Email",
      control: { type: "text" }
    },
    modalReservationFormEmailInputFieldDescriptionText: {
      name: "Modal reservation form email input field description",
      defaultValue: "Add email",
      control: { type: "text" }
    },
    modalReservationFormSmsHeaderTitleText: {
      name: "Modal reservation form sms header title",
      defaultValue: "Change phone number",
      control: { type: "text" }
    },
    modalReservationFormSmsHeaderDescriptionText: {
      name: "Modal reservation form sms header description",
      defaultValue:
        "If you wish to receive notification sms you can add or change your phone number here.",
      control: { type: "text" }
    },
    modalReservationFormSmsInputFieldLabelText: {
      name: "Modal reservation form sms input field label",
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    modalReservationFormSmsInputFieldDescriptionText: {
      name: "Modal reservation form sms input field description",
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
      control: { type: "text" }
    },
    modalReservationFormPickupHeaderTitleText: {
      name: "Modal reservation form pickup header title",
      defaultValue: "Change pick-up location",
      control: { type: "text" }
    },
    modalReservationFormPickupHeaderDescriptionText: {
      name: "Modal reservation form pickup header description",
      defaultValue:
        "If you wish to change the pick-up location for your reservation, you can do it here.",
      control: { type: "text" }
    },
    chooseOneText: {
      name: "Choose one text",
      defaultValue: "Choose one",
      control: { type: "text" }
    },
    modalReservationFormNoInterestAfterHeaderTitleText: {
      name: "Modal reservation form no interest after header title",
      defaultValue: "Change date of interest",
      control: { type: "text" }
    },
    modalReservationFormNoInterestAfterHeaderDescriptionText: {
      name: "Modal reservation form no interest after header description",
      defaultValue:
        "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",
      control: { type: "text" }
    },
    infomediaModalScreenReaderModalDescriptionText: {
      name: "Infomedia modal screen reader description",
      defaultValue: "Modal for infomedia",
      control: { type: "text" }
    },
    infomediaModalCloseModalAriaLabelText: {
      name: "Close infomedia modal",
      defaultValue: "Close infomedia modal",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

const Template: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Periodical = Template.bind({});
Periodical.args = {
  wid: "work-of:870970-basis:06373674"
};

export const Infomedia = Template.bind({});
Infomedia.args = {
  wid: "work-of:870971-avis:35731733"
};
