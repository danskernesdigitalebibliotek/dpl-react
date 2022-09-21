import React, { FC } from "react";
import dayjs from "dayjs";
import { useText } from "../../../../core/utils/text";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";
import colors from "../../../../core/configuration/colors.json";
import StatusCircleIcon from "./status-circle-icon";

interface StatusCircleProps {
  dueDate: string;
  loanDate: string | undefined;
}

const StatusCircle: FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const t = useText();
  const dueD = dayjs(dueDate);
  const today = dayjs();
  const loanD = dayjs(loanDate);

  const daysBetweenTodayAndDue = Math.ceil(dueD.diff(today, "day", true));
  const daysBetweenLoanAndDue = Math.ceil(dueD.diff(loanD, "day", true));

  const percent = 100 - (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;

  let color = colors.default;
  if (daysBetweenTodayAndDue <= statusThreshold.danger) {
    color = colors.danger;
  } else if (daysBetweenTodayAndDue <= statusThreshold.warning) {
    color = colors.warning;
  }

  return (
    <StatusCircleIcon color={color} percent={percent}>
      <span className="counter__value">
        {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}
      </span>
      <span className="counter__label">{t("loanListDaysText")}</span>
    </StatusCircleIcon>
  );
};

export default StatusCircle;
