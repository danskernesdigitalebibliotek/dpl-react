import React from "react";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
import { Link } from "../utils/link";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { useText } from "../../core/utils/text";

export interface AvailabilityLabelProps {
  manifestText: string;
  selected: boolean;
  link: string | undefined;
  materialId: string[];
}

export const AvailabilityLabel: React.FC<AvailabilityLabelProps> = ({
  manifestText,
  selected = false,
  link,
  materialId
}) => {
  const t = useText();
  const { data, isLoading, isError } = useGetAvailabilityV3({
    recordid: materialId
  });

  if (isLoading || isError) {
    return null;
  }

  const isAvailable = data?.some((item) => item.available);
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
