import dayjs from "dayjs";
import React, { FC } from "react";
import { getColors } from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";

interface FeeStatusCircleProps {
  dueDate: string;
  feeCreationDate: string;
}

const FeeStatusCircle: FC<FeeStatusCircleProps> = ({
  dueDate,
  feeCreationDate
}) => {
  const t = useText();
  const colors = getColors();
  const daysBetweenDueAndDelivered = dayjs(dueDate).diff(
    feeCreationDate,
    "day"
  );

  return (
    <StatusCircleIcon percent={100} color={colors.danger as string}>
      <span className="counter__value">{daysBetweenDueAndDelivered}</span>
      <span className="counter__label">{t("intermediateListDaysText")}</span>
    </StatusCircleIcon>
  );
};

export default FeeStatusCircle;
