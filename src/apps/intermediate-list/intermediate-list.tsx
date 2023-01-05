import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "../../components/atoms/link";
import { useGetFeesV2 } from "../../core/fbs/fbs";
import { FeeV2 } from "../../core/fbs/model";
import { faustIdModalQueryParam } from "../../core/utils/helpers/modal-helpers";
import { getUrlQueryParam } from "../../core/utils/helpers/url";
import { ModalIdsProps, useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import FeeList from "./fee-list/fee-list";
import FeeDetailsModal from "./modal/fee-details-modal";
import MyPaymentOverviewModal from "./modal/my-payment-overview-modal";
import FeeDetailsContent from "./stackable-fees/fee-details-content";
import modalIdsConf from "../../core/configuration/modal-ids.json";
import {
  getFeeObjectByFaustId,
  getFeesInRelationToPaymentChangeDate
} from "./utils/helper";

const IntermedateList: FC = () => {
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
    const modalUrlParam = getUrlQueryParam("modal");
    // If there is a query param with the due date, a modal should be opened
    if (modalUrlParam) {
      const faustId = faustIdModalQueryParam(modalUrlParam);
      if (faustId) {
        setFeeDetailsModalId(modalIdsConf.feeDetails + faustId);
        openDetailsModalClickEvent(faustId);
      }
    }
  }, [openDetailsModalClickEvent]);

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
    const initialValue = 0;
    const totalFee = itemsPrePaymentChange?.reduce(
      (accumulator, { amount }) => accumulator + amount,
      initialValue
    );
    if (totalFee) {
      setTotalFeePrePaymentChange(totalFee);
    }
  }, [itemsPrePaymentChange, totalFeePrePaymentChange]);

  useEffect(() => {
    if (totalFeePostPaymentChange > 0) {
      return;
    }
    const initialValue = 0;
    const totalFee = itemsPostPaymentChange?.reduce(
      (accumulator, { amount }) => accumulator + amount,
      initialValue
    );

    if (totalFee) {
      setTotalFeePostPaymentChange(totalFee);
    }
  }, [itemsPostPaymentChange, totalFeePostPaymentChange]);

  return (
    <>
      <div
        style={modalIds.length > 0 ? { display: "none" } : {}}
        className="intermediate-list-page"
      >
        <h1 className="intermediate-list-headline">
          {t("intermediateListHeadlineText")}
        </h1>
        <span className="intermediate-list-body">
          {t("intermediateListBodyText")}{" "}
          <Link className="link-tag" href={viewFeesAndCompensationRatesUrl}>
            {t("viewFeesAndCompensationRatesText")}
          </Link>
        </span>
        <FeeList
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

export default IntermedateList;
