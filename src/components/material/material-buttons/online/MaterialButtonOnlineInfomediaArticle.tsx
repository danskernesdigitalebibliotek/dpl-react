import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineInfomediaArticleProps {
  infomediaArticleId: string;
  size?: ButtonSize;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({ infomediaArticleId, size }) => {
  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  const t = useText();

  if (!isRegistered) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = () => {
    // TODO: view the article in full text
    // eslint-disable-next-line
    console.log(infomediaArticleId);
  };

  return (
    <Button
      label={t("readArticleText")}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size={size || "large"}
      onClick={onClick}
    />
  );
};

export default MaterialButtonOnlineInfomediaArticle;
