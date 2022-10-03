import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineInfomediaArticleProps {
  size?: ButtonSize;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({ size }) => {
  const t = useText();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(openModal({ modalId: "infomediaModalId" }));
  };

  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  if (!isRegistered) {
    return null;
  }

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
