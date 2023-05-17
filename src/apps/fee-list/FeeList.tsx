import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "../../components/atoms/links/Link";
import { useGetFeesV2 } from "../../core/fbs/fbs";
import { FeeV2 } from "../../core/fbs/model";
import { ModalIdsProps, useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import List from "./list";
import FeeDetailsModal from "./modal/fee-details-modal";
import MyPaymentOverviewModal from "./modal/my-payment-overview-modal";
import FeeDetailsContent from "./stackable-fees/fee-details-content";
import modalIdsConf from "../../core/configuration/modal-ids.json";
import {
  getFeeObjectByFaustId,
  getFeesInRelationToPaymentChangeDate
} from "./utils/helper";

const FeeList: FC = () => {
  const t = useText();
  const [feeDetailsModalId, setFeeDetailsModalId] = useState("");
  const { open } = useModalButtonHandler();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);
  const { data: fbsFees = [] } = useGetFeesV2<FeeV2[]>();
  const [itemsPrePaymentChange, setItemsPrePaymentChange] = useState<
    FeeV2[] | null
  >(null);
  const [totalFeePrePaymentChange, setTotalFeePrePaymentChange] =
    useState<number>(0);
  const [itemsPostPaymentChange, setItemsPostPaymentChange] = useState<
    FeeV2[] | null
  >(null);
  const [totalFeePostPaymentChange, setTotalFeePostPaymentChange] =
    useState<number>(0);
  const { viewFeesAndCompensationRatesUrl } = useUrls();
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

  useEffect(() => {
    if (fbsFees) {
      const feesPrePaymentChange = getFeesInRelationToPaymentChangeDate(
        fbsFees,
        true
      ).length;
      if (feesPrePaymentChange > 0) {
        setItemsPrePaymentChange(
          getFeesInRelationToPaymentChangeDate(fbsFees, true)
        );
      }
      const feesPostPaymentChange = getFeesInRelationToPaymentChangeDate(
        fbsFees,
        true
      ).length;
      if (feesPostPaymentChange > 0) {
        setItemsPostPaymentChange(
          getFeesInRelationToPaymentChangeDate(fbsFees, false)
        );
      }
    }
  }, [fbsFees]);

  useEffect(() => {
    if (totalFeePrePaymentChange > 0) {
      return;
    }
    const totalFee = itemsPrePaymentChange?.reduce(
      (accumulator, { amount }) => accumulator + amount,
      0
    );
    if (totalFee) {
      setTotalFeePrePaymentChange(totalFee);
    }
  }, [itemsPrePaymentChange, totalFeePrePaymentChange]);

  useEffect(() => {
    if (totalFeePostPaymentChange > 0) {
      return;
    }
    const totalFee = itemsPostPaymentChange?.reduce(
      (accumulator, { amount }) => accumulator + amount,
      0
    );

    if (totalFee) {
      setTotalFeePostPaymentChange(totalFee);
    }
  }, [itemsPostPaymentChange, totalFeePostPaymentChange]);

  return (
    <>
      <div
        style={modalIds.length > 0 ? { display: "none" } : {}}
        className="fee-list-page"
      >
        <h1 data-cy="fee-list-headline" className="text-header-h1 my-32">
          {t("feeListHeadlineText")}
        </h1>
        <span data-cy="fee-list-body">
          {t("feeListBodyText")}{" "}
          <Link className="link-tag" href={viewFeesAndCompensationRatesUrl}>
            {t("viewFeesAndCompensationRatesText")}
          </Link>
        </span>
        <List
          openDetailsModalClickEvent={openDetailsModalClickEvent}
          itemsPrePaymentChange={itemsPrePaymentChange}
          itemsPostPaymentChange={itemsPostPaymentChange}
          totalFeePrePaymentChange={totalFeePrePaymentChange}
          totalFeePostPaymentChange={totalFeePostPaymentChange}
        />
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
