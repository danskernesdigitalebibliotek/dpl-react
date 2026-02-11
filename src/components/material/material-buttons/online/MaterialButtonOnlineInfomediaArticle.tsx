import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { useConfig } from "../../../../core/utils/config";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { infomediaModalId } from "../../infomedia/InfomediaModal";
import { isResident } from "../../../../core/utils/helpers/userInfo";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonDisabled from "../generic/MaterialButtonDisabled";
import useUserInfo from "../../../../core/adgangsplatformen/useUserInfo";
import { isAnonymous } from "../../../../core/utils/helpers/user";

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
  const u = useUrls();
  const config = useConfig();
  const authUrl = u("authUrl");
  const siteAgencyId = config("agencyIdConfig");

  const { isLoading: isLoadingUserInfo, data: userInfo } = useUserInfo({
    enabled: !isAnonymous()
  });
  const { openGuarded } = useModalButtonHandler();
  const isUserResident =
    userInfo && siteAgencyId ? isResident(userInfo, siteAgencyId) : null;

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

  if (isLoadingUserInfo) {
    return <MaterialButtonLoading />;
  }

  if (isUserResident === false) {
    return (
      <MaterialButtonDisabled
        size={size}
        label={t("cantViewText")}
        reason={t("notLivingInMunicipalityText")}
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
      size={size || "large"}
      onClick={onClick}
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonOnlineInfomediaArticle;
