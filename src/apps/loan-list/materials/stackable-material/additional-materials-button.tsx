import React, { useCallback, FC, MouseEvent } from "react";
import { useText } from "../../../../core/utils/text";

interface AdditionalMaterialsButtonProps {
  additionalMaterials: number;
  openDueDateModal: () => void;
  showOn: "mobile" | "desktop";
}

const AdditionalMaterialsButton: FC<AdditionalMaterialsButtonProps> = ({
  additionalMaterials,
  openDueDateModal,
  showOn
}) => {
  const t = useText();
  const openDueDateModalCallBack = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      openDueDateModal();
    },
    [openDueDateModal]
  );

  if (additionalMaterials < 1) return <div />;

  return (
    <button
      type="button"
      onClick={(e) => openDueDateModalCallBack(e)}
      // in loan-list-items.tsx
      aria-describedby="materials-modal-text"
      className={`list-reservation__note-${showOn}`}
    >
      {t("loanListAdditionalMaterialsText", {
        count: additionalMaterials,
        placeholders: { "@count": additionalMaterials }
      })}
    </button>
  );
};

export default AdditionalMaterialsButton;
