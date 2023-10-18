import * as React from "react";
import { FC } from "react";
import { Button } from "../Buttons/Button";
import { useText } from "../../core/utils/text";
import { RequestStatus } from "../../core/utils/types/request";
import { getRenewButtonLabel } from "../../core/utils/helpers/renewal";

export interface LoansGroupModalButtonProps {
  materialsToRenew: string[];
  renewableMaterials: number;
  renewSelected: () => void;
  renewingStatus: RequestStatus;
}

const LoansGroupModalButton: FC<LoansGroupModalButtonProps> = ({
  materialsToRenew,
  renewableMaterials,
  renewSelected,
  renewingStatus
}) => {
  const t = useText();
  const materialsCount = materialsToRenew.length;
  const label = getRenewButtonLabel({
    isRenewable: renewableMaterials > 0,
    renewingStatus,
    t,
    defaultText: t("groupModalButtonText", {
      count: materialsCount,
      placeholders: { "@count": materialsCount }
    })
  });

  return (
    <Button
      dataCy="loans-group-modal-button"
      label={label}
      buttonType="none"
      id="renew-several"
      variant="filled"
      disabled={renewableMaterials === 0 || renewingStatus === "pending"}
      collapsible={false}
      onClick={renewSelected}
      size="small"
    />
  );
};

export default LoansGroupModalButton;
