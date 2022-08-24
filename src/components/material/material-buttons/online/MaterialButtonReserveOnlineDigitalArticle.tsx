import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonReserveOnlineDigitalArticleProps {
  digitalArticleIssn: string;
}

const MaterialButtonReserveOnlineDigitalArticle: FC<
  MaterialButtonReserveOnlineDigitalArticleProps
> = ({ digitalArticleIssn }) => {
  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  const t = useText();

  if (!isRegistered) {
    return null;
  }

  const onClick = (articleIssn: string) => {
    // TODO: open modal and start registering flow for digital articles
  };

  return (
    <Button
      label={t("orderDigitalCopy")}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
      onClick={() => {
        onClick(digitalArticleIssn);
      }}
    />
  );
};

export default MaterialButtonReserveOnlineDigitalArticle;
