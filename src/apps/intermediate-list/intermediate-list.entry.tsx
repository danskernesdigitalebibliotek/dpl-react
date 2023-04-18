import React, { FC } from "react";
import withIsPatronBlockedHoc from "../../core/utils/withIsPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import IntermedateList from "./intermediate-list";

export interface IntermedateListEntryConfigProps {
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  thresholdConfig: string;
}

export interface IntermedateListProps {
  totalFeeAmountText: string;
  otherMaterialsText: string;
  materialByAuthorText: string;
  feeListDaysText: string;
  payText: string;
  totalText: string;
  iAcceptText: string;
  termsOfTradeText: string;
  termsOfTradeUrl: string;
  feeListHeadlineText: string;
  feeListBodyText: string;
  viewFeesAndCompensationRatesText: string;
  materialAndAuthorText: string;
  viewFeesAndCompensationRatesUrl: string;
  unpaidFeesText: string;
  prePaymentTypeChangeDateText: string;
  postPaymentTypeChangeDateText: string;
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

const IntermedateListEntry: FC<
  IntermedateListProps &
    BlockedPatronEntryTextProps &
    IntermedateListEntryConfigProps
> = () => <IntermedateList />;

export default withUrls(withText(withIsPatronBlockedHoc(IntermedateListEntry)));
