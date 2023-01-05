import dayjs from "dayjs";
import React, { FC } from "react";
import { dateFormatDefault } from "../../../core/configuration/date-format.json";
import { useText } from "../../../core/utils/text";
import StatusBadge from "../../loan-list/materials/utils/status-badge";

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
        <StatusBadge dueDate={dueDate} dangerText={reasonMessage} />
        <p className="text-small-caption" id="due-date">
          {t("feeCreatedText", {
            placeholders: { "@date": dueDateFormatted }
          })}
        </p>
      </div>
    </div>
  );
};

export default FeeStatus;
