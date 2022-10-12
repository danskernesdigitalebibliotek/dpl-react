import React, { FC } from "react";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";
import StatusCircleIcon from "./status-circle-icon";
import {
  getColors,
  daysBetweenTodayAndDate
} from "../../../../core/utils/helpers/general";
import { useText } from "../../../../core/utils/text";

interface StatusCircleProps {
  dueDate: string;
  loanDate: string;
}

const StatusCircle: FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const t = useText();

  const daysBetweenTodayAndDue = daysBetweenTodayAndDate(dueDate);
  const daysBetweenLoanAndDue = daysBetweenTodayAndDate(loanDate);

  const percent = 100 - (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;
  const colors = getColors();
  let color = colors.default;
  if (daysBetweenTodayAndDue <= statusThreshold.danger) {
    color = colors.danger;
  } else if (daysBetweenTodayAndDue <= statusThreshold.warning) {
    color = colors.warning;
  }

  return (
    <StatusCircleIcon percent={percent} color={color as string}>
      <span className="counter__value">
        {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}
      </span>
      {/* todo string interpolation */}
      <span className="counter__label">{t("loanListDaysText")}</span>
    </StatusCircleIcon>
  );
};

export default StatusCircle;
