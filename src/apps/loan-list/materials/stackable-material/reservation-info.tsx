import React, { FC, useEffect, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import dayjs from "dayjs";
import { useText } from "../../../../core/utils/text";
import StatusCircleIcon from "../utils/status-circle-icon";
import colors from "../../../../core/configuration/colors.json";
import { getPreferredLocation } from "../../../material/helper";
import { useGetBranches } from "../../../../core/fbs/fbs";
import { AgencyBranch } from "../../../../core/fbs/model";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";

interface ReservationInfoProps {
  state: string | null | undefined;
  pickupDeadline: string | undefined;
  expiryDate: string | null | undefined;
  pickupBranch: string | null | undefined;
  numberInQueue: number | null | undefined;
}

const ReservationInfo: FC<ReservationInfoProps> = ({
  state,
  expiryDate,
  pickupBranch,
  numberInQueue,
  pickupDeadline
}) => {
  const t = useText();
  const [pickupLibrary, setPickupLibrary] = useState<string>();
  const branchResponse = useGetBranches();
  const dueD = dayjs(expiryDate);
  const today = dayjs();

  const daysBetweenTodayAndDue = Math.ceil(dueD.diff(today, "day", true));
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
      <div className="list-reservation__status">
        <StatusCircleIcon color={colors.success} percent={100}>
          <img src={check} alt="" />
          {t("reservationListReadyText")}
        </StatusCircleIcon>
        <div>
          {pickupDeadline && (
            <div className="list-reservation__deadline">
              <div className="status-label status-label--info">
                Hent senest {pickupDeadline}
              </div>
              <p className="text-small-caption">{pickupLibrary}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (state === "reserved") {
    return (
      <div className="list-reservation__status">
        {numberInQueue && (
          <StatusCircleIcon
            color={colors.default}
            percent={numberInQueue / 100}
          >
            <span className="counter__value">{numberInQueue}</span>
            <span className="counter__label">I køen</span>
          </StatusCircleIcon>
        )}
        <div>
          <div className="list-reservation__deadline">
            {daysBetweenTodayAndDue <= statusThreshold.warning && (
              <div className="status-label status-label--warning">
                Udløber snart
              </div>
            )}
            {numberInQueue && (
              <p className="text-small-caption">
                Du er nummer {numberInQueue} i køen
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div />;
};

export default ReservationInfo;
