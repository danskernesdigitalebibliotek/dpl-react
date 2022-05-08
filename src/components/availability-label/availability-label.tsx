import React from "react";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
import { Link } from "../utils/link";

export interface AvailabilityLabelProps {
  manifestText: string;
  availabilityText: string;
  state: "available" | "unavailable" | "selected";
  link: string | undefined;
}

export const AvailabilityLabel: React.FC<AvailabilityLabelProps> = ({
  manifestText,
  availabilityText,
  state,
  link
}) => {
  const triangleState = {
    available: "success",
    unavailable: "alert",
    selected: "alert"
  };

  const classes = {
    parent: clsx(
      {
        "pagefold-parent--none availability-label availability-label--selected":
          state === "selected"
      },
      {
        "pagefold-parent--xsmall availability-label availability-label--unselected":
          state !== "selected"
      },
      "text-label"
    ),
    triangle: clsx(
      { "pagefold-triangle--none": state === "selected" },
      {
        [`pagefold-triangle--xsmall pagefold-triangle--xsmall--${triangleState[state]}`]:
          state !== "selected"
      }
    ),
    check: clsx("availability-label--check", [`${state}`])
  };

  const availabilityLabel = (
    <div className={classes.parent}>
      <div className={classes.triangle} />
      <img className={classes.check} src={CheckIcon} alt="check-icon" />
      <p className="text-label-semibold ml-24">{manifestText}</p>
      <div className="availability-label--divider ml-4" />
      <p className="text-label-normal ml-4 mr-8">{availabilityText}</p>
    </div>
  );

  return link ? (
    <Link href={link}>{availabilityLabel}</Link>
  ) : (
    availabilityLabel
  );
};

export default AvailabilityLabel;
