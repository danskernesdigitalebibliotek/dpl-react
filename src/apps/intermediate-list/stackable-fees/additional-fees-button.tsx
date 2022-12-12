import React, { useCallback, FC, MouseEvent } from "react";

interface AdditionalFeesButtonProps {
  additionalFees: number;
  // openDueDateModal: () => void;
  label: string;
  screenReaderLabel: string;
  showOn: "mobile" | "desktop";
}

const AdditionalFeesButton: FC<AdditionalFeesButtonProps> = ({
  additionalFees,
  // openDueDateModal,
  label,
  screenReaderLabel,
  showOn
}) => {
  // const openDueDateModalCallBack = useCallback(
  //   (e: MouseEvent) => {
  //     e.stopPropagation();
  //     openDueDateModal();
  //   },
  //   [openDueDateModal]
  // );
  if (additionalFees < 1) return <div />;

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
        // onClick={(e) => openDueDateModalCallBack(e)}
        aria-describedby={`materials-modal-${showOn}-text`}
        className={`list-reservation__note-${showOn}`}
      >
        + {additionalFees} {label}
      </button>
    </>
  );
};

export default AdditionalFeesButton;
