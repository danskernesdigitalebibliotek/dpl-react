import React from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import MaterialSecondaryLink from "../generic/MaterialSecondaryLink";

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

  return (
    <MaterialSecondaryLink
      url={new URL(`/reader?identifier=${identifier}`, window.location.href)}
      label={t("onlineMaterialTeaserText")}
      size={size}
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonReaderTeaser;
