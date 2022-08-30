import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineInfomediaArticleProps {
  infomediaArticleId: string;
  isOnEditionCard?: boolean;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({ infomediaArticleId, isOnEditionCard }) => {
  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  const t = useText();

  if (!isRegistered) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = (articleId: string) => {
    // TODO: view the article in full text
  };

  if (isOnEditionCard) {
    return (
      <Button
        label={t("readArticleText")}
        buttonType="none"
        variant="filled"
        disabled={false}
        collapsible={false}
        size="small"
        onClick={() => {
          onClick(infomediaArticleId);
        }}
      />
    );
  }

  return (
    <Button
      label={t("readArticleText")}
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

export default MaterialButtonOnlineInfomediaArticle;
