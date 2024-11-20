import React from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import MaterialSecondaryButton from "../generic/MaterialSecondaryButton";

type MaterialButtonOnlineTeaserType = {
  identifier: string;
  size: ButtonSize;
  dataCy?: string;
};

const MaterialButtonReaderTeaser = ({
  identifier,
  size,
  dataCy = "material-buttons-reader-teaser"
}: MaterialButtonOnlineTeaserType) => {
  const t = useText();
  const { open } = useModalButtonHandler();

  const onClick = () => {
    open(`reader-modal-${identifier}`);
  };

  return (
    <MaterialSecondaryButton
      label={t("onlineMaterialTeaserText")}
      size={size}
      onClick={onClick}
      dataCy={dataCy}
      ariaDescribedBy={t("onlineMaterialTeaserText")}
    />
  );
};

export default MaterialButtonReaderTeaser;
