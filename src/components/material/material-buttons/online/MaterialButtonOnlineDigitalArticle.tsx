import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineDigitalArticleProps {
  digitalArticleIssn: string;
  isOnEditionCard?: boolean;
}

const MaterialButtonOnlineDigitalArticle: FC<
  MaterialButtonOnlineDigitalArticleProps
> = ({ digitalArticleIssn, isOnEditionCard }) => {
  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  const t = useText();

  if (!isRegistered) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = (articleIssn: string) => {
    // TODO: open modal and start registering flow for digital articles
  };

  if (isOnEditionCard) {
    return (
      <Button
        label={t("orderDigitalCopy")}
        buttonType="none"
        variant="filled"
        disabled={false}
        collapsible={false}
        size="small"
        onClick={() => {
          onClick(digitalArticleIssn);
        }}
      />
    );
  }

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

export default MaterialButtonOnlineDigitalArticle;
