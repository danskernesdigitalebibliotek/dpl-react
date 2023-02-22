import React, { memo } from "react";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import clsx from "clsx";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../core/utils/text";
import { LinkNoStyle } from "../atoms/link-no-style";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { useAvailabilityData } from "./helper";
import { AccessTypeCode } from "../../core/dbc-gateway/generated/graphql";

export interface AvailabilityLabelProps {
  manifestText: string;
  accessTypes: AccessTypeCode[];
  selected?: boolean;
  url?: URL;
  faustIds: string[];
  handleSelectManifestation?: () => void | undefined;
  cursorPointer?: boolean;
  dataCy?: string;
  isbns: string[];
}

export const AvailabilityLabel: React.FC<AvailabilityLabelProps> = ({
  manifestText,
  accessTypes,
  selected = false,
  url,
  faustIds,
  handleSelectManifestation,
  cursorPointer = false,
  dataCy = "availability-label",
  isbns
}) => {
  const { track } = useStatistics();
  const t = useText();

  const { isAvailable } = useAvailabilityData({
    accessTypes,
    faustIds,
    isbn: isbns ? isbns[0] : null
  });

  const availabilityText = isAvailable ? t("available") : t("unavailable");

  useDeepCompareEffect(() => {
    // Track material availability (status) if the button is active - also meaning
    // it is displayed on the material page and represent the active manifestation
    // material type
    if (selected) {
      track("click", {
        id: statistics.materialStatus.id,
        name: statistics.materialStatus.name,
        trackedData: availabilityText
      });
    }
    // We only want to track if the faustIds change (once - on load), or the selected
    // status changes (on select of the availability button)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faustIds, selected]);

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
      data-cy={dataCy}
    >
      <div className={classes.triangle} />
      <img className={classes.check} src={CheckIcon} alt="check-icon" />
      {manifestText && (
        <>
          <p
            className="text-label-semibold ml-24"
            data-cy="availability-label-type"
          >
            {manifestText}
          </p>
          <div className="availability-label--divider ml-4" />
        </>
      )}
      <p
        className={`text-label-normal ${manifestText ? "ml-4" : "ml-24"} mr-8`}
        data-cy="availability-label-status"
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

export default memo(AvailabilityLabel);
