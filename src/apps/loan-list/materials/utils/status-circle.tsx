import React, { FC } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import StatusCircleIcon from "./status-circle-icon";
import {
  getColors,
  daysBetweenTodayAndDate,
  daysBetweenDates
} from "../../../../core/utils/helpers/general";
import { useText } from "../../../../core/utils/text";
import { useConfig } from "../../../../core/utils/config";
import { ThresholdType } from "../../../../core/utils/types/threshold-type";

interface StatusCircleProps {
  dueDate?: string | null;
  loanDate: string;
}

const StatusCircle: FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const t = useText();
  const config = useConfig();
  const colors = getColors();
  const {
    colorThresholds: { danger, warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });
  let color = colors.default;
  let percent = 100;
  let daysBetweenTodayAndDue = null;
  let daysBetweenLoanAndDue = null;
  if (dueDate) {
    daysBetweenTodayAndDue = daysBetweenTodayAndDate(dueDate);
    daysBetweenLoanAndDue = daysBetweenDates(dueDate, loanDate);

    percent = 100 - (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;
    if (percent < 0) {
      percent = 100;
    }
    if (daysBetweenTodayAndDue < danger) {
      color = colors.danger;
    } else if (daysBetweenTodayAndDue <= warning) {
      color = colors.warning;
    }
  } else {
    color = colors.success;
  }

  return (
    <StatusCircleIcon percent={percent} color={color as string}>
      {daysBetweenTodayAndDue !== null && daysBetweenTodayAndDue !== null && (
        <>
          <span className="counter__value color-secondary-gray">
            {/* I am not using string interpolation here because of styling */}
            {/* if somehow it is possible to break text in one div into two lines */}
            {/* where the first line has another font size AND is only the first "word" */}
            {/* then this should be changed to do that */}
            {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}{" "}
          </span>
          <span className="counter__label color-secondary-gray">
            {daysBetweenTodayAndDue === 1
              ? t("loanListMaterialDayText")
              : t("loanListMaterialDaysText")}
          </span>
        </>
      )}
      {daysBetweenTodayAndDue === null && daysBetweenTodayAndDue === null && (
        <>
          <img className="counter__icon" src={check} alt="" />
          <span className="counter__label">
            {t("readyForLoanCounterLabelText")}
          </span>
        </>
      )}
    </StatusCircleIcon>
  );
};

export default StatusCircle;
