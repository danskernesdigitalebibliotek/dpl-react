import React, { FC, useEffect, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import { useText } from "../../../core/utils/text";
import { useGetBranches } from "../../../core/fbs/fbs";
import { AgencyBranch } from "../../../core/fbs/model";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  getColors,
  getThresholds,
  daysBetweenTodayAndDate
} from "../../../core/utils/helpers/general";
import { formatDate } from "../../loan-list/utils/helpers";
import { getPreferredBranch } from "../../../components/reservation/helper";
import ReservationStatus from "./reservation-status";

interface ReservationInfoProps {
  reservationInfo: ReservationType;
}

const ReservationInfo: FC<ReservationInfoProps> = ({ reservationInfo }) => {
  const t = useText();

  const {
    state,
    expiryDate,
    pickupBranch,
    numberInQueue,
    pickupDeadline,
    pickupNumber
  } = reservationInfo;

  const [readyForPickupLabel, setReadyForPickupLabel] = useState<string>("");
  const [pickupLibrary, setPickupLibrary] = useState<string>("");
  const branchResponse = useGetBranches();
  const colors = getColors();
  const thresholds = getThresholds();

  useEffect(() => {
    if (branchResponse.data && pickupBranch) {
      setReadyForPickupLabel(
        pickupDeadline
          ? `${t("reservationPickUpLatestText")} ${formatDate(pickupDeadline)}`
          : ""
      );
      setPickupLibrary(
        getPreferredBranch(pickupBranch, branchResponse.data as AgencyBranch[])
      );
    } else {
      setReadyForPickupLabel(
        pickupDeadline
          ? `${t("loanBeforeText")} ${formatDate(pickupDeadline)}`
          : ""
      );
    }
  }, [branchResponse, pickupBranch, pickupDeadline, t]);

  if (state === "readyForPickup") {
    return (
      <ReservationStatus
        color={colors.success as string}
        percent={100}
        infoLabel={readyForPickupLabel}
        label={[pickupLibrary, pickupNumber || ""]}
      >
        <img src={check} alt="" />
        {t("readyText")}
      </ReservationStatus>
    );
  }

  if (state === "reserved" && pickupBranch && numberInQueue && expiryDate) {
    return (
      <ReservationStatus
        color={colors.default as string}
        // The decision regarding this is, that if the user is number 4
        // in the queue for a material, the "percent-wheel-thing" should be 1/4 full.
        percent={(1 / numberInQueue) * 100}
        expiresSoonLabel={
          daysBetweenTodayAndDate(expiryDate) <= thresholds.warning
            ? t("expiresSoonText")
            : ""
        }
        // todo string interpolation
        label={
          numberInQueue === 1
            ? `${t("youAreFirstInQueueText")}`
            : `${t("youAreNumberInQueueText")} ${numberInQueue - 1}`
        }
      >
        <span className="counter__value">{numberInQueue}</span>
        <span className="counter__label">{t("inLineText")}</span>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && !pickupBranch && pickupDeadline) {
    return (
      // todo string interpolation
      <ReservationStatus
        color={colors.default as string}
        percent={daysBetweenTodayAndDate(pickupDeadline) / 100}
        label={`${t("canBeLoanedInText")} ${daysBetweenTodayAndDate(
          pickupDeadline
        )}`}
      >
        <span className="counter__value">
          {daysBetweenTodayAndDate(pickupDeadline)}
        </span>
        {/* todo string interpolation */}
        <span className="counter__label">{t("daysText")}</span>
      </ReservationStatus>
    );
  }

  return <div />;
};

export default ReservationInfo;
