import dayjs from "dayjs";
import React, { FC } from "react";
import { dateFormatDefault } from "../../../core/configuration/date-format";
import { useText } from "../../../core/utils/text";

interface FeeStatusProps {
  dueDate: string;
  reasonMessage: string;
}

const FeeStatus: FC<FeeStatusProps> = ({ dueDate, reasonMessage }) => {
  const t = useText();
  const dueDateFormatted = dayjs(dueDate).format(dateFormatDefault);
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
