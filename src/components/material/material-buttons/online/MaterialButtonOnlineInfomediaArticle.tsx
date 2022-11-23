import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { Button } from "../../../Buttons/Button";
import { infomediaModalId } from "../../infomedia/InfomediaModal";

export interface MaterialButtonOnlineInfomediaArticleProps {
  size?: ButtonSize;
  manifestation: Manifestation;
  trackOnlineView: () => void;
  dataCy?: string;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({
  size,
  manifestation: { pid },
  trackOnlineView,
  dataCy = "material-button-online-infomedia-article"
}) => {
  const t = useText();
  const dispatch = useDispatch();

  const onClick = () => {
    trackOnlineView();
    dispatch(openModal({ modalId: infomediaModalId(pid) }));
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
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonOnlineInfomediaArticle;
