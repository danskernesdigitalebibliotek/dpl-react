import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import MaterialEntry from "./material.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof MaterialEntry> = {
  title: "Apps / Material",
  component: MaterialEntry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    searchUrl: {
      description: "Path to the search result page",
      control: { type: "text" }
    },
    materialUrl: {
      description: "Path to the material page",
      control: { type: "text" }
    },
    wid: {
      description: "Work ID",
      control: { type: "text" }
    },
    smsNotificationsForReservationsEnabledConfig: {
      description: "SMS notifications for reservations is enabled",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      description: "Blacklisted Pickup branches",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      description: "Blacklisted Availability branches",
      control: { type: "text" }
    },
    blacklistedInstantLoanBranchesConfig: {
      description: "Blacklisted Instant Loan branches",
      control: { type: "text" }
    },
    branchesConfig: {
      description: "Branches",
      control: { type: "text" }
    },
    materialHeaderAllEditionsText: {
      description: "Text for the fiction edition text",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      description: "By (author)",
      control: { type: "text" }
    },
    periodicalSelectYearText: {
      description: "Year",
      control: { type: "text" }
    },
    periodicalSelectEditionText: {
      description: "Edition/Week",
      control: { type: "text" }
    },
    reserveBookText: {
      description: "Reserve",
      control: { type: "text" }
    },
    reserveText: {
      description: "Reserve",
      control: { type: "text" }
    },
    reserveWithMaterialTypeText: {
      description: "Reserve",
      control: { type: "text" }
    },
    reservableFromAnotherLibraryText: {
      description: "Reservable on another library",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      description: "Find on bookshelf",
      control: { type: "text" }
    },
    descriptionHeadlineText: {
      description: "Description headline",
      control: { type: "text" }
    },
    identifierText: {
      description: "Identifier/topic text",
      control: { type: "text" }
    },
    inSameSeriesText: {
      description: "In same series as",
      control: { type: "text" }
    },
    numberDescriptionText: {
      description: "Number",
      control: { type: "text" }
    },
    subjectNumberText: {
      description: "Subject number (Emnetal)",
      control: { type: "text" }
    },
    inSeriesText: {
      description: "In series",
      control: { type: "text" }
    },
    loginToSeeReviewText: {
      description: "Login to see Review",
      control: { type: "text" }
    },
    cantViewReviewText: {
      description: "Cannot view Review",
      control: { type: "text" }
    },
    ratingIsText: {
      description: "Rating is",
      control: { type: "text" }
    },
    outOfText: {
      description: "X 'out of' Y",
      control: { type: "text" }
    },
    detailsOfTheMaterialText: {
      description: "Details of the material",
      control: { type: "text" }
    },
    editionsText: {
      description: "Editions",
      control: { type: "text" }
    },
    fictionNonfictionText: {
      description: "Fiction Nonfiction",
      control: { type: "text" }
    },
    detailsText: {
      description: "Details",
      control: { type: "text" }
    },
    reviewsText: {
      description: "Reviews",
      control: { type: "text" }
    },
    detailsListTypeText: {
      description: "Type",
      control: { type: "text" }
    },
    detailsListLanguageText: {
      description: "Language",
      control: { type: "text" }
    },
    detailsListContributorsText: {
      description: "Contributors",
      control: { type: "text" }
    },
    detailsListOriginalTitleText: {
      description: "Original title",
      control: { type: "text" }
    },
    detailsListIsbnText: {
      description: "ISBN",
      control: { type: "text" }
    },
    detailsListScopeText: {
      description: "Scope",
      control: { type: "text" }
    },
    detailsListPublisherText: {
      description: "Publisher",
      control: { type: "text" }
    },
    detailsListAudienceText: {
      description: "Audience",
      control: { type: "text" }
    },
    detailsListAgeRangeText: {
      description: "Age range",
      control: { type: "text" }
    },
    detailsListGenreAndFormText: {
      description: "Genre and form",
      control: { type: "text" }
    },
    detailsListFirstEditionYearText: {
      description: "First edition year",
      control: { type: "text" }
    },
    detailsListPlayTimeText: {
      description: "Play time",
      control: { type: "text" }
    },
    detailsListEditionText: {
      description: "Edition",
      control: { type: "text" }
    },
    detailsListAuthorsText: {
      description: "Authors",
      control: { type: "text" }
    },
    detailsListNotesText: {
      description: "Notes",
      control: { type: "text" }
    },
    detailsListPhysicalDescriptionText: {
      description: "Dimensions",
      control: { type: "text" }
    },
    detailsListHostPublicationText: {
      description: "Host Publication",
      control: { type: "text" }
    },
    detailsListSourceText: {
      description: "Source",
      control: { type: "text" }
    },
    detailsListPartsText: {
      description: "Contents",
      control: { type: "text" }
    },
    editionText: {
      description: "Edition",
      control: { type: "text" }
    },
    readArticleText: {
      description: "Read article",
      control: { type: "text" }
    },
    loadingText: {
      description: "Loading",
      control: { type: "text" }
    },
    getOnlineText: {
      description: "Get online",
      control: { type: "text" }
    },
    seeOnlineText: {
      description: "See online",
      control: { type: "text" }
    },
    listenOnlineText: {
      description: "Listen online",
      control: { type: "text" }
    },
    cantReserveText: {
      description: "Can't be reserved",
      control: { type: "text" }
    },
    notLivingInMunicipalityText: {
      description: "Not living in municipality",
      control: { type: "text" }
    },
    blockedButtonText: {
      description: "Blocked button text",
      control: { type: "text" }
    },
    cantViewText: {
      description: "Can't be viewed",
      control: { type: "text" }
    },
    goToText: {
      description: "Go to",
      control: { type: "text" }
    },
    materialIsLoanedOutText: {
      description: "Material is loaned out",
      control: { type: "text" }
    },
    materialIsIncludedText: {
      description: "Material is included",
      control: { type: "text" }
    },
    materialsInStockInfoText: {
      description: "Materials in stock info text",
      control: { type: "text" }
    },
    materialReservationInfoText: {
      description: "Material Reservation info text",
      control: { type: "text" }
    },
    onlineLimitMonthEbookInfoText: {
      description: "Online limit info text",
      control: { type: "text" }
    },
    onlineLimitMonthAudiobookInfoText: {
      description: "Online limit info text",
      control: { type: "text" }
    },
    approveReservationText: {
      description: "Approve reservation",
      control: { type: "text" }
    },
    shiftText: {
      description: "Change",
      control: { type: "text" }
    },
    reservationDetailsPickUpAtTitleText: {
      description: "Pick up at",
      control: { type: "text" }
    },
    receiveSmsWhenMaterialReadyText: {
      description: "You will receive an SMS when the material is ready",
      control: { type: "text" }
    },
    receiveEmailWhenMaterialReadyText: {
      description: "Receive mail when the material is ready",
      control: { type: "text" }
    },
    reservationDetailsNoInterestAfterTitleText: {
      description: "Have no interest after",
      control: { type: "text" }
    },
    daysText: {
      description: "Days",
      control: { type: "text" }
    },
    reservationSuccesTitleText: {
      description: "Reservation Success title",
      control: { type: "text" }
    },
    reservationSuccesIsReservedForYouText: {
      description: "Reservation Success Title",
      control: { type: "text" }
    },
    reservationSuccessPreferredPickupBranchText: {
      description: "Reservation Preferred pickup branch",
      control: { type: "text" }
    },
    reservationErrorsTitleText: {
      description: "Reservation Error title",
      control: { type: "text" }
    },
    reservationErrorsDescriptionText: {
      description: "Reservation Error description",
      control: { type: "text" }
    },
    tryAginButtonText: {
      description: "Try again button text",
      control: { type: "text" }
    },
    okButtonText: {
      description: "Ok button text",
      control: { type: "text" }
    },
    missingDataText: {
      description: "Missing data text",
      control: { type: "text" }
    },
    reservationModalScreenReaderModalDescriptionText: {
      description: "Reservation modal screen reader description",
      control: { type: "text" }
    },
    reservationModalCloseModalAriaLabelText: {
      description: "Close Reservation modal",
      control: { type: "text" }
    },
    librariesHaveTheMaterialText: {
      description: "Libraries have the material",
      control: { type: "text" }
    },
    findOnShelfModalScreenReaderModalDescriptionText: {
      description: "Reservation modal screen reader description",
      control: { type: "text" }
    },
    findOnShelfModalCloseModalAriaLabelText: {
      description: "Close findOnShelf modal",
      control: { type: "text" }
    },
    findOnShelfTableDescriptionText: {
      description: "Find on shelf table description",
      control: { type: "text" }
    },
    findOnShelfModalListMaterialText: {
      description: "Material",
      control: { type: "text" }
    },
    findOnShelfModalListFindOnShelfText: {
      description: "Find it on shelf",
      control: { type: "text" }
    },
    findOnShelfModalListItemCountText: {
      description: "Home",
      control: { type: "text" }
    },
    findOnShelfModalNoLocationSpecifiedText: {
      description: "No location for find on shelf specified",
      control: { type: "text" }
    },
    findOnShelfModalPeriodicalYearDropdownText: {
      description: "Find on shelf modal periodical dropdown - choose year",
      control: { type: "text" }
    },
    findOnShelfModalPeriodicalEditionDropdownText: {
      description:
        "Find on shelf modal periodical dropdown - choose edition/volume",
      control: { type: "text" }
    },
    numberInQueueText: {
      description: "Number in queue text",
      control: { type: "text" }
    },
    alreadyReservedText: {
      description: "Already reserved text",
      control: { type: "text" }
    },
    closeText: {
      description: "Close text",
      control: { type: "text" }
    },
    modalReservationFormEmailHeaderTitleText: {
      description: "Modal reservation form email header title",
      control: { type: "text" }
    },
    modalReservationFormEmailHeaderDescriptionText: {
      description: "Modal reservation form email header description",
      control: { type: "text" }
    },
    modalReservationFormEmailInputFieldLabelText: {
      description: "Modal reservation form email input field label",
      control: { type: "text" }
    },
    modalReservationFormEmailInputFieldDescriptionText: {
      description: "Modal reservation form email input field description",
      control: { type: "text" }
    },
    modalReservationFormSmsHeaderTitleText: {
      description: "Modal reservation form sms header title",
      control: { type: "text" }
    },
    modalReservationFormSmsHeaderDescriptionText: {
      description: "Modal reservation form sms header description",
      control: { type: "text" }
    },
    modalReservationFormSmsInputFieldLabelText: {
      description: "Modal reservation form sms input field label",
      control: { type: "text" }
    },
    modalReservationFormSmsInputFieldDescriptionText: {
      description: "Modal reservation form sms input field description",
      control: { type: "text" }
    },
    etAlText: {
      description: "Et al. Text",
      control: { type: "text" }
    },
    modalReservationFormPickupHeaderTitleText: {
      description: "Modal reservation form pickup header title",
      control: { type: "text" }
    },
    modalReservationFormPickupHeaderDescriptionText: {
      description: "Modal reservation form pickup header description",
      control: { type: "text" }
    },
    chooseOneText: {
      description: "Choose one text",
      control: { type: "text" }
    },
    infomediaModalScreenReaderModalDescriptionText: {
      description: "Infomedia modal screen reader description",
      control: { type: "text" }
    },
    infomediaModalCloseModalAriaLabelText: {
      description: "Close infomedia modal",
      control: { type: "text" }
    },
    saveButtonText: {
      description: "Save button text",
      control: { type: "text" }
    },
    orderDigitalCopyModalScreenReaderModalDescriptionText: {
      description: "Order digital copy modal screen reader description",
      control: { type: "text" }
    },
    orderDigitalCopyModalCloseModalAriaLabelText: {
      description: "Close order digital copy modal",
      control: { type: "text" }
    },
    orderDigitalCopyTitleText: {
      description: "Order digital copy title text",
      control: { type: "text" }
    },
    orderDigitalCopyDescriptionText: {
      description: "Order digital copy description text",
      control: { type: "text" }
    },
    orderDigitalCopyButtonText: {
      description: "Order digital copy button text",
      control: { type: "text" }
    },
    orderDigitalCopyButtonLoadingText: {
      description: "Order digital copy button loading text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackTitleText: {
      description: "Order digital copy feedback title",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorAgencyNotSubscribedText: {
      description: "Order digital copy agency not subscribed",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorInvalidPickupBranchText: {
      description: "Order digital copy invalid pickup branch",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorMissingClientConfigurationText: {
      description: "Order digital copy missing client configuration",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorPidNotReservableText: {
      description: "Order digital copy pid not reservable",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorUnauthenticatedUserText: {
      description: "Order digital copy unauthenticated user",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackOkText: {
      description: "Order digital copy success description text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackButtonText: {
      description: "Order digital copy success button text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackBorchkUserBlockedByAgencyText: {
      description: "Borchk user blocked by agency text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackBorchkUserNotVerifiedText: {
      description: "Borchk user not verified text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackBorchkUserNoLongerExistOnAgencyText: {
      description: "Borchk user no longer exists on agency text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorMunicipalityagencyidNotFoundText: {
      description: "Error municipality agency ID not found text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackUnknownUserText: {
      description: "Unknown user text",
      control: { type: "text" }
    },
    orderDigitalCopyEmailLabelText: {
      description: "Order digital copy error email text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackErrorMissingMunicipalityagencyidText: {
      description: "Error missing municipality agency ID text",
      control: { type: "text" }
    },
    orderDigitalCopyFeedbackInternalErrorText: {
      description: "Internal error text",
      control: { type: "text" }
    },
    authUrl: {
      description: "Url where user can authenticate",
      control: { type: "text" }
    },
    materialIsAvailableInAnotherEditionText: {
      description: "Skip queue material is available in another edition",
      control: { type: "text" }
    },
    detailsListFirstEditionYearUnknownText: {
      description: "Unknown",
      control: { type: "text" }
    },
    firstAvailableEditionText: {
      description: "First available edition",
      control: { type: "text" }
    },
    filmAdaptationsText: {
      description: "Film adaptations text",
      control: { type: "text" }
    },
    expandMoreText: {
      description: "Expand more text",
      control: { type: "text" }
    },
    changeSmsNumberText: {
      description: "Change sms number text",
      control: { type: "text" }
    },
    changeEmailText: {
      description: "Change email text",
      control: { type: "text" }
    },
    instantLoanTitleText: {
      description: "Instant loan title",
      control: { type: "text" }
    },
    instantLoanSubTitleText: {
      description: "Instant loan subtitle",
      control: { type: "text" }
    },
    instantLoanUnderlineDescriptionText: {
      description: "Instant loan underline description",
      control: { type: "text" }
    },
    instantLoanConfig: {
      description: "Instant loan config",
      control: { type: "text" }
    },
    interestPeriodsConfig: {
      control: { type: "text" }
    },
    openOrderResponseTitleText: {
      description: "Reservation Success title",
      control: { type: "text" }
    },
    openOrderAuthenticationErrorText: {
      description: "Open order authentication error text",
      control: { type: "text" }
    },
    openOrderUserBlockedByAgencyText: {
      description: "Open order user blocked by agency text",
      control: { type: "text" }
    },
    openOrderUserNotVerifiedText: {
      description: "Open order user not verified text",
      control: { type: "text" }
    },
    openOrderUserNoLongerExistOnAgencyText: {
      description: "Open order user no longer exists on agency text",
      control: { type: "text" }
    },
    openOrderInvalidOrderText: {
      description: "Open order invalid order text",
      control: { type: "text" }
    },
    openOrderNotOwnedIllLocText: {
      description: "Open order item localized for ILL text",
      control: { type: "text" }
    },
    openOrderNotOwnedNoIllLocText: {
      description: "Open order item not localized for ILL text",
      control: { type: "text" }
    },
    openOrderNotOwnedWrongIllMediumtypeText: {
      description: "Open order wrong ILL medium type text",
      control: { type: "text" }
    },
    openOrderNoServicerequesterText: {
      description: "Open order no service requester text",
      control: { type: "text" }
    },
    openOrderOrsErrorText: {
      description: "Open order ORS error text",
      control: { type: "text" }
    },
    openOrderStatusOwnedAcceptedText: {
      description: "Open order status owned accepted text",
      control: { type: "text" }
    },
    openOrderOwnedOwnCatalogueText: {
      description: "Open order available in own catalogue text",
      control: { type: "text" }
    },
    openOrderOwnedWrongMediumtypeText: {
      description: "Open order wrong medium type for available item text",
      control: { type: "text" }
    },
    openOrderServiceUnavailableText: {
      description: "Open order service unavailable text",
      control: { type: "text" }
    },
    openOrderUnknownErrorText: {
      description: "Open order unknown error text",
      control: { type: "text" }
    },
    openOrderUnknownPickupagencyText: {
      description: "Open order unknown pickup agency text",
      control: { type: "text" }
    },
    openOrderUnknownUserText: {
      description: "Open order unknown user text",
      control: { type: "text" }
    },
    openOrderErrorMissingPincodeText: {
      description: "Open order error missing pincode text",
      control: { type: "text" }
    }
  },
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    searchUrl: "/search",
    materialUrl: "/work/:workid",
    wid: "work-of:870970-basis:52557240",
    smsNotificationsForReservationsEnabledConfig: "1",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024,DK-775164",
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024,DK-775164",
    blacklistedInstantLoanBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024,DK-775164",
    branchesConfig:
      '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
    materialHeaderAllEditionsText: "All editions",
    materialHeaderAuthorByText: "By",
    periodicalSelectYearText: "Year",
    periodicalSelectEditionText: "Edition",
    reserveBookText: "Reserve book",
    reserveText: "Reserve",
    reserveWithMaterialTypeText: "Reserve @materialType",
    reservableFromAnotherLibraryText: "Ordered from another library.",
    findOnBookshelfText: "Find on shelf",
    descriptionHeadlineText: "Description",
    identifierText: "Tags",
    inSameSeriesText: "In the same series",
    numberDescriptionText: "Nr.",
    subjectNumberText: "Emnetal",
    inSeriesText: "in series",
    loginToSeeReviewText: "Login to see the review.",
    cantViewReviewText: "Cannot view the review.",
    ratingIsText:
      "Rating of this item is @heartCount out of @numberOfHeartsPossible hearts",
    outOfText: "out of",
    detailsOfTheMaterialText: "Details about the material",
    editionsText: "Editions",
    fictionNonfictionText: "Fictional",
    detailsText: "Details",
    reviewsText: "Reviews",
    detailsListTypeText: "Type",
    detailsListLanguageText: "Language",
    detailsListContributorsText: "Contributors",
    detailsListOriginalTitleText: "Original title",
    detailsListIsbnText: "ISBN",
    detailsListScopeText: "Scope",
    detailsListPublisherText: "Publisher",
    detailsListAudienceText: "Audience",
    detailsListAgeRangeText: "for @ageRange year olds",
    detailsListGenreAndFormText: "Genre",
    detailsListFirstEditionYearText: "first edition year",
    detailsListPlayTimeText: "Play time",
    detailsListEditionText: "Edition",
    detailsListAuthorsText: "Authors",
    detailsListNotesText: "Notes",
    detailsListPhysicalDescriptionText: "Dimensions",
    detailsListHostPublicationText: "Host Publication",
    detailsListSourceText: "Source",
    detailsListPartsText: "Contents",
    editionText: "Edition",
    readArticleText: "Read article",
    loadingText: "Loading",
    getOnlineText: "Get online",
    seeOnlineText: "See online",
    listenOnlineText: "Listen online",
    cantReserveText: "Can't be reserved",
    notLivingInMunicipalityText:
      "You don't live in the municipality where this library is located.",
    blockedButtonText: "User blocked",
    cantViewText: "Can't be viewed",
    goToText: "Go to @source",
    materialIsLoanedOutText: "Material is loaned out",
    materialIsIncludedText:
      "This material doesn't count towards your loan quota",
    materialsInStockInfoText:
      '{"type":"plural","text":["We have 1 copy of the material in stock. ","We have @count copies of the material in stock."]}',
    materialReservationInfoText:
      '{"type":"plural","text":["1 copy has been reserved.","@count copies have been reserved."]}',
    onlineLimitMonthEbookInfoText:
      "You have borrowed @count out of @limit possible e-books this month",
    onlineLimitMonthAudiobookInfoText:
      "You have borrowed @count out of @limit possible audio-books this month",
    approveReservationText: "Approve reservation",
    shiftText: "Change",
    reservationDetailsPickUpAtTitleText: "Pick up at",
    receiveSmsWhenMaterialReadyText:
      "You will receive an SMS when the material is ready",
    receiveEmailWhenMaterialReadyText:
      "You will receive an email when the material is ready",
    reservationDetailsNoInterestAfterTitleText: "Have no interest after",
    daysText: "Days",
    reservationSuccesTitleText: "Material is available and reserved for you!",
    reservationSuccesIsReservedForYouText: "is reserved for you",
    reservationSuccessPreferredPickupBranchText:
      "Material is available and you will get a message when it is ready for pickup - pickup at @branch",
    reservationErrorsTitleText: "Failed to reserve the material",
    reservationErrorsDescriptionText:
      "We're sorry. Unfortunately, there has been an error. Try again, please.",
    tryAginButtonText: "Try again",
    okButtonText: "Ok",
    missingDataText: "Missing data",
    reservationModalScreenReaderModalDescriptionText: "Modal for reservation",
    reservationModalCloseModalAriaLabelText: "Close reservation modal",
    librariesHaveTheMaterialText: "libraries have material",
    findOnShelfModalScreenReaderModalDescriptionText: "Modal for reservation",
    findOnShelfModalCloseModalAriaLabelText: "Close reservation modal",
    findOnShelfTableDescriptionText:
      "Find @work on shelf in the @branch branch",
    findOnShelfModalListMaterialText: "Material",
    findOnShelfModalListFindOnShelfText: "Find it on shelf",
    findOnShelfModalListItemCountText: "home",
    findOnShelfModalNoLocationSpecifiedText: "-",
    findOnShelfModalPeriodicalYearDropdownText: "Choose periodical year",
    findOnShelfModalPeriodicalEditionDropdownText: "Choose periodical edition",
    numberInQueueText: "You are number @number in the queue.",
    alreadyReservedText: "You already reserved this material",
    closeText: "Close",
    modalReservationFormEmailHeaderTitleText: "Change email",
    modalReservationFormEmailHeaderDescriptionText:
      "If you wish to receive notification emails you can add or change your email address here.",
    modalReservationFormEmailInputFieldLabelText: "Email",
    modalReservationFormEmailInputFieldDescriptionText: "Add email",
    modalReservationFormSmsHeaderTitleText: "Change phone number",
    modalReservationFormSmsHeaderDescriptionText:
      "If you wish to receive notification sms you can add or change your phone number here.",
    modalReservationFormSmsInputFieldLabelText: "Phone number",
    modalReservationFormSmsInputFieldDescriptionText: "Phone number",
    etAlText: "et al.",
    modalReservationFormPickupHeaderTitleText: "Change pick-up location",
    modalReservationFormPickupHeaderDescriptionText:
      "If you wish to change the pick-up location for your reservation, you can do it here.",
    chooseOneText: "Choose one",
    infomediaModalScreenReaderModalDescriptionText: "Modal for infomedia",
    infomediaModalCloseModalAriaLabelText: "Close infomedia modal",
    saveButtonText: "Save",
    orderDigitalCopyModalScreenReaderModalDescriptionText:
      "Modal for Order digital copy",
    orderDigitalCopyModalCloseModalAriaLabelText:
      "Close Order digital copy modal",
    orderDigitalCopyTitleText: "Order digital copy",
    orderDigitalCopyDescriptionText:
      "You can order a digital copy of this material. The digital copy will be sent to your email address.",
    orderDigitalCopyButtonText: "Order digital copy",
    orderDigitalCopyButtonLoadingText: "Ordering digital copy",
    orderDigitalCopyFeedbackTitleText: "Digital copy receipt",
    orderDigitalCopyFeedbackErrorAgencyNotSubscribedText:
      "The agency is not subscribed to the service. You can order the digital copy by contacting the agency.",
    orderDigitalCopyFeedbackErrorInvalidPickupBranchText:
      "The pickup branch is not valid. You can order the digital copy by contacting the agency.",
    orderDigitalCopyFeedbackErrorMissingClientConfigurationText:
      "The client configuration is missing. You can order the digital copy by contacting the agency.",
    orderDigitalCopyFeedbackErrorPidNotReservableText:
      "The material is not reservable. You can order the digital copy by contacting the agency.",
    orderDigitalCopyFeedbackErrorUnauthenticatedUserText:
      "You are not logged in. You can order the digital copy by contacting the agency.",
    orderDigitalCopyFeedbackOkText:
      "The digital copy has been ordered. You will receive an email when the digital copy is ready.",
    orderDigitalCopyFeedbackButtonText: "Close",
    orderDigitalCopyFeedbackBorchkUserBlockedByAgencyText:
      "Borchk user blocked by agency",
    orderDigitalCopyFeedbackBorchkUserNotVerifiedText:
      "Borchk user not verified",
    orderDigitalCopyFeedbackBorchkUserNoLongerExistOnAgencyText:
      "Borchk user no longer exists on agency",
    orderDigitalCopyFeedbackErrorMunicipalityagencyidNotFoundText:
      "Error municipality agency ID not found",
    orderDigitalCopyFeedbackUnknownUserText: "Unknown user",
    orderDigitalCopyEmailLabelText: "Email",
    orderDigitalCopyFeedbackErrorMissingMunicipalityagencyidText:
      "Error missing municipality agency ID",
    orderDigitalCopyFeedbackInternalErrorText: "Internal error",
    authUrl: "",
    materialIsAvailableInAnotherEditionText:
      "Skip the queue - The material is available in another edition - @title @authorAndYear - reservations: @reservations",
    detailsListFirstEditionYearUnknownText: "Unknown",
    firstAvailableEditionText: "First available edition",
    filmAdaptationsText: "Film adaptations",
    expandMoreText: "Expand more",
    changeSmsNumberText: "Change sms number",
    changeEmailText: "Change email",
    instantLoanTitleText: "Hent bogen nu",
    instantLoanSubTitleText: "Spring køen over og hent bogen nu på",
    instantLoanUnderlineDescriptionText:
      "Bogen er tilgængelig på disse biblioteker nær dig",
    instantLoanConfig:
      '{ "threshold": "1", "matchStrings": ["Standard"], "enabled": "true" }',
    interestPeriodsConfig:
      '{ "interestPeriods":[ { "value":14, "label":"14 days" }, { "value":30, "label":"1 month" }, { "value":60, "label":"2 months" }, { "value":90, "label":"3 months" }, { "value":180, "label":"6 months" }, { "value":365, "label":"1 year" } ], "defaultInterestPeriod":{ "value":"14", "label":"14 days" } }',
    openOrderResponseTitleText: "Order from another library:",
    openOrderAuthenticationErrorText: "Authentication error occurred",
    openOrderUserBlockedByAgencyText: "You are blocked by the agency",
    openOrderUserNotVerifiedText: "User could not be verified",
    openOrderUserNoLongerExistOnAgencyText:
      "User no longer exists at the specified agency",
    openOrderInvalidOrderText: "Your order is invalid",
    openOrderNotOwnedIllLocText:
      "Your material has been ordered from another library",
    openOrderNotOwnedNoIllLocText:
      "Item not available and not localized for ILL",
    openOrderNotOwnedWrongIllMediumtypeText:
      "Item not available, ILL of this medium type not accepted",
    openOrderNoServicerequesterText: "Service requester is obligatory",
    openOrderOrsErrorText: "Error occurred while sending order to ORS",
    openOrderStatusOwnedAcceptedText: "Your order is accepted",
    openOrderOwnedOwnCatalogueText:
      "Item available, order through the library's catalogue",
    openOrderOwnedWrongMediumtypeText:
      "Item available but medium type not accepted",
    openOrderServiceUnavailableText: "Service is currently unavailable",
    openOrderUnknownErrorText: "An unknown error occurred",
    openOrderUnknownPickupagencyText: "Specified pickup agency not found",
    openOrderUnknownUserText: "User not found",
    openOrderErrorMissingPincodeText: "Missing pincode"
  }
};

export default meta;

type Story = StoryObj<typeof MaterialEntry>;

export const Default: Story = {};

export const Periodical: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:06373674"
  }
};

export const Infomedia: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870971-avis:35731733"
  }
};

