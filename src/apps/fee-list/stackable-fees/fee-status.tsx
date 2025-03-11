import React, { FC } from "react";
import { formatCustomDateString } from "../../../core/utils/helpers/date";
import { useText } from "../../../core/utils/text";

interface FeeStatusProps {
  dueDate: string;
  reasonMessage: string;
}

const FeeStatus: FC<FeeStatusProps> = ({ dueDate, reasonMessage }) => {
  const t = useText();
  const dueDateFormatted = formatCustomDateString(dueDate);
  return (
    <div>
      <div className="list-reservation__deadline">
        <div className="status-label status-label--danger">{reasonMessage}</div>
        <p className="text-small-caption">
          {t("feeCreatedText", {
            placeholders: { "@date": dueDateFormatted }
          })}
        </p>
      </div>
    </div>
  );
};

export default FeeStatus;
