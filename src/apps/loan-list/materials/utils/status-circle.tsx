import React, { FC } from "react";
import dayjs from "dayjs";
import { useText } from "../../../../core/utils/text";
import StatusCircleIcon from "./status-circle-icon";
import {
  getColors,
  getThresholds
} from "../../../../core/utils/helpers/general";

interface StatusCircleProps {
  dueDate: string;
  loanDate: string | undefined;
}

const StatusCircle: FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const t = useText();
  const dueD = dayjs(dueDate);
  const today = dayjs();
  const loanD = dayjs(loanDate);
  const colors = getColors();
  const thresholds = getThresholds();

  const daysBetweenTodayAndDue = Math.ceil(dueD.diff(today, "day", true));
  const daysBetweenLoanAndDue = Math.ceil(dueD.diff(loanD, "day", true));

  const percent = 100 - (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;

  let color = colors.default;
  if (daysBetweenTodayAndDue <= thresholds.danger) {
    color = colors.danger;
  } else if (daysBetweenTodayAndDue <= thresholds.warning) {
    color = colors.warning;
  }

  return (
    <StatusCircleIcon color={color as string} percent={percent}>
      <span className="counter__value">
        {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}
      </span>
      <span className="counter__label">{t("loanListDaysText")}</span>
    </StatusCircleIcon>
  );
};

export default StatusCircle;
