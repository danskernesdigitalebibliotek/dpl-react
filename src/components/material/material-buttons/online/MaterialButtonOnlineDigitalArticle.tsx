import * as React from "react";
import { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Pid } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { createDigitalModalId } from "../../digital-modal/helper";

export interface MaterialButtonOnlineDigitalArticleProps {
  pid: Pid;
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonOnlineDigitalArticle: FC<
  MaterialButtonOnlineDigitalArticleProps
> = ({ pid, size, dataCy = "material-button-online-digital-article" }) => {
  const { openGuarded } = useModalButtonHandler();
  const t = useText();
  const { authUrl } = useUrls();

  const onClick = () => {
    openGuarded({
      authUrl,
      modalId: createDigitalModalId(pid)
    });
  };

  return (
    <Button
      label={t("orderDigitalCopy")}
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

export default MaterialButtonOnlineDigitalArticle;
