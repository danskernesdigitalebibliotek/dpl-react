import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import IntermedateList from "./intermediate-list";

export interface IntermedateListProps {
  totalFeeAmountText: string;
  feeCreatedText: string;
  otherMaterialsText: string;
  materialByAuthorText: string;
  loanListDaysText: string;
  payText: string;
  totalText: string;
  iAcceptText: string;
  termsOfTradeText: string;
  termsOfTradeUrl: string;
  intermediateListHeadlineText: string;
  intermediateListBodyText: string;
  viewFeesAndCompensationRatesText: string;
  viewFeesAndCompensationRatesUrl: string;
  unpaidFeesText: string;
  prePaymentTypeChangeDateText: string;
  PostPaymentTypeChangeDateText: string;
  alreadyPaidText: string;
  intermediatePaymentModalHeaderText: string;
  intermediatePaymentModalBodyText: string;
  intermediatePaymentModalNoticeText: string;
  intermediatePaymentModalGotoText: string;
  intermediatePaymentModalCancelText: string;
  feeDetailsModalScreenReaderText: string;
  emptyIntermediateListText: string;
  testmeText: string;
}

const IntermedateListEntry: FC<IntermedateListProps> = () => (
  <IntermedateList />
);

export default withUrls(withText(IntermedateListEntry));
