import React, { FC, ReactNode } from "react";
import StatusBadge from "../../loan-list/materials/utils/status-badge";

interface FeeStatusProps {
  dueDateLabel: string;
  children: ReactNode;
}

const FeeStatus: FC<FeeStatusProps> = ({ dueDateLabel, children }) => {
  // const t = useText();
  // const { dueDate, loanDate } = loan;

  // if (!dueDate || !loanDate) return <div />;

  return (
    <div className="list-reservation__status">
      <div>
        <div className="list-reservation__deadline">
          <StatusBadge
            dueDate="01-01-2002"
            dangerText="test"
            warningText="test"
          />
          <p className="text-small-caption" id="due-date">
            {dueDateLabel}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeeStatus;
