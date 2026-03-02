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
  /** Whether this material is non-physical (online/digital). Defaults to false (physical). */
  isNonPhysical?: boolean;
};

const AvailabilityLabelVisual: React.FunctionComponent<
  AvailabilityLabelVisualProps
> = ({
  manifestText,
  selected,
  cursorPointer,
  isAvailable,
  quantity,
  availabilityText,
  isNonPhysical = false
}) => {
  const t = useText();

  const getAvailableText = () => {
    // Use different text for physical vs non-physical materials when available
    return isNonPhysical
      ? t("availabilityAvailableText")
      : t("availabilityAvailablePhysicalText");
  };

  const computedAvailabilityText =
    availabilityText ||
    (isAvailable ? getAvailableText() : t("availabilityUnavailableText"));

  return (
    <div
      className={getParentAvailabilityLabelClass({ selected, cursorPointer })}
    >
      <AvailabilityLabelInside
        selected={selected}
        isAvailable={isAvailable}
        manifestText={manifestText}
        availabilityText={computedAvailabilityText}
        quantity={quantity}
        isLoading={false}
      />
    </div>
  );
};

export default AvailabilityLabelVisual;
