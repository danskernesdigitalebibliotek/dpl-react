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
import MaterialTypes from "../../../../core/utils/types/material-type";
import LinkButton from "../../../Buttons/LinkButton";

export interface MaterialButtonOnlineExternalProps {
  loginRequired: boolean;
  externalUrl: string;
  origin: string;
  size?: ButtonSize;
  trackOnlineView: () => Promise<unknown>;
  manifestations: Manifestation[];
  dataCy?: string;
}

export const getOnlineMaterialType = (
  sourceName: AccessUrl["origin"],
  materialTypes: MaterialType["specific"][]
) => {
  if (sourceName.toLowerCase().includes("ereol")) {
    return "ebook";
  }
  if (sourceName.toLowerCase().includes("filmstriben")) {
    return "emovie";
  }
  if (
    materialTypes.find((element) =>
      element.toLowerCase().includes(MaterialTypes.audioBookGeneric)
    )
  ) {
    return "audiobook";
  }
  return "unknown";
};

const MaterialButtonOnlineExternal: FC<MaterialButtonOnlineExternalProps> = ({
  loginRequired,
  externalUrl = "",
  origin,
  size,
  trackOnlineView,
  manifestations,
  dataCy = "material-button-online-external"
}) => {
  const [translatedUrl, setTranslatedUrl] = useState<URL>(new URL(externalUrl));
  const [urlWasTranslated, setUrlWasTranslated] = useState<boolean | null>(
    null
  );
  const t = useText();
  const { data, error } = useProxyUrlGET(
    {
      url: externalUrl
    },
    {
      enabled:
        urlWasTranslated === null && loginRequired && externalUrl.length > 0
    }
  );

  useEffect(() => {
    if (urlWasTranslated) {
      return;
    }

    if (!error && data?.data?.url) {
      setTranslatedUrl(new URL(data.data.url));
      setUrlWasTranslated(true);
    }
  }, [data, error, translatedUrl, urlWasTranslated]);

  const label = (
    sourceName: AccessUrl["origin"],
    materialTypes: MaterialType["specific"][]
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
    <LinkButton
      url={translatedUrl}
      buttonType="external-link"
      variant="filled"
      size={size || "large"}
      iconClassNames="invert"
      trackClick={trackOnlineView}
      dataCy={dataCy}
    >
      {label(origin, getMaterialTypes(manifestations))}
    </LinkButton>
  );
};

export default MaterialButtonOnlineExternal;
