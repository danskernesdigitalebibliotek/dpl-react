export const argTypes = {
  publizonErrorStatusBookUnfortunatelyNotAvailableForLoanText: {
    description: "Publizon error status book not available for loan text",
    control: { type: "text" }
  },
  publizonErrorStatusInvalidCardNumberPinText: {
    description: "Publizon error status invalid card number pin text",
    control: { type: "text" }
  },
  publizonErrorStatusAnUnexpectedErrorOccurredText: {
    description: "Publizon error status unexpected error text",
    control: { type: "text" }
  },
  publizonErrorStatusNumberOfSimultaneousLoansExceededText: {
    description:
      "Publizon error status number of simultaneous loans exceeded text",
    control: { type: "text" }
  },
  publizonErrorStatusMonthlyLoanLimitReachedText: {
    description: "Publizon error status monthly loan limit reached text",
    control: { type: "text" }
  },
  publizonErrorStatusBookIsNotAvailableForLoanText: {
    description: "Publizon error status book not available for loan text",
    control: { type: "text" }
  },
  publizonErrorStatusBookCanOnlyBeRenewedOnceText: {
    description: "Publizon error status book can only be renewed once text",
    control: { type: "text" }
  },
  publizonErrorStatusBookCanBeBorrowedAgainIn90DaysText: {
    description:
      "Publizon error status book can be borrowed again in 90 days text",
    control: { type: "text" }
  },
  publizonErrorStatusBookCannotBeBorrowedText: {
    description: "Publizon error status book cannot be borrowed text",
    control: { type: "text" }
  },
  publizonErrorStatusCardTemporarilyBlockedText: {
    description: "Publizon error status card temporarily blocked text",
    control: { type: "text" }
  },
  publizonErrorStatusYouCanReserveUpTo3TitlesText: {
    description: "Publizon error status reserve up to 3 titles text",
    control: { type: "text" }
  },
  publizonErrorStatusTheBookIsAlreadyReservedText: {
    description: "Publizon error status book is already reserved text",
    control: { type: "text" }
  },
  publizonErrorStatusInvalidEmailAddressText: {
    description: "Publizon error status invalid email address text",
    control: { type: "text" }
  },
  publizonErrorStatusInvalidPhoneNumberText: {
    description: "Publizon error status invalid phone number text",
    control: { type: "text" }
  },
  publizonErrorStatusNumberOfSimultaneousBlueLoansExceededText: {
    description:
      "Publizon error status number of simultaneous blue loans exceeded text",
    control: { type: "text" }
  },
  publizonErrorStatusUnknownErrorAtLibraryText: {
    description: "Publizon error status unknown error at library text",
    control: { type: "text" }
  },
  publizonErrorStatusLibraryServerNotRespondingText: {
    description: "Publizon error status library server not responding text",
    control: { type: "text" }
  },
  publizonErrorStatusNoAccessBecauseNotResidentText: {
    description: "Publizon error status no access because not resident text",
    control: { type: "text" }
  },
  publizonErrorStatusNoCountryFoundWithGivenCountryCodeText: {
    description:
      "Publizon error status no country found with given country code text",
    control: { type: "text" }
  },
  publizonErrorStatusUnknownErrorText: {
    description: "Publizon error status unknown error text",
    control: { type: "text" }
  }
};

export default {
  publizonErrorStatusBookUnfortunatelyNotAvailableForLoanText:
    "The book is unfortunately not available for loan",
  publizonErrorStatusInvalidCardNumberPinText:
    "Invalid card number and/or PIN code.",
  publizonErrorStatusAnUnexpectedErrorOccurredText:
    "An unexpected error occurred",
  publizonErrorStatusNumberOfSimultaneousLoansExceededText:
    "The number of simultaneous loans has been exceeded",
  publizonErrorStatusMonthlyLoanLimitReachedText:
    "Your library has reached the limit for the number of loans this month",
  publizonErrorStatusBookIsNotAvailableForLoanText:
    "The book is not available for loan",
  publizonErrorStatusBookCanOnlyBeRenewedOnceText:
    "The book can only be renewed once",
  publizonErrorStatusBookCanBeBorrowedAgainIn90DaysText:
    "The book can be borrowed again 90 days after the last loan expires",
  publizonErrorStatusBookCannotBeBorrowedText: "The book cannot be borrowed",
  publizonErrorStatusCardTemporarilyBlockedText:
    "The card is temporarily blocked due to too many failed login attempts. Try again in 2 hours.",
  publizonErrorStatusYouCanReserveUpTo3TitlesText:
    "You can reserve up to 3 titles",
  publizonErrorStatusTheBookIsAlreadyReservedText:
    "The book is already reserved",
  publizonErrorStatusInvalidEmailAddressText: "Invalid email address",
  publizonErrorStatusInvalidPhoneNumberText: "Invalid phone number",
  publizonErrorStatusNumberOfSimultaneousBlueLoansExceededText:
    "The number of simultaneous loans of blue titles has been exceeded",
  publizonErrorStatusUnknownErrorAtLibraryText:
    "Unknown error at the library – try logging in again later.",
  publizonErrorStatusLibraryServerNotRespondingText:
    "The library's server is not responding – try logging in again later.",
  publizonErrorStatusNoAccessBecauseNotResidentText:
    "You do not have access to publizon from this library as you are not registered as a resident in the municipality. Contact the library.",
  publizonErrorStatusNoCountryFoundWithGivenCountryCodeText:
    "No country could be found with the given country code",
  publizonErrorStatusUnknownErrorText: "Unknown error."
};

export interface PublizonErrorArgs {
  publizonErrorStatusBookUnfortunatelyNotAvailableForLoanText: string;
  publizonErrorStatusInvalidCardNumberPinText: string;
  publizonErrorStatusAnUnexpectedErrorOccurredText: string;
  publizonErrorStatusNumberOfSimultaneousLoansExceededText: string;
  publizonErrorStatusMonthlyLoanLimitReachedText: string;
  publizonErrorStatusBookIsNotAvailableForLoanText: string;
  publizonErrorStatusBookCanOnlyBeRenewedOnceText: string;
  publizonErrorStatusBookCanBeBorrowedAgainIn90DaysText: string;
  publizonErrorStatusBookCannotBeBorrowedText: string;
  publizonErrorStatusCardTemporarilyBlockedText: string;
  publizonErrorStatusYouCanReserveUpTo3TitlesText: string;
  publizonErrorStatusTheBookIsAlreadyReservedText: string;
  publizonErrorStatusInvalidEmailAddressText: string;
  publizonErrorStatusInvalidPhoneNumberText: string;
  publizonErrorStatusNumberOfSimultaneousBlueLoansExceededText: string;
  publizonErrorStatusUnknownErrorAtLibraryText: string;
  publizonErrorStatusLibraryServerNotRespondingText: string;
  publizonErrorStatusNoAccessBecauseNotResidentText: string;
  publizonErrorStatusNoCountryFoundWithGivenCountryCodeText: string;
  publizonErrorStatusUnknownErrorText: string;
}
