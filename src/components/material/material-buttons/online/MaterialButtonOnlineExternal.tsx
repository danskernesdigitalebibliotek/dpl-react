import React, { useState, FC, useEffect } from "react";
import {
  AccessUrl,
  MaterialType
} from "../../../../core/dbc-gateway/generated/graphql";
import { useProxyUrlGET } from "../../../../core/dpl-cms/dpl-cms";
import { getMaterialTypes } from "../../../../core/utils/helpers/general";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../../../core/utils/types/material-type";
import LinkButton from "../../../Buttons/LinkButton";
import MaterialButtonReaderTeaser from "./MaterialButtonReaderTeaser";
import { getManifestationIsbn } from "../../../../apps/material/helper";
import { hasReaderTeaser } from "../../../../apps/reader/helper";

export interface MaterialButtonOnlineExternalProps {
  externalUrl: string;
  origin: string;
  size?: ButtonSize;
  trackOnlineView: () => Promise<unknown>;
  manifestations: Manifestation[];
  dataCy?: string;
  ariaLabelledBy: string;
}

export const getOnlineMaterialType = (
  sourceName: AccessUrl["origin"],
  materialTypes: MaterialType["materialTypeSpecific"]["display"][]
) => {
  if (sourceName.toLowerCase().includes("ereol")) {
    return "ebook";
  }
  if (sourceName.toLowerCase().includes("filmstriben")) {
    return "emovie";
  }
  if (
    materialTypes.find((element) =>
      element.toLowerCase().includes(ManifestationMaterialType.audioBookGeneric)
    )
  ) {
    return "audiobook";
  }
  return "unknown";
};

const MaterialButtonOnlineExternal: FC<MaterialButtonOnlineExternalProps> = ({
  externalUrl = "",
  origin,
  size,
  trackOnlineView,
  manifestations,
  dataCy = "material-button-online-external",
  ariaLabelledBy
}) => {
  const [translatedUrl, setTranslatedUrl] = useState<URL>(new URL(externalUrl));
  const [urlWasTranslated, setUrlWasTranslated] = useState<boolean | null>(
    null
  );
  const t = useText();
  const { data, error } = useProxyUrlGET(
    { url: externalUrl },
    { enabled: urlWasTranslated === null && externalUrl.length > 0 }
  );

  // Update translatedUrl and reset urlWasTranslated when externalUrl changes
  useEffect(() => {
    setTranslatedUrl(new URL(externalUrl));
    setUrlWasTranslated(null);
  }, [externalUrl]);

  // Handle URL translation when data or error changes
  useEffect(() => {
    if (!urlWasTranslated && !error && data?.data?.url) {
      setTranslatedUrl(new URL(data.data.url));
      setUrlWasTranslated(true);
    }
  }, [data, error, urlWasTranslated]);

  const label = (
    sourceName: AccessUrl["origin"],
    materialTypes: MaterialType["materialTypeSpecific"]["display"][]
  ) => {
    const onlineMaterialType = getOnlineMaterialType(sourceName, materialTypes);
    switch (onlineMaterialType) {
      case "ebook":
        return t("goToText", { placeholders: { "@source": "ereolen" } });
      case "emovie":
        return t("goToText", { placeholders: { "@source": "filmstriben" } });
      case "audiobook":
        return t("listenOnlineText");
      default:
        return t("seeOnlineText");
    }
  };
  return (
    <>
      <LinkButton
        url={translatedUrl}
        buttonType="external-link"
        variant="filled"
        size={size || "large"}
        iconClassNames="invert"
        trackClick={trackOnlineView}
        dataCy={dataCy}
        ariaLabelledBy={ariaLabelledBy}
      >
        {label(origin, getMaterialTypes(manifestations))}
      </LinkButton>

      {hasReaderTeaser(manifestations) && (
        <MaterialButtonReaderTeaser
          size={size || "large"}
          identifier={getManifestationIsbn(manifestations[0])}
          dataCy={`${dataCy}-teaser`}
        />
      )}
    </>
  );
};

export default MaterialButtonOnlineExternal;
