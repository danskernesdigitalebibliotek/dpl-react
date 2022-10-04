import React, { useCallback, FC, MouseEvent } from "react";
import { isMobile } from "react-device-detect";

interface AdditionalMaterialsButtonProps {
  additionalMaterials: number;
  openDueDateModal: () => void;
  label: string;
  screenReaderLabel: string;
}

const AdditionalMaterialsButton: FC<AdditionalMaterialsButtonProps> = ({
  additionalMaterials,
  openDueDateModal,
  label,
  screenReaderLabel
}) => {
  const openDueDateModalCallBack = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      openDueDateModal();
    },
    [openDueDateModal]
  );

  if (additionalMaterials < 1) return <div />;

  return (
    <>
      <div
        className="list-reservation__hidden-explanation"
        id={`materials-modal-${isMobile ? "mobile" : "desktop"}-text`}
      >
        {screenReaderLabel}
      </div>
      <button
        type="button"
        onClick={(e) => openDueDateModalCallBack(e)}
        aria-describedby={`materials-modal-${
          isMobile ? "mobile" : "desktop"
        }-text`}
        id="test-more-materials"
        className={`list-reservation__note-${isMobile ? "mobile" : "desktop"}`}
      >
        + {additionalMaterials} {label}
      </button>
    </>
  );
};

export default AdditionalMaterialsButton;
