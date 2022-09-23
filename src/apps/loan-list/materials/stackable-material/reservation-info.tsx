import React, { FC, useEffect, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import { useText } from "../../../../core/utils/text";
import { getPreferredLocation } from "../../../material/helper";
import { useGetBranches } from "../../../../core/fbs/fbs";
import { AgencyBranch } from "../../../../core/fbs/model";
import {
  getColors,
  getThresholds,
  daysBetweenTodayAndDate
} from "../../../../core/utils/helpers/general";
import ListReservationStatus from "./list-reservation-status";
import { ReservationMetaDataType } from "../../../../core/utils/types/reservation-meta-data-type";

interface ReservationInfoProps {
  reservationInfo: ReservationMetaDataType;
}

const ReservationInfo: FC<ReservationInfoProps> = ({ reservationInfo }) => {
  const t = useText();

  const { state, expiryDate, pickupBranch, numberInQueue, pickupDeadline } =
    reservationInfo;

  const [pickupLibrary, setPickupLibrary] = useState<string>();
  const branchResponse = useGetBranches();
  const colors = getColors();
  const thresholds = getThresholds();

  useEffect(() => {
    if (branchResponse.data && pickupBranch) {
      setPickupLibrary(
        getPreferredLocation(
          pickupBranch,
          branchResponse.data as AgencyBranch[]
        )
      );
    }
  }, [branchResponse, pickupBranch]);

  if (state === "readyForPickup") {
    return (
      <ListReservationStatus
        color={colors.success as string}
        percent={100}
        expiresSoon={false}
        label={pickupLibrary ? pickupLibrary : `Lånes inden ${pickupDeadline}`}
      >
        <img src={check} alt="" />
        {t("reservationListReadyText")}
      </ListReservationStatus>
    );
  }

  if (state === "reserved" && pickupBranch && numberInQueue && expiryDate) {
    return (
      <ListReservationStatus
        color={colors.default as string}
        // Todo we dont have how many in the queue
        percent={numberInQueue / 100}
        expiresSoon={daysBetweenTodayAndDate(expiryDate) <= thresholds.warning}
        label={`${t("reservationListYouAreNumberInLineText")} ${numberInQueue}`}
      >
        <span className="counter__value">{numberInQueue}</span>
        <span className="counter__label">{t("reservationListInLineText")}</span>
      </ListReservationStatus>
    );
  }

  if (state === "reserved" && !pickupBranch && pickupDeadline) {
    return (
      <ListReservationStatus
        color={colors.default as string}
        // Todo we dont have how many in the queue
        percent={daysBetweenTodayAndDate(pickupDeadline) / 100}
        expiresSoon={false}
        label={`Kan lånes om dage ${daysBetweenTodayAndDate(pickupDeadline)}`}
      >
        <span className="counter__value">
          {daysBetweenTodayAndDate(pickupDeadline)}
        </span>
        <span className="counter__label">Dage</span>
      </ListReservationStatus>
    );
  }

  return <div />;
};

export default ReservationInfo;
