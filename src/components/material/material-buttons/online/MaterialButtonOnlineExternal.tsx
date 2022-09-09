import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { LinkNoStyle } from "../../../atoms/link-no-style";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineExternalProps {
  externalUrl: string;
  origin: string;
  size?: ButtonSize;
}

const MaterialButtonOnlineExternal: FC<MaterialButtonOnlineExternalProps> = ({
  externalUrl = "https://google.com",
  origin,
  size
}) => {
  const t = useText();
  const externalLinkObject = new URL(externalUrl);

  return (
    <LinkNoStyle url={externalLinkObject}>
      <Button
        label={`${t("goToText")} ${origin}`}
        buttonType="external-link"
        variant="filled"
        disabled={false}
        collapsible={false}
        size={size || "large"}
        classNames="invert"
      />
    </LinkNoStyle>
  );
};

export default MaterialButtonOnlineExternal;
