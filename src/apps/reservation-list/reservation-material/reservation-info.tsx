import React, { FC, useEffect, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import { useText } from "../../../core/utils/text";
import { AgencyBranch } from "../../../core/fbs/model";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  getColors,
  daysBetweenTodayAndDate
} from "../../../core/utils/helpers/general";
import { formatDate } from "../../loan-list/utils/helpers";
import { getPreferredBranch } from "../../../components/reservation/helper";
import ReservationStatus from "./reservation-status";

interface ReservationInfoProps {
  reservationInfo: ReservationType;
  branches: AgencyBranch[];
}

const ReservationInfo: FC<ReservationInfoProps> = ({
  reservationInfo,
  branches
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

  // const [readyForPickupLabel, setReadyForPickupLabel] = useState<string>("");
  const [pickupLibrary, setPickupLibrary] = useState<string>("");
  const colors = getColors();

  let readyForPickupLabel = "";
  if (pickupDeadline) {
    readyForPickupLabel = pickupBranch
      ? t("reservationPickUpLatestText", {
          placeholders: { "@count": formatDate(pickupDeadline) }
        })
      : t("reservationListLoanBeforeText", {
          placeholders: { "@count": formatDate(pickupDeadline) }
        });
  }

  useEffect(() => {
    if (branches && pickupBranch) {
      setPickupLibrary(getPreferredBranch(pickupBranch, branches));
    }
  }, [branches, pickupBranch, pickupDeadline, t]);

  if (state === "readyForPickup") {
    return (
      <ReservationStatus
        color={colors.success as string}
        percent={100}
        infoLabel={readyForPickupLabel}
        label={[pickupLibrary, pickupNumber || ""]}
      >
        <div className="counter__value">
          <img src={check} alt="" />
          {t("reservationListReadyText")}
        </div>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && pickupBranch && numberInQueue && expiryDate) {
    // todo string interpolation
    const numberInLineLabel =
      numberInQueue === 1
        ? t("reservationListFirstInQueueText")
        : t("reservationListNumberInQueueText", {
            count: numberInQueue - 1,
            placeholders: { "@count": numberInQueue - 1 }
          });

    return (
      <ReservationStatus
        color={colors.default as string}
        // The decision regarding this is, that if the user is number 4
        // in the queue for a material, the "percent-wheel-thing" should be 1/4 full.
        percent={(1 / numberInQueue) * 100}
        label={numberInLineLabel}
      >
        <div className="counter__value">
          {t("reservationListInQueueText", {
            count: numberInQueue,
            placeholders: { "@count": numberInQueue }
          })}
        </div>
      </ReservationStatus>
    );
  }

  if (state === "reserved" && !pickupBranch && pickupDeadline) {
    return (
      <ReservationStatus
        color={colors.default as string}
        percent={daysBetweenTodayAndDate(pickupDeadline) / 100}
        label={t("reservationListAvailableInText", {
          placeholders: { "@count": daysBetweenTodayAndDate(pickupDeadline) }
        })}
      >
        <div className="counter__value">
          {t("reservationListDaysText", {
            placeholders: { "@count": daysBetweenTodayAndDate(pickupDeadline) }
          })}
        </div>
      </ReservationStatus>
    );
  }

  return <div />;
};

export default ReservationInfo;
