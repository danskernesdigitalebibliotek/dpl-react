import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { reservationModalId } from "../../../../apps/material/helper";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Pid } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { useEventStatistics } from "../../../../core/statistics/useStatistics";
import { statistics } from "../../../../core/statistics/statistics";
import { first } from "lodash";
import { convertPostIdsToFaustIds } from "../../../../core/utils/helpers/general";

export interface MaterialButtonPhysicalProps {
  manifestationMaterialType: string;
  size?: ButtonSize;

  dataCy?: string;
  isSpecificManifestation?: boolean;
  pids: Pid[];
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  manifestationMaterialType,
  size,
  dataCy = "material-button-physical",
  isSpecificManifestation,
  pids
}) => {
  const { track } = useEventStatistics();
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");
  const faustIds = convertPostIdsToFaustIds(pids);
  const { openGuarded } = useModalButtonHandler();

  const onClick = () => {
    if (isSpecificManifestation && first(pids)) {
      track("click", {
        id: statistics.reserveSpecificManifestation.id,
        name: statistics.reserveSpecificManifestation.name,
        trackedData: `${first(pids)}`
      });
    }
    openGuarded({
      authUrl,
      modalId: reservationModalId(faustIds)
    });
  };

  return (
    <Button
      classNames="reserve-button"
      dataCy={dataCy}
      label={
        size === "small"
          ? t("reserveText")
          : `${t("reserveWithMaterialTypeText", {
              placeholders: { "@materialType": manifestationMaterialType }
            })}`
      }
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size={size || "large"}
      onClick={onClick}
    />
  );
};

export default MaterialButtonPhysical;
