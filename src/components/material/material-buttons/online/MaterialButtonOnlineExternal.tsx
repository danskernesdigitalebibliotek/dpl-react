import React, { useState, FC, useEffect } from "react";
import {
  AccessUrl,
  MaterialType
} from "../../../../core/dbc-gateway/generated/graphql";
import { useProxyUrlGET } from "../../../../core/dpl-cms/dpl-cms";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { LinkNoStyle } from "../../../atoms/link-no-style";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineExternalProps {
  loginRequired: boolean;
  externalUrl: string;
  origin: string;
  size?: ButtonSize;
  trackOnlineView: () => void;
  manifestation: Manifestation;
  dataCy?: string;
}

export const getOnlineMaterialType = (
  sourceName: AccessUrl["origin"],
  materialTypes: MaterialType["specific"][]
) => {
  if (sourceName.includes("ereol")) {
    return "ebook";
  }
  if (sourceName.includes("filmstriben")) {
    return "emovie";
  }
  if (materialTypes.find((element) => element.includes("lydbog"))) {
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
  manifestation,
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
    <LinkNoStyle url={translatedUrl} dataCy={dataCy}>
      <Button
        label={label(
          origin,
          manifestation.materialTypes.map(
            (materialType) => materialType.specific
          )
        )}
        buttonType="external-link"
        variant="filled"
        disabled={false}
        collapsible={false}
        size={size || "large"}
        iconClassNames="invert"
        onClick={trackOnlineView}
      />
    </LinkNoStyle>
  );
};

export default MaterialButtonOnlineExternal;
