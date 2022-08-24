import * as React from "react";
import { FC } from "react";
import { redirectTo } from "../../../../core/utils/helpers/url";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonReserveOnlineExternalProps {
  externalUrl: string;
  origin: string;
}

const MaterialButtonReserveOnlineExternal: FC<
  MaterialButtonReserveOnlineExternalProps
> = ({ externalUrl, origin }) => {
  const t = useText();

  const onClick = (externalLink: string) => {
    const externalLinkObject = new URL(externalLink);
    redirectTo(externalLinkObject);
  };

  return (
    <Button
      label={`${t("goToText")} ${origin}`}
      buttonType="external-link"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
      onClick={() => {
        onClick(externalUrl);
      }}
      classNames="invert"
    />
  );
};

export default MaterialButtonReserveOnlineExternal;
