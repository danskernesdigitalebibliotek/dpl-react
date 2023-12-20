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
  totalFeeAmountText: string;
  otherMaterialsText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  feeListDaysText: string;
  payText: string;
  totalText: string;
  iAcceptText: string;
  termsOfTradeText: string;
  termsOfTradeUrl: string;
  feeListHeadlineText: string;
  feeListBodyText: string;
  viewFeesAndCompensationRatesText: string;
  etAlText: string;
  viewFeesAndCompensationRatesUrl: string;
  unpaidFeesFirstHeadlineText: string;
  unpaidFeesSecondHeadlineText: string;
  alreadyPaidText: string;
  feePaymentModalHeaderText: string;
  feePaymentModalBodyText: string;
  feePaymentModalNoticeText: string;
  feePaymentModalGotoText: string;
  feePaymentModalCancelText: string;
  feeDetailsModalScreenReaderText: string;
  emptyFeeListText: string;
  turnedInText: string;
  plusXOtherMaterialsText: string;
  itemFeeAmountText: string;
  feeCreatedText: string;
  availablePaymentTypesUrl: string;
  paymentOverviewUrl: string;
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
