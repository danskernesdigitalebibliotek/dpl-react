import React from "react";
import { useText } from "../../core/utils/text";
import AvailabilityLabelInside from "./availability-label-inside";
import { getParentAvailabilityLabelClass } from "./helper";

type AvailabilityLabelVisualProps = {
  manifestText: string;
  selected?: boolean;
  quantity?: number;
  cursorPointer?: boolean;
  isAvailable?: boolean;
  availabilityText?: string;
};

const AvailabilityLabelVisual: React.FunctionComponent<
  AvailabilityLabelVisualProps
> = ({
  manifestText,
  selected,
  cursorPointer,
  isAvailable,
  quantity,
  availabilityText
}) => {
  const t = useText();

  const getAvailabilityText =
    availabilityText || (isAvailable ? t("available") : t("unavailable"));

  return (
    <div
      className={getParentAvailabilityLabelClass({ selected, cursorPointer })}
    >
      <AvailabilityLabelInside
        selected={selected}
        isAvailable={isAvailable}
        manifestText={manifestText}
        availabilityText={getAvailabilityText}
        quantity={quantity}
      />
    </div>
  );
};

export default AvailabilityLabelVisual;
