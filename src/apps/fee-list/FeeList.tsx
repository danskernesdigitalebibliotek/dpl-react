import React, { FC, useCallback, useMemo, useState } from "react";
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
  getFeeObjectByFaustId,
  getFeesBasedOnPayableByClient
} from "./utils/helper";
import ListHeader from "../../components/list-header/list-header";
import EmptyList from "../../components/empty-list/empty-list";
import FeePaymentButton from "./FeePaymentButton";

const FeeList: FC = () => {
  const t = useText();
  const u = useUrls();
  const viewFeesAndCompensationRatesUrl = u("viewFeesAndCompensationRatesUrl");
  const [feeDetailsModalId, setFeeDetailsModalId] = useState("");
  const { open } = useModalButtonHandler();
  const { data: fbsFees = [] } = useGetFeesV2<FeeV2[]>({
    includepaid: false,
    includenonpayable: true
  });
  const [feeDetailsData, setFeeDetailsData] = useState<FeeV2[]>();
  const openDetailsModalClickEvent = useCallback(
    (faustId: string) => {
      if (faustId) {
        if (fbsFees.length > 0) {
          setFeeDetailsData(getFeeObjectByFaustId(fbsFees, faustId));
        }
        setFeeDetailsModalId(modalIdsConf.feeDetails + faustId);
        open(modalIdsConf.feeDetails + faustId || "");
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
        <div className="fee-list-body__payment-button">
          <FeePaymentButton />
        </div>
        {!fbsFees.length && (
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
                "@total":
                  totalFeeAmountPayableByClient().toLocaleString("da-DK")
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
                "@total":
                  totalFeeAmountNotPayableByClient().toLocaleString("da-DK")
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
