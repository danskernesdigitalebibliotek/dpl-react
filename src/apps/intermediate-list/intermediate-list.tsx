import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "../../components/atoms/link";
import { useGetFeesV2 } from "../../core/fbs/fbs";
import { FeeV2 } from "../../core/fbs/model";
import { ModalIdsProps, useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import FeeList from "./fee-list/fee-list";
import FeeDetailsModal from "./modal/fee-details-modal";
import FeeDetailsContent from "./stackable-fees/fee-details-content";
import {
  getFeeObjectByFaustId,
  getFeesPostPaymentChangeDate,
  getFeesPrePaymentChangeDate
} from "./utils/intermediate-list-helper";

const IntermedateList: FC = () => {
  const t = useText();
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
  const [faustIdentifier, setFaustIdentifier] = useState("0");
  const [feeDetailsData, setFeeDetailsData] = useState<FeeV2[]>();
  const openDetailsModalClickEvent = useCallback(
    (faustId: string) => {
      setFaustIdentifier(faustId);
      setFeeDetailsData(getFeeObjectByFaustId(fbsFees, faustId));
      open(faustId || "");
    },
    [fbsFees, open]
  );

  useEffect(() => {
    if (fbsFees) {
      const feesPrePaymentChange = getFeesPrePaymentChangeDate(fbsFees).length;
      if (feesPrePaymentChange > 0) {
        setItemsPrePaymentChange(getFeesPrePaymentChangeDate(fbsFees));
      }
      const feesPostPaymentChange = getFeesPrePaymentChangeDate(fbsFees).length;
      if (feesPostPaymentChange > 0) {
        setItemsPostPaymentChange(getFeesPostPaymentChangeDate(fbsFees));
      }
    }
  }, [fbsFees]);

  useEffect(() => {
    let totalFee = 0;
    itemsPrePaymentChange?.forEach((item) => {
      totalFee += item.amount;
    });
    setTotalFeePrePaymentChange(totalFee);
  }, [itemsPrePaymentChange]);

  useEffect(() => {
    let totalTally = 0;
    itemsPostPaymentChange?.forEach((item) => {
      totalTally += item.amount;
    });
    setTotalFeePostPaymentChange(totalTally);
  }, [itemsPostPaymentChange]);
  return (
    <>
      <div
        style={modalIds.length > 0 ? { display: "none" } : {}}
        className="intermediate-list-page"
      >
        <h1>{t("intermediateListHeadlineText")}</h1>
        <span>
          {t("intermediateListBodyText")}{" "}
          <Link
            className="link-tag"
            href={new URL(viewFeesAndCompensationRatesUrl)}
          >
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
      <FeeDetailsModal faust={faustIdentifier} material={{}}>
        {feeDetailsData && (
          <FeeDetailsContent
            feeDetailsData={feeDetailsData[0] as unknown as FeeV2}
          />
        )}
      </FeeDetailsModal>
    </>
  );
};

export default IntermedateList;
