import React, { FC } from "react";
import isPatronBlockedHoc from "../../components/blocked-patron/isPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import IntermedateList from "./intermediate-list";

export interface IntermedateListProps {
  totalFeeAmountText: string;
  otherMaterialsText: string;
  materialByAuthorText: string;
  intermediateListDaysText: string;
  payText: string;
  totalText: string;
  iAcceptText: string;
  termsOfTradeText: string;
  termsOfTradeUrl: string;
  intermediateListHeadlineText: string;
  intermediateListBodyText: string;
  viewFeesAndCompensationRatesText: string;
  materialAndAuthorText: string;
  viewFeesAndCompensationRatesUrl: string;
  unpaidFeesText: string;
  prePaymentTypeChangeDateText: string;
  postPaymentTypeChangeDateText: string;
  alreadyPaidText: string;
  intermediatePaymentModalHeaderText: string;
  intermediatePaymentModalBodyText: string;
  intermediatePaymentModalNoticeText: string;
  intermediatePaymentModalGotoText: string;
  intermediatePaymentModalCancelText: string;
  feeDetailsModalScreenReaderText: string;
  emptyIntermediateListText: string;
  turnedInText: string;
  plusXOtherMaterialsText: string;
  itemFeeAmountText: string;
  feeCreatedText: string;
  availablePaymentTypesUrl: string;
  paymentOverviewUrl: string;
}

const IntermedateListEntry: FC<
  IntermedateListProps & BlockedPatronEntryTextProps
> = () => <IntermedateList />;

export default withUrls(withText(isPatronBlockedHoc(IntermedateListEntry)));
