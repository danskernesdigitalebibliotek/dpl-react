import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { LinkNoStyle } from "../../../atoms/link-no-style";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineExternalProps {
  externalUrl: string;
  origin: string;
  isOnEditionCard?: boolean;
}

const MaterialButtonOnlineExternal: FC<MaterialButtonOnlineExternalProps> = ({
  externalUrl = "https://google.com",
  origin,
  isOnEditionCard
}) => {
  const t = useText();
  const externalLinkObject = new URL(externalUrl);

  if (isOnEditionCard) {
    return (
      <LinkNoStyle url={externalLinkObject}>
        <Button
          label={`${t("goToText")} ${origin}`}
          buttonType="external-link"
          variant="filled"
          disabled={false}
          collapsible={false}
          size="small"
          classNames="invert"
        />
      </LinkNoStyle>
    );
  }

  return (
    <LinkNoStyle url={externalLinkObject}>
      <Button
        label={`${t("goToText")} ${origin}`}
        buttonType="external-link"
        variant="filled"
        disabled={false}
        collapsible={false}
        size="large"
        classNames="invert"
      />
    </LinkNoStyle>
  );
};

export default MaterialButtonOnlineExternal;
