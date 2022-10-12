import React, { useCallback, FC, MouseEvent } from "react";

interface AdditionalMaterialsButtonProps {
  additionalMaterials: number;
  openDueDateModal: () => void;
  label: string;
  screenReaderLabel: string;
  showOn: "mobile" | "desktop";
}

const AdditionalMaterialsButton: FC<AdditionalMaterialsButtonProps> = ({
  additionalMaterials,
  openDueDateModal,
  label,
  screenReaderLabel,
  showOn
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
        id={`materials-modal-${showOn}-text`}
      >
        {screenReaderLabel}
      </div>
      <button
        type="button"
        onClick={(e) => openDueDateModalCallBack(e)}
        aria-describedby={`materials-modal-${showOn}-text`}
        id={`test-additional-materials-${showOn}`}
        className={`list-reservation__note-${showOn}`}
      >
        + {additionalMaterials} {label}
      </button>
    </>
  );
};

export default AdditionalMaterialsButton;
