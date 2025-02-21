import { UseTextFunction } from "../text";

export type PublizonErrorType = {
  code: number;
  message: string;
};

export const getPublizonErrorStatusText = (
  error: PublizonErrorType,
  t: UseTextFunction
): string => {
  const statusMessages: { [key: number]: string } = {
    105: `${t("publizonErrorStatusBookUnfortunatelyNotAvailableForLoanText")} (#105)`,
    114: `${t("publizonErrorStatusInvalidCardNumberPinText")} (#114)`,
    118: `${t("publizonErrorStatusAnUnexpectedErrorOccurredText")} (#118)`,
    120: `${t("publizonErrorStatusNumberOfSimultaneousLoansExceededText")} (#120)`,
    125: `${t("publizonErrorStatusMonthlyLoanLimitReachedText")} (#125)`,
    126: `${t("publizonErrorStatusMonthlyLoanLimitReachedText")} (#126)`,
    128: `${t("publizonErrorStatusBookIsNotAvailableForLoanText")} (#128)`,
    129: `${t("publizonErrorStatusBookCanOnlyBeRenewedOnceText")} (#129)`,
    130: `${t("publizonErrorStatusBookCanBeBorrowedAgainIn90DaysText")} (#130)`,
    131: `${t("publizonErrorStatusBookCannotBeBorrowedText")} (#131)`,
    133: `${t("publizonErrorStatusAnUnexpectedErrorOccurredText")} (#133)`,
    134: `${t("publizonErrorStatusCardTemporarilyBlockedText")} (#134)`,
    135: `${t("publizonErrorStatusBookCannotBeBorrowedText")} (#135)`,
    136: `${t("publizonErrorStatusBookCannotBeBorrowedText")} (#136)`,
    137: `${t("publizonErrorStatusYouCanReserveUpTo3TitlesText")} (#137)`,
    138: `${t("publizonErrorStatusAnUnexpectedErrorOccurredText")} (#138)`,
    139: `${t("publizonErrorStatusAnUnexpectedErrorOccurredText")} (#139)`,
    140: `${t("publizonErrorStatusTheBookIsAlreadyReservedText")} (#140)`,
    141: `${t("publizonErrorStatusInvalidEmailAddressText")} (#141)`,
    142: `${t("publizonErrorStatusInvalidPhoneNumberText")} (#142)`,
    143: `${t("publizonErrorStatusNumberOfSimultaneousBlueLoansExceededText")} (#143)`,
    144: `${t("publizonErrorStatusUnknownErrorAtLibraryText")} (#144)`,
    145: `${t("publizonErrorStatusLibraryServerNotRespondingText")} (#145)`,
    146: `${t("publizonErrorStatusNoAccessBecauseNotResidentText")} (#146)`,
    147: `${t("publizonErrorStatusNoCountryFoundWithGivenCountryCodeText")} (#147)`,
    148: `${t("publizonErrorStatusAnUnexpectedErrorOccurredText")} (#148)`
  };

  // Return the matching error text or a generic unknown error if code is missing
  return statusMessages[error.code] || t("publizonErrorStatusUnknownErrorText");
};
