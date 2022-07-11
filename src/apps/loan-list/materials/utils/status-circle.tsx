import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useText } from "../../../../core/utils/text";

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

  let percent = (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;
  percent = 100 - percent;

  let color = "#484848";
  if (daysBetweenTodayAndDue < 1) {
    color = "#d5364a";
  } else if (daysBetweenTodayAndDue < 7) {
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
