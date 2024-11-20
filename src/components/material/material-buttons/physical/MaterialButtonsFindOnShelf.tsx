import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId } from "../../../../core/utils/types/ids";
import MaterialSecondaryButton from "../generic/MaterialSecondaryButton";
import { findOnShelfModalId } from "../../../find-on-shelf/FindOnShelfModal";

export interface MaterialButtonsFindOnShelfProps {
  size?: ButtonSize;
  faustIds: FaustId[];
  dataCy?: string;
}

const MaterialButtonsFindOnShelf: FC<MaterialButtonsFindOnShelfProps> = ({
  size,
  faustIds,
  dataCy = "material-buttons-find-on-shelf"
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const modalId = findOnShelfModalId(faustIds);

  const onClick = () => {
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
