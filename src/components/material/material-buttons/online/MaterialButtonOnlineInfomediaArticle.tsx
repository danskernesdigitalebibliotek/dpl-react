import * as React from "react";
import { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { infomediaModalId } from "../../infomedia/InfomediaModal";

export interface MaterialButtonOnlineInfomediaArticleProps {
  size?: ButtonSize;
  manifestations: Manifestation[];
  trackOnlineView: () => Promise<unknown>;
  dataCy?: string;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({
  size,
  manifestations,
  trackOnlineView,
  dataCy = "material-button-online-infomedia-article"
}) => {
  const t = useText();
  const { openGuarded } = useModalButtonHandler();
  const { authUrl } = useUrls();

  if (manifestations.length < 1) {
    return null;
  }

  // Although we may be passed multiple manifestations, there is only one button
  // and one infomedia article modal to open, as we only associate a singular article
  // with a given work as of now.
  const onClick = () => {
    openGuarded({
      authUrl,
      modalId: infomediaModalId(manifestations[0].pid),
      trackOnlineView
    });
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
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonOnlineInfomediaArticle;
