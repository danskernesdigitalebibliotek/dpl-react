import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    ...serviceUrlArgs,
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
      defaultValue:
        "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024,DK-775164",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue:
        "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024,DK-775164",
      control: { type: "text" }
    },
    blacklistedInstantLoanBranchesConfig: {
      name: "Blacklisted Instant Loan branches",
      defaultValue:
        "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024,DK-775164",
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
    reserveMaterialTypeText: {
      name: "Reserve material type",
      defaultValue: "Reserve @materialType",
      control: { type: "text" }
    },
    reserveFromAnotherLibraryText: {
      name: "Reserve material type from another library",
      defaultValue: "Reserve @materialType elsewhere",
      control: { type: "text" }
    },
    reserveFromAnotherLibraryWithoutMaterialTypeText: {
      name: "Reserve from another library",
      defaultValue: "Reserve elsewhere",
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
    subjectNumberText: {
      name: "Subject number (Emnetal)",
      defaultValue: "Emnetal",
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
    detailsListTypeText: {
      name: "Type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    detailsListLanguageText: {
      name: "Language",
      defaultValue: "Language",
      control: { type: "text" }
    },
    detailsListContributorsText: {
      name: "Contributors",
      defaultValue: "Contributors",
      control: { type: "text" }
    },
    detailsListOriginalTitleText: {
      name: "Original title",
      defaultValue: "Original title",
      control: { type: "text" }
    },
    detailsListIsbnText: {
      name: "ISBN",
      defaultValue: "ISBN",
      control: { type: "text" }
    },

    detailsListScopeText: {
      name: "Scope",
      defaultValue: "Scope",
      control: { type: "text" }
    },
    detailsListPublisherText: {
      name: "Publisher",
      defaultValue: "Publisher",
      control: { type: "text" }
    },
    detailsListAudienceText: {
      name: "Audience",
      defaultValue: "Audience",
      control: { type: "text" }
    },
    detailsListGenreAndFormText: {
      name: "Genre and form",
      defaultValue: "Genre",
      control: { type: "text" }
    },
    detailsListFirstEditionYearText: {
      name: "First edition year",
      defaultValue: "first edition year",
      control: { type: "text" }
    },
    detailsListPlayTimeText: {
      name: "Play time",
      defaultValue: "Play time",
      control: { type: "text" }
    },
    detailsListEditionText: {
      name: "Edition",
      defaultValue: "Edition",
      control: { type: "text" }
    },
    detailsListAuthorsText: {
      name: "Authors",
      defaultValue: "Authors",
      control: { type: "text" }
    },
    editionText: {
      name: "Edition",
      defaultValue: "Edition",
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
    listenOnlineText: {
      name: "Listen online",
      defaultValue: "Listen online",
      control: { type: "text" }
    },
    cantReserveText: {
      name: "Can't be reserved",
      defaultValue: "Can't be reserved",
      control: { type: "text" }
    },
    notLivingInMunicipalityText: {
      name: "Not living in municipality",
      defaultValue:
        "You don't live in the municipality where this library is located.",
      control: { type: "text" }
    },
    blockedButtonText: {
      name: "Blocked button text",
      defaultValue: "User blocked",
      control: { type: "text" }
    },
    cantViewText: {
      name: "Can't be viewed",
      defaultValue: "Can't be viewed",
      control: { type: "text" }
    },
    goToText: {
      name: "Go to",
      defaultValue: "Go to @source",
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
        '{"type":"plural","text":["We have 1 copy of the material in stock. ","We have @count copies of the material in stock."]}',
      control: { type: "text" }
    },
    materialReservationInfoText: {
      name: "Material Reservation info text",
      defaultValue:
        '{"type":"plural","text":["1 copy has been reserved.","@count copies have been reserved."]}',
      control: { type: "text" }
    },
    onlineLimitMonthEbookInfoText: {
      name: "Online limit info text",
      defaultValue:
        "You have borrowed @count out of @limit possible e-books this month",
      control: { type: "text" }
    },
    onlineLimitMonthAudiobookInfoText: {
      name: "Online limit info text",
      defaultValue:
        "You have borrowed @count out of @limit possible audio-books this month",
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
    findOnShelfTableDescriptionText: {
      name: "Find on shelf table description",
      defaultValue: "Find @work on shelf in the @branch branch",
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
      defaultValue: "You are number @number in the queue.",
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
    modalReservationFormPickupLabelText: {
      name: "Modal reservation form pickup branch input label",
      defaultValue: "Change pickup location for your reservation.",
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
    modalReservationFormNoInterestAfterLabelText: {
      name: "Modal reservation form no interest after input label",
      defaultValue:
        "Change the amount of time after which you're no longer interested in this material.",
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
    },
    saveButtonText: {
      name: "Save button text",
      defaultValue: "Save",
      control: { type: "text" }
    },
    orderDigitalCopyModalScreenReaderModalDescriptionText: {
      name: "Order digital copy modal screen reader description",
      defaultValue: "Modal for Order digital copy",
      control: { type: "text" }
    },
    orderDigitalCopyModalCloseModalAriaLabelText: {
      name: "Close order digital copy modal",
      defaultValue: "Close Order digital copy modal",
      control: { type: "text" }
    },
    orderDigitalCopyTitleText: {
      name: "Order digital copy title text",
      defaultValue: "Order digital copy",
      control: { type: "text" }
    },
    orderDigitalCopyDescriptionText: {
      name: "Order digital copy description text",
      defaultValue:
        "You can order a digital copy of this material. The digital copy will be sent to your email address.",
      control: { type: "text" }
    },
    orderDigitalCopyButtonText: {
      name: "Order digital copy button text",
      defaultValue: "Order digital copy",
      control: { type: "text" }
    },
    orderDigitalCopyButtonLoadingText: {
      name: "Order digital copy button loading text",
      defaultValue: "Ordering digital copy",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackTitleText: {
      name: "Order digital copy feedback title",
      defaultValue: "Digital copy receipt",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorAgencyNotSubscribedText: {
      name: "Order digital copy agency not subscribed",
      defaultValue:
        "The agency is not subscribed to the service. You can order the digital copy by contacting the agency.",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorInvalidPickupBranchText: {
      name: "Order digital copy invalid pickup branch",
      defaultValue:
        "The pickup branch is not valid. You can order the digital copy by contacting the agency.",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorMissingClientConfigurationText: {
      name: "Order digital copy missing client configuration",
      defaultValue:
        "The client configuration is missing. You can order the digital copy by contacting the agency.",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorPidNotReservableText: {
      name: "Order digital copy pid not reservable",
      defaultValue:
        "The material is not reservable. You can order the digital copy by contacting the agency.",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorUnauthenticatedUserText: {
      name: "Order digital copy unauthenticated user",
      defaultValue:
        "You are not logged in. You can order the digital copy by contacting the agency.",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackOkText: {
      name: "Order digital copy success description text",
      defaultValue:
        "The digital copy has been ordered. You will receive an email when the digital copy is ready.",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackButtonText: {
      name: "Order digital copy success button text",
      defaultValue: "Close",
      control: { type: "text" }
    },
    orderDigitalCopyEmailLabelText: {
      name: "Order digital copy error email text",
      defaultValue: "Email",
      control: { type: "text" }
    },
    authUrl: {
      name: "Url where user can authenticate",
      defaultValue: "",
      control: { type: "text" }
    },
    materialIsAvailableInAnotherEditionText: {
      name: "Skip queue material is available in another edition",
      defaultValue:
        "Skip the queue - The material is available in another edition - @title @authorAndYear - reservations: @reservations",
      control: { type: "text" }
    },
    detailsListFirstEditionYearUnknownText: {
      name: "Unknown",
      defaultValue: "Unknown",
      control: { type: "text" }
    },
    addToFavoritesAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Add element to favorites list"
    },
    removeFromFavoritesAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue: "Remove element from favorites list"
    },
    firstAvailableEditionText: {
      name: "First available edition",
      defaultValue: "First available edition",
      control: { type: "text" }
    },
    filmAdaptationsText: {
      name: "Film adaptations text",
      defaultValue: "Film adaptations",
      control: { type: "text" }
    },
    alertErrorCloseText: {
      name: "Alert error close text",
      defaultValue: "close",
      control: { type: "text" }
    },
    alertErrorMessageText: {
      name: "Alert error message text",
      defaultValue: "An error occurred",
      control: { type: "text" }
    },
    expandMoreText: {
      name: "Expand more text",
      defaultValue: "Expand more",
      control: { type: "text" }
    },
    changeInterestPeriodText: {
      name: "Change interest period text",
      defaultValue: "Change interest period",
      control: { type: "text" }
    },
    changePickupLocationText: {
      name: "Change pickup location text",
      defaultValue: "Change pickup location",
      control: { type: "text" }
    },
    changeSmsNumberText: {
      name: "Change sms number text",
      defaultValue: "Change sms number",
      control: { type: "text" }
    },
    changeEmailText: {
      name: "Change email text",
      defaultValue: "Change email",
      control: { type: "text" }
    },
    screenReaderModalDescriptionInterestPeriodText: {
      name: "Screen reader modal description for interest period",
      defaultValue: "Change interest period modal",
      control: { type: "text" }
    },
    closeModalAriaLabelInterestPeriodText: {
      name: "Close modal aria-label interest period ",
      defaultValue: "Close interest period modal",
      control: { type: "text" }
    },
    screenReaderModalDescriptionPickupText: {
      name: "Screen reader modal description for pickup",
      defaultValue: "Change pickup location modal",
      control: { type: "text" }
    },
    closeModalAriaLabelPickupText: {
      name: "Close modal aria-label pickup",
      defaultValue: "Close pickup location modal",
      control: { type: "text" }
    },
    screenReaderModalDescriptionSmsText: {
      name: "Screen reader modal description for sms",
      defaultValue: "Change mobile number modal",
      control: { type: "text" }
    },
    closeModalAriaLabelSmsText: {
      name: "Close modal aria-label sms",
      defaultValue: "Close change mobile number modal",
      control: { type: "text" }
    },
    screenReaderModalDescriptionEmailText: {
      name: "Screen reader modal description for email",
      defaultValue: "Change email modal",
      control: { type: "text" }
    },
    closeModalAriaLabelEmailText: {
      name: "Close modal aria-label email",
      defaultValue: "Close change email modal",
      control: { type: "text" }
    },
    instantLoanTitleText: {
      name: "Instant loan title",
      control: { type: "text" },
      defaultValue: "Hent bogen nu"
    },
    instantLoanSubTitleText: {
      name: "Instant loan subtitle",
      control: { type: "text" },
      defaultValue: "Spring køen over og hent bogen nu på"
    },
    instantLoanUnderlineDescriptionText: {
      name: "Instant loan underline description",
      control: { type: "text" },
      defaultValue: "Bogen er tilgængelig på disse biblioteker nær dig"
    },
    instantLoanConfig: {
      name: "Instant loan config",
      control: { type: "text" },
      defaultValue:
        '{\n        "threshold": "1",\n        "matchString": "14 dages lån - bogligt (kan ikke reserveres)",\n        "enabled": "true"      }'
    },
    interestPeriodsConfig: {
      defaultValue:
        '[\n   {\n      "value":"30",\n      "label":"1 month"\n   },\n   {\n      "value":"60",\n      "label":"2 months"\n   },\n   {\n      "value":"90",\n      "label":"3 months"\n   },\n   {\n      "value":"180",\n      "label":"6 months"\n   },\n   {\n      "value":"360",\n      "label":"1 year"\n   }\n]',
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

export const HarryPotter = Template.bind({});
HarryPotter.args = {
  wid: "work-of:870970-basis:22629344"
};

export const TurenGårTilRom = Template.bind({});
TurenGårTilRom.args = {
  wid: "work-of:870970-basis:61991484"
};

export const Digital = Template.bind({});
Digital.args = {
  wid: "work-of:870971-tsart:34310815"
};

export const EBogPrinsenHarry = Template.bind({});
EBogPrinsenHarry.args = {
  wid: "work-of:870970-basis:54129807"
};

// Blue titles have don't have a reservation quota.
export const EBogBlaTitle = Template.bind({});
EBogBlaTitle.args = {
  wid: "work-of:870970-basis:52880831"
};

export const LangePeter = Template.bind({});
LangePeter.args = {
  wid: "work-of:870970-basis:01196669"
};

export const InstantLoan = Template.bind({});
InstantLoan.args = {
  wid: "work-of:870970-basis:134015012"
};

export const Dinosaurierfedern = Template.bind({});
Dinosaurierfedern.args = {
  wid: "work-of:870970-basis:44805421"
};
