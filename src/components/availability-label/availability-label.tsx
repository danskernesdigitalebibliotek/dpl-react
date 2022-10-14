import React from "react";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { useText } from "../../core/utils/text";
import { LinkNoStyle } from "../atoms/link-no-style";
import { useConfig } from "../../core/utils/config";

export interface AvailabilityLabelProps {
  manifestText?: string;
  selected?: boolean;
  url?: URL;
  faustIds: string[];
  handleSelectManifestation?: () => void | undefined;
  cursorPointer?: boolean;
}

export const AvailabilityLabel: React.FC<AvailabilityLabelProps> = ({
  manifestText,
  selected = false,
  url,
  faustIds,
  handleSelectManifestation,
  cursorPointer = false
}) => {
  const config = useConfig();
  const blacklistBranches = config("blacklistedAvailabilityBranchesConfig", {
    transformer: "stringToArray"
  });

  const t = useText();
  const { data, isLoading, isError } = useGetAvailabilityV3({
    recordid: faustIds,
    ...(Array.isArray(blacklistBranches) ? { exclude: blacklistBranches } : {})
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

  const availabilityLabel = (
    <div
      className={classes.parent}
      onClick={handleSelectManifestation ?? undefined}
      onKeyPress={handleSelectManifestation ?? undefined}
      role="button"
      tabIndex={0}
    >
      <div className={classes.triangle} />
      <img className={classes.check} src={CheckIcon} alt="check-icon" />
      {manifestText && (
        <>
          <p className="text-label-semibold ml-24">{manifestText}</p>
          <div className="availability-label--divider ml-4" />
        </>
      )}
      <p
        className={`text-label-normal ${manifestText ? "ml-4" : "ml-24"} mr-8`}
      >
        {availabilityText}
      </p>
    </div>
  );

  return url && !handleSelectManifestation ? (
    <LinkNoStyle url={url}>{availabilityLabel}</LinkNoStyle>
  ) : (
    availabilityLabel
  );
};

export default AvailabilityLabel;
