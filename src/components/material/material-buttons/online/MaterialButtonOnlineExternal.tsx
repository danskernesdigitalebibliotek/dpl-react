import React, { useState, FC, useEffect } from "react";
import { useProxyUrlGET } from "../../../../core/dpl-cms/dpl-cms";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { LinkNoStyle } from "../../../atoms/link-no-style";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineExternalProps {
  loginRequired: boolean;
  externalUrl: string;
  origin: string;
  size?: ButtonSize;
  trackOnlineView: () => void;
}

const MaterialButtonOnlineExternal: FC<MaterialButtonOnlineExternalProps> = ({
  loginRequired,
  externalUrl = "",
  origin,
  size,
  trackOnlineView
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

  return (
    <LinkNoStyle url={translatedUrl}>
      <Button
        label={`${t("goToText")} ${origin}`}
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
