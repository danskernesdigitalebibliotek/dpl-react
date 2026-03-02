import React, { memo } from "react";
import { first } from "lodash";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../core/utils/text";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import { useCollectPageStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import {
  getParentAvailabilityLabelClass,
  isNonPhysicalForAvailabilityLabel
} from "./helper";
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
  const { collectPageStatistics } = useCollectPageStatistics();
  const t = useText();

  const { isLoading, isAvailable } = useAvailabilityData({
    accessTypes,
    access,
    faustIds,
    isbn: first(isbns) || null,
    manifestText
  });

  const getAvailabilityText = () => {
    if (!isAvailable) {
      return t("availabilityUnavailableText");
    }
    // Use different text for physical vs non-physical materials when available
    return isNonPhysicalForAvailabilityLabel(accessTypes, access)
      ? t("availabilityAvailableText")
      : t("availabilityAvailablePhysicalText");
  };

  const availabilityText = getAvailabilityText();

  useDeepCompareEffect(() => {
    // Track material availability (status) if the button is active - also meaning
    // it is displayed on the material page and represent the active manifestation
    // material type
    if (selected && !isLoading) {
      collectPageStatistics({
        ...statistics.materialStatus,
        trackedData: availabilityText
      });
    }
  }, [availabilityText, collectPageStatistics, faustIds, isLoading, selected]);

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
