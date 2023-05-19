import React, { useState, FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Pid } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { createDigitalModalId } from "../../digital-modal/helper";
import { useGetPatronInformationByPatronIdV2 } from "../../../../core/fbs/fbs";
import { isAnonymous } from "../../../../core/utils/helpers/user";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonDisabled from "../generic/MaterialButtonDisabled";

export interface MaterialButtonOnlineDigitalArticleProps {
  pid: Pid;
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonOnlineDigitalArticle: FC<
  MaterialButtonOnlineDigitalArticleProps
> = ({ pid, size, dataCy = "material-button-online-digital-article" }) => {
  const [isResident, setIsResident] = useState<null | boolean>(null);
  const { isLoading } = useGetPatronInformationByPatronIdV2({
    enabled: !isAnonymous(),
    onSuccess: (data) => {
      if (data?.patron?.resident !== undefined) {
        setIsResident(data.patron.resident);
      }
    }
  });
  const { openGuarded } = useModalButtonHandler();
  const t = useText();
  const { authUrl } = useUrls();

  const onClick = () => {
    openGuarded({
      authUrl,
      modalId: createDigitalModalId(pid)
    });
  };

  if (isLoading) {
    return <MaterialButtonLoading />;
  }

  if (isResident === false) {
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
