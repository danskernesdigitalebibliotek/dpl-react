import * as React from "react";
import { FC } from "react";
import { Button } from "../Buttons/Button";
import { useText } from "../../core/utils/text";
import { getLoansGroupModalButtonLabel } from "./helper";
import { RequestStatus } from "../../core/utils/types/request";

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
  const label = getLoansGroupModalButtonLabel({
    status: renewingStatus,
    materialsCount: materialsToRenew.length,
    t
  });
  return (
    <Button
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
