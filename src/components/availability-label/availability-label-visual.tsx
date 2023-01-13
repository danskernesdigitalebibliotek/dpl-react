import clsx from "clsx";
import React from "react";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import { useText } from "../../core/utils/text";

type AvailabilityLabelVisualProps = {
  manifestText: string;
  selected?: boolean;
  quantity?: number;
  cursorPointer?: boolean;
  isAvailable?: boolean;
};

const AvailabilityLabelVisual: React.FunctionComponent<
  AvailabilityLabelVisualProps
> = ({ manifestText, selected, cursorPointer, isAvailable, quantity }) => {
  const t = useText();
  const availabilityText = isAvailable ? t("available") : t("unavailable");
  const availableTriangleCss = isAvailable ? "success" : "alert";

  const classes = {
    parent: clsx(
      {
        "pagefold-parent--none availability-label--selected": selected
      },
      {
        "pagefold-parent--xsmall availability-label--unselected": !selected
      },
      { "cursor-pointer": cursorPointer },
      "text-label",
      "availability-label"
    ),
    triangle: clsx(
      { "pagefold-triangle--none": selected },
      {
        [`pagefold-triangle--xsmall pagefold-triangle--xsmall--${availableTriangleCss}`]:
          !selected
      }
    ),
    check: clsx("availability-label--check", selected && "selected")
  };

  return (
    <div className={classes.parent}>
      <div className={classes.triangle} />
      <img className={classes.check} src={CheckIcon} alt="check-icon" />
      <p className="text-label-semibold ml-24">{manifestText}</p>
      <div className="availability-label--divider ml-4" />
      <p className="text-label-normal ml-4 mr-8">{availabilityText}</p>
      {quantity && (
        <>
          <div className="availability-label--divider ml-4" />
          <p className="text-label-normal mx-8">{quantity} stk</p>
        </>
      )}
    </div>
  );
};

export default AvailabilityLabelVisual;