export const HarryPotter: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:22629344"
  }
};

export const TurenGarTilRom: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:61991484"
  }
};

export const Digital: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870971-tsart:34310815"
  }
};

export const EBogPrinsenHarry: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:54129807"
  }
};

export const EBogBlaTitle: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:52880831"
  }
};

export const LangePeter: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:01196669"
  }
};

export const InstantLoan: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:134015012"
  }
};

export const Dinosaurierfedern: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:44805421"
  }
};

export const Underverden: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:52886619"
  }
};

export const OverbygningsMatriale: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:44926407"
  }
};

export const GlobalMaterial: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:07185995"
  }
};

export const OnlyOneEdition: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:52796202"
  }
};

export const DigitalArticle: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870971-tsart:36297484"
  }
};

export const irregularFaustId1InLargeSameSeries: Story = {
  args: {
    ...Default.args,
    wid: "work-of:150086-netmusik:BIS-2067"
  }
};

export const irregularFaustId2fairytale: Story = {
  args: {
    ...Default.args,
    wid: "work-of:800010-katalog:99122572002205763__1"
  }
};

export const irregularFaustId3NaxosMysicLibrary: Story = {
  args: {
    ...Default.args,
    wid: "work-of:150086-netmusik:8.660345-46"
  }
};

export const Journal: Story = {
  args: {
    ...Default.args,
    wid: "work-of:870970-basis:01007556"
  }
};
