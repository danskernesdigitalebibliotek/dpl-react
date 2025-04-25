import React, { useState, FC } from "react";
import { useDeepCompareEffect } from "react-use";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Pid } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { createDigitalModalId } from "../../digital-modal/helper";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonDisabled from "../generic/MaterialButtonDisabled";
import { isResident } from "../../../../core/utils/helpers/user";
import { usePatronData } from "../../../../core/utils/helpers/usePatronData";

export interface MaterialButtonOnlineDigitalArticleProps {
  pid: Pid;
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonOnlineDigitalArticle: FC<
  MaterialButtonOnlineDigitalArticleProps
> = ({ pid, size, dataCy = "material-button-online-digital-article" }) => {
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");

  const [isUserResident, setIsUserResident] = useState<null | boolean>(null);
  const { isLoading, data: userData } = usePatronData();
  const { openGuarded } = useModalButtonHandler();

  useDeepCompareEffect(() => {
    if (!userData) {
      return;
    }
    setIsUserResident(isResident(userData));
  }, [userData]);

  const onClick = () => {
    openGuarded({
      authUrl,
      modalId: createDigitalModalId(pid)
    });
  };

  if (isLoading) {
    return <MaterialButtonLoading />;
  }

  if (isUserResident === false) {
    return (
      <MaterialButtonDisabled
        label={t("cantViewText")}
        reason={t("notLivingInMunicipalityText")}
        size={size}
      />
    );
  }

  return (
    <Button
      label={t("orderDigitalCopyButtonText")}
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
