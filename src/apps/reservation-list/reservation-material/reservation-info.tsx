import React, { FC, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { getColors } from "../../../core/utils/helpers/general";
import { calculateRoundedUpDaysUntil } from "../../../core/utils/helpers/date";
import { getPreferredBranch } from "../../../components/reservation/helper";
import ReservationStatus from "./reservation-status";
import { useGetBranches } from "../../../core/utils/branches";
import { getReservationStatusInfoLabel } from "../utils/helpers";

interface ReservationInfoProps {
  reservationInfo: ReservationType;
  openReservationDetailsModal?: (reservation: ReservationType) => void;
  showStatusCircleIcon?: boolean;
  showArrow?: boolean;
  reservationStatusClassNameOverride?: string;
  isDigital: boolean;
}

const ReservationInfo: FC<ReservationInfoProps> = ({
  reservationInfo,
  openReservationDetailsModal,
  showStatusCircleIcon = true,
  showArrow = true,
  reservationStatusClassNameOverride,
  isDigital
}) => {
  const t = useText();

  const {
    state,
    expiryDate,
    pickupBranch,
    numberInQueue,
    pickupDeadline,
    pickupNumber
  } = reservationInfo;

  const [pickupLibrary, setPickupLibrary] = useState<string>("");
  const { success } = getColors();
  const branches = useGetBranches("blacklistedPickupBranchesConfig");

  useDeepCompareEffect(() => {
    if (branches && pickupBranch) {
      setPickupLibrary(getPreferredBranch(pickupBranch, branches));
    }
  }, [branches, pickupBranch]);

  const getInfo = () => {
    // If the material is digital and has an expiry date,
    // or if the material is physical and has a pickup deadline,
    // then we should show the info label
    const shouldgetReservationStatusInfo =
      (isDigital && expiryDate) || pickupDeadline;

    if (!shouldgetReservationStatusInfo) {
      return "";
    }

    // If the material is digital, then we should show the expiry date
    // otherwise the pickup deadline.
    const date = (isDigital ? expiryDate : pickupDeadline) ?? null;
    if (!date) {
      return "";
    }

    return getReservationStatusInfoLabel({
      pickupBranch,
      date,
      t,
      isDigital
    });
  };

  if (state === "readyForPickup") {
    return (
      <ReservationStatus
        color={success as string}
        percent={100}
        info={getInfo()}
        label={
          isDigital
            ? [t("reservationListDigitalPickupText")]
            : [pickupLibrary, pickupNumber || ""]
        }
        reservationInfo={reservationInfo}
        openReservationDetailsModal={openReservationDetailsModal}
        empty={!showStatusCircleIcon}
        showArrow={showArrow}
        className={reservationStatusClassNameOverride}
      >
        <div className="counter__value color-secondary-gray">
          <img src={check} alt="" />
          <span className="counter__label color-secondary-gray">
            {t("reservationListReadyText")}
          </span>
        </div>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && pickupBranch && numberInQueue && expiryDate) {
    const numberInLineLabel =
      numberInQueue === 1
        ? t("reservationListFirstInQueueText")
        : t("reservationListNumberInQueueText", {
            placeholders: { "@count": numberInQueue - 1 }
          });

    return (
      <ReservationStatus
        // The decision regarding this is, that if the user is number 4
        // in the queue for a material, the "percent-wheel-thing" should be 1/4 full.
        percent={(1 / numberInQueue) * 100}
        label={showStatusCircleIcon ? numberInLineLabel : ""}
        reservationInfo={reservationInfo}
        openReservationDetailsModal={openReservationDetailsModal}
        empty={!showStatusCircleIcon}
        showArrow={showArrow}
        className={reservationStatusClassNameOverride}
      >
        {/* I am not using string interpolation here because of styling */}
        {/* if somehow it is possible to break text in one div into two lines */}
        {/* where the first line has another font size AND is only the first "word" */}
        {/* then this should be changed to do that */}
        <span className="counter__value color-secondary-gray">
          {numberInQueue}
        </span>
        <span className="counter__label color-secondary-gray">
          {t("reservationListInQueueText")}
        </span>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && !pickupBranch && pickupDeadline) {
    const daysBetweenTodayAndPickup =
      calculateRoundedUpDaysUntil(pickupDeadline);
    const reservationAvailableLabel = showStatusCircleIcon
      ? t("reservationListAvailableInText", {
          placeholders: {
            "@count": calculateRoundedUpDaysUntil(pickupDeadline)
          }
        })
      : "";

    return (
      <ReservationStatus
        percent={calculateRoundedUpDaysUntil(pickupDeadline) / 100}
        label={reservationAvailableLabel}
        reservationInfo={reservationInfo}
        openReservationDetailsModal={openReservationDetailsModal}
        empty={!showStatusCircleIcon}
        showArrow={showArrow}
        className={reservationStatusClassNameOverride}
      >
        <span className="counter__value color-secondary-gray">
          {/* I am not using string interpolation here because of styling */}
          {/* if somehow it is possible to break text in one div into two lines */}
          {/* where the first line has another font size AND is only the first "word" */}
          {/* then this should be changed to do that */}
          {calculateRoundedUpDaysUntil(pickupDeadline) > 0
            ? daysBetweenTodayAndPickup
            : 0}{" "}
        </span>
        <span className="counter__label color-secondary-gray">
          {daysBetweenTodayAndPickup === 1
            ? t("reservationListDayText")
            : t("reservationListDaysText")}
        </span>
      </ReservationStatus>
    );
  }

  return (
    <ReservationStatus
      reservationInfo={reservationInfo}
      openReservationDetailsModal={openReservationDetailsModal}
      percent={0}
      label=""
      empty
      showArrow={showArrow}
      className={reservationStatusClassNameOverride}
    />
  );
};

export default ReservationInfo;
