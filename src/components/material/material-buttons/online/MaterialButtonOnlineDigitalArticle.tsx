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
import { isResident } from "../../../../core/utils/helpers/userInfo";
import useUserInfo from "../../../../core/adgangsplatformen/useUserInfo";
import { useConfig } from "../../../../core/utils/config";
import { isAnonymous } from "../../../../core/utils/helpers/user";

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
  const config = useConfig();
  const siteAgencyId = config("agencyIdConfig");

  const [isUserResident, setIsUserResident] = useState<null | boolean>(null);
  const { isLoading, data: userInfo } = useUserInfo({
    enabled: !isAnonymous()
  });

  const { openGuarded } = useModalButtonHandler();

  useDeepCompareEffect(() => {
    if (!userInfo) {
      return;
    }
    setIsUserResident(isResident(userInfo, siteAgencyId));
  }, [userInfo, siteAgencyId]);

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
