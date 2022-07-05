import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

interface StatusCircleProps {
  dueDate: string;
  loanDate: string | undefined;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const dueD = dayjs(dueDate);
  const today = dayjs();
  const loanD = dayjs(loanDate);
  
  const daysBetweenTodayAndDue = Math.floor(dueD.diff(today, "day", true));
  const daysBetweenLoanAndDue = Math.floor(dueD.diff(loanD, "day", true));

  let percent = (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;
  percent = 100 - percent;

  let color = "#d5364a";
  if (daysBetweenTodayAndDue > 10) {
    color = "#484848";
  } else if (daysBetweenTodayAndDue > 6) {
    color = "#f7bf42";
  }

  return (
    <div className="list-reservation__counter">
      <div
        role="progressbar"
        className="counter"
        aria-label="counter showing time remaining "
        style={{
          background: `radial-gradient( closest-side, var(--parent-bg-color) calc(100% - 3px), transparent calc(100% - 2px), transparent 0 100% ), conic-gradient(${color} ${percent}%, #DBDBDB 0)`
        }}
      >
        <span className="counter__value">
          {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}
        </span>
        <span className="counter__label">dage</span>
      </div>
    </div>
  );
};

export default StatusCircle;
