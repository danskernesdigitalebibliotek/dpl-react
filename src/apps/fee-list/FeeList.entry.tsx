import React, { FC } from "react";
import withIsPatronBlockedHoc from "../../core/utils/withIsPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import FeeList from "./FeeList";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { withConfig } from "../../core/utils/config";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

export interface IntermedateListEntryConfigProps {
  expirationWarningDaysBeforeConfig: string;
}

export interface FeeListProps {
  alreadyPaidText: string;
  availablePaymentTypesUrl: string;
  emptyFeeListText: string;
  etAlText: string;
  feeCreatedText: string;
  feeDetailsModalScreenReaderText: string;
  feeDetailsModalCloseModalAriaLabelText: string;
  feeDetailsModalDescriptionText: string;
  feeListBodyText: string;
  feeListDaysText: string;
  feeListHeadlineText: string;
  feePaymentModalBodyText: string;
  feePaymentModalCancelText: string;
  feePaymentModalGotoText: string;
  feePaymentModalHeaderText: string;
  feePaymentModalNoticeText: string;
  iAcceptText: string;
  itemFeeAmountText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
  materialNumberText: string;
  otherMaterialsText: string;
  paymentOverviewUrl: string;
  payText: string;
  plusXOtherMaterialsText: string;
  termsOfTradeText: string;
  termsOfTradeUrl: string;
  totalFeeAmountText: string;
  totalText: string;
  turnedInText: string;
  unpaidFeesFirstHeadlineText: string;
  unpaidFeesSecondHeadlineText: string;
  viewFeesAndCompensationRatesText: string;
  viewFeesAndCompensationRatesUrl: string;
}

const FeeListEntry: FC<
  FeeListProps &
    BlockedPatronEntryTextProps &
    IntermedateListEntryConfigProps &
    GlobalEntryTextProps &
    GlobalUrlEntryPropsInterface
> = () => <FeeList />;

export default withUrls(
  withText(withIsPatronBlockedHoc(withConfig(FeeListEntry)))
);