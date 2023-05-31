import React, { memo } from "react";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../core/utils/text";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { getParentAvailabilityLabelClass, useAvailabilityData } from "./helper";
import {
  Access,
  AccessTypeCode
} from "../../core/dbc-gateway/generated/graphql";
import AvailabilityLabelInside from "./availability-label-inside";
import { FaustId } from "../../core/utils/types/ids";

export interface AvailabilityLabelProps {
  manifestText: string;
  accessTypes: AccessTypeCode[];
  access: Access["__typename"][];
  selected?: boolean;
  url?: URL;
  faustIds: FaustId[];
  handleSelectManifestation?: () => void | undefined;
  cursorPointer?: boolean;
  dataCy?: string;
  isbns: string[];
}

export const AvailabilityLabel: React.FC<AvailabilityLabelProps> = ({
  manifestText,
  accessTypes,
  access,
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

  const { isLoading, isAvailable } = useAvailabilityData({
    accessTypes,
    access,
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

  const availabilityLabel = (
    <AvailabilityLabelInside
      selected={selected}
      isLoading={!!isLoading}
      isAvailable={!!isAvailable}
      manifestText={manifestText}
      availabilityText={availabilityText}
    />
  );

  const parentClass = getParentAvailabilityLabelClass({
    selected,
    cursorPointer
  });

  return url && !handleSelectManifestation ? (
    <LinkNoStyle className={parentClass} url={url} data-cy={dataCy}>
      {availabilityLabel}
    </LinkNoStyle>
  ) : (
    <button
      className={parentClass}
      type="button"
      onClick={handleSelectManifestation}
      data-cy={dataCy}
      aria-pressed={selected}
    >
      {availabilityLabel}
    </button>
  );
};

export default memo(AvailabilityLabel);
