import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Link from "../../components/atoms/links/Link";
import { useGetFeesV2 } from "../../core/fbs/fbs";
import { FeeV2 } from "../../core/fbs/model";
import { useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import List from "./list";
import FeeDetailsModal from "./modal/fee-details-modal";
import MyPaymentOverviewModal from "./modal/my-payment-overview-modal";
import FeeDetailsContent from "./stackable-fees/fee-details-content";
import modalIdsConf from "../../core/configuration/modal-ids.json";
import {
  calculateFeeAmount,
  getFeeObjectByFeeId,
  getFeesBasedOnPayableByClient
} from "./utils/helper";
import ListHeader from "../../components/list-header/list-header";
import EmptyList from "../../components/empty-list/empty-list";
import FeePaymentButton from "./FeePaymentButton";
import { formatCurrency } from "../../core/utils/helpers/currency";
import FeeListSkeleton from "./FeeListSkeleton";
import WarningBar from "../loan-list/materials/utils/warning-bar";
import useLoans from "../../core/utils/useLoans";
import { LoanType } from "../../core/utils/types/loan-type";

const FeeList: FC = () => {
  const t = useText();
  const u = useUrls();
  const physicalLoansUrl = u("physicalLoansUrl");
  const viewFeesAndCompensationRatesUrl = u("viewFeesAndCompensationRatesUrl");
  const [feeDetailsModalId, setFeeDetailsModalId] = useState("");
  const { open } = useModalButtonHandler();
  const { data: fbsFees = [], isLoading } = useGetFeesV2<FeeV2[]>({
    includepaid: false,
    includenonpayable: true
  });
  const {
    fbs: { overdue: loansOverduePhysical, isLoading: isLoadingFbs },
    publizon: { overdue: loansOverdueDigital, isLoading: isLoadingPublizon }
  } = useLoans();
  const [overdueLoans, setOverdueLoans] = useState<LoanType[]>([]);
  const [feeDetailsData, setFeeDetailsData] = useState<FeeV2[]>();
  const openDetailsModalClickEvent = useCallback(
    (feeId: number) => {
      if (feeId) {
        if (fbsFees.length > 0) {
          setFeeDetailsData(getFeeObjectByFeeId(fbsFees, feeId));
        }
        setFeeDetailsModalId(modalIdsConf.feeDetails + feeId);
        open(modalIdsConf.feeDetails + feeId || "");
      }
    },
    [fbsFees, open]
  );
  const totalFeeAmountPayableByClient = useMemo(() => {
    return calculateFeeAmount(fbsFees, true);
  }, [fbsFees]);
  const totalFeeAmountNotPayableByClient = useMemo(() => {
    return calculateFeeAmount(fbsFees, false);
  }, [fbsFees]);
  const shouldShowWarningBar =
    overdueLoans.length > 0 && !isLoadingFbs && !isLoadingPublizon;

  useEffect(() => {
    if (!isLoadingFbs && !isLoadingPublizon) {
      setOverdueLoans(loansOverduePhysical.concat(loansOverdueDigital));
    }
  }, [
    loansOverduePhysical,
    loansOverdueDigital,
    isLoadingFbs,
    isLoadingPublizon
  ]);

  return (
    <>
      <div className="fee-list-page" data-cy="fee-list-page">
        <h1 data-cy="fee-list-headline" className="text-header-h1 my-32">
          {t("feeListHeadlineText")}
        </h1>
        <div data-cy="fee-list-body">
          <div className="fee-list-body__text">{t("feeListBodyText")}</div>
          <div className="fee-list-body__payment-info-link">
            <Link className="link-tag" href={viewFeesAndCompensationRatesUrl}>
              {t("viewFeesAndCompensationRatesText")}
            </Link>
          </div>
        </div>
        {shouldShowWarningBar && (
          <WarningBar
            overdueText={t("feeListYouHaveOverdueLoansText", {
              count: overdueLoans.length
            })}
            rightButtonText={t("feeListSeeYourOverdueLoansText")}
            rightButtonAriaLabelText={t("feeListSeeYourOverdueLoansAriaText")}
            rightLink={physicalLoansUrl}
            classNames="my-64"
          />
        )}
        <div className="fee-list-body__payment-button">
          <FeePaymentButton />
        </div>

        {isLoading && <FeeListSkeleton />}

        {!isLoading && !fbsFees.length && (
          <>
            <ListHeader
              header={<>{t("unpaidFeesPayableByClientHeadlineText")}</>}
              amount={0}
            />
            <EmptyList
              classNames="mt-24"
              emptyListText={t("emptyFeeListText")}
            />
          </>
        )}
        {/* List of fees that can be paid by the user */}
        {getFeesBasedOnPayableByClient(fbsFees, true).length > 0 && (
          <List
            dataCy="fee-list"
            className="fee-list"
            listHeader={t("unpaidFeesPayableByClientHeadlineText")}
            openDetailsModalClickEvent={openDetailsModalClickEvent}
            fees={getFeesBasedOnPayableByClient(fbsFees, true)}
            totalText={t("totalText", {
              placeholders: {
                "@total": formatCurrency(totalFeeAmountPayableByClient())
              }
            })}
            alreadyPaidText={t("feeListAlreadyPaidInfoText")}
          />
        )}
        {/* List of fees that can only be paid by the user externally */}
        {getFeesBasedOnPayableByClient(fbsFees, false).length > 0 && (
          <List
            dataCy="fee-list"
            className="fee-list"
            listHeader={t("unpaidFeesNotPayableByClientHeadlineText")}
            openDetailsModalClickEvent={openDetailsModalClickEvent}
            fees={getFeesBasedOnPayableByClient(fbsFees, false)}
            totalText={t("totalText", {
              placeholders: {
                "@total": formatCurrency(totalFeeAmountNotPayableByClient())
              }
            })}
            alreadyPaidText={t("feeListAlreadyPaidSecondInfoText")}
          />
        )}
      </div>
      <FeeDetailsModal modalId={feeDetailsModalId} material={{}}>
        {feeDetailsData && (
          <FeeDetailsContent
            feeDetailsData={feeDetailsData[0] as unknown as FeeV2}
          />
        )}
      </FeeDetailsModal>
      <MyPaymentOverviewModal />
    </>
  );
};

export default FeeList;
