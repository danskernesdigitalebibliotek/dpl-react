import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonReserveOnlineInfomediaArticleProps {
  infomediaArticleId: string;
}

const MaterialButtonReserveOnlineInfomediaArticle: FC<
  MaterialButtonReserveOnlineInfomediaArticleProps
> = ({ infomediaArticleId }) => {
  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  const t = useText();

  if (!isRegistered) {
    return null;
  }

  const onClick = (articleId: string) => {
    // TODO: view the article in full text
  };

  return (
    <Button
      label={t("seeOnlineText")}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
      onClick={() => {
        onClick(infomediaArticleId);
      }}
    />
  );
};

export default MaterialButtonReserveOnlineInfomediaArticle;
