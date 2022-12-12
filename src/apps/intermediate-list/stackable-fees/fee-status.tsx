import React, { FC, ReactNode } from "react";
import StatusBadge from "../../loan-list/materials/utils/status-badge";

interface FeeStatusProps {
  dueDate: string;
  dueDateLabel: string;
  children: ReactNode;
  reasonMessage: string;
}

const FeeStatus: FC<FeeStatusProps> = ({
  dueDate,
  dueDateLabel,
  children,
  reasonMessage
}) => {
  // const t = useText();
  // const { dueDate, loanDate } = loan;

  // if (!dueDate || !loanDate) return <div />;

  return (
    <div>
      <div className="list-reservation__deadline">
        <StatusBadge
          dueDate="01-01-2002"
          dangerText={reasonMessage}
          warningText="test"
        />
        <p className="text-small-caption" id="due-date">
          {dueDateLabel} {dueDate}
        </p>
        {children}
      </div>
    </div>
  );
};

export default FeeStatus;
