import React, { FC } from "react";
import { useText } from "../../../core/utils/text";

interface AdditionalFeesButtonProps {
  additionalFees: number;
  screenReaderLabel: string;
  showOn: "mobile" | "desktop";
}

const AdditionalFeesButton: FC<AdditionalFeesButtonProps> = ({
  additionalFees,
  screenReaderLabel,
  showOn
}) => {
  const t = useText();
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
        aria-describedby={`materials-modal-${showOn}-text`}
        className={`list-reservation__note-${showOn}`}
      >
        + {additionalFees} {t("otherMaterialsText")}
      </button>
    </>
  );
};

export default AdditionalFeesButton;
