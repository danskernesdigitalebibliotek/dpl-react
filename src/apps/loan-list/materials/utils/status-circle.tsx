import React from "react";
import dayjs from "dayjs";
import { useText } from "../../../../core/utils/text";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";

interface StatusCircleProps {
  dueDate: string;
  loanDate: string | undefined;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const t = useText();
  const dueD = dayjs(dueDate);
  const today = dayjs();
  const loanD = dayjs(loanDate);

  const daysBetweenTodayAndDue = Math.floor(dueD.diff(today, "day", true));
  const daysBetweenLoanAndDue = Math.floor(dueD.diff(loanD, "day", true));

  const percent = 100 - (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;

  let color = "#484848";
  if (daysBetweenTodayAndDue <= statusThreshold.danger) {
    color = "#d5364a";
  } else if (daysBetweenTodayAndDue <= statusThreshold.warning) {
    color = "#f7bf42";
  }

  return (
    <div
      className="list-reservation__counter"
      aria-label={t("loanListStatusCircleAriaLabelText")}
    >
      <div
        role="progressbar"
        className="counter"
        aria-hidden
        style={{
          background: `radial-gradient( closest-side, var(--parent-bg-color) calc(100% - 3px), transparent calc(100% - 2px), transparent 0 100% ), conic-gradient(${color} ${percent}%, #DBDBDB 0)`
        }}
      >
        <span className="counter__value">
          {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}
        </span>
        <span className="counter__label">{t("loanListDaysText")}</span>
      </div>
    </div>
  );
};

export default StatusCircle;
