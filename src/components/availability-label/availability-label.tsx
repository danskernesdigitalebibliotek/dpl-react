import React, { memo } from "react";
import { first } from "lodash";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../core/utils/text";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import { useStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import { getParentAvailabilityLabelClass } from "./helper";
import AvailabilityLabelInside from "./availability-label-inside";
import { FaustId } from "../../core/utils/types/ids";
import useAvailabilityData from "./useAvailabilityData";
import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import { AccessTypes } from "../../core/utils/types/entities";

export interface AvailabilityLabelProps {
  manifestText: string;
  accessTypes: AccessTypeCodeEnum[];
  access: AccessTypes[];
  selected?: boolean;
  url?: URL;
  faustIds: FaustId[];
  handleSelectManifestation?: () => void | undefined;
  cursorPointer?: boolean;
  dataCy?: string;
  isbns: string[];
  isVisualOnly?: boolean;
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
  isbns,
  isVisualOnly
}) => {
  const { track } = useStatistics();
  const t = useText();

  const { isLoading, isAvailable } = useAvailabilityData({
    accessTypes,
    access,
    faustIds,
    isbn: first(isbns) || null,
    manifestText
  });

  const availabilityText = isAvailable
    ? t("availabilityAvailableText")
    : t("availabilityUnavailableText");

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

  if (isVisualOnly) {
    return (
      <div className={parentClass} data-cy={dataCy}>
        {availabilityLabel}
      </div>
    );
  }

  if (url && !handleSelectManifestation) {
    return (
      <LinkNoStyle className={parentClass} url={url} data-cy={dataCy}>
        {availabilityLabel}
      </LinkNoStyle>
    );
  }

  return (
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
