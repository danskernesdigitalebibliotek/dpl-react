import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId, WorkId } from "../../../../core/utils/types/ids";
import MaterialSecondaryButton from "../generic/MaterialSecondaryButton";
import { findOnShelfModalId } from "../../../find-on-shelf/FindOnShelfModal";
import { useTrackStatistics } from "../../../../core/statistics/useStatistics";
import { statistics } from "../../../../core/statistics/statistics";

export interface MaterialButtonsFindOnShelfProps {
  size?: ButtonSize;
  faustIds: FaustId[];
  dataCy?: string;
  workId: WorkId;
}

const MaterialButtonsFindOnShelf: FC<MaterialButtonsFindOnShelfProps> = ({
  size,
  faustIds,
  dataCy = "material-buttons-find-on-shelf",
  workId
}) => {
  const { track } = useTrackStatistics();

  const t = useText();
  const { open } = useModalButtonHandler();
  const modalId = findOnShelfModalId(faustIds);

  const onClick = () => {
    track("click", {
      id: statistics.findOnShelf.id,
      name: statistics.findOnShelf.name,
      trackedData: workId
    });
    open(modalId);
  };

  return (
    <MaterialSecondaryButton
      label={t("findOnBookshelfText")}
      size={size || "large"}
      onClick={onClick}
      dataCy={dataCy}
      ariaDescribedBy={t("findOnShelfExpandButtonExplanationText")}
    />
  );
};

export default MaterialButtonsFindOnShelf;
