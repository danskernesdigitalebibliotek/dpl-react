import React, { FC } from "react";
import { Button } from "../../../Buttons/Button";
import { ButtonSize } from "../../../../core/utils/types/button";

interface MaterialSecondaryButtonProps {
  label: string;
  size: ButtonSize;
  onClick: () => void;
  dataCy?: string;
  ariaDescribedBy: string;
}

const MaterialSecondaryButton: FC<MaterialSecondaryButtonProps> = ({
  label,
  size,
  onClick,
  dataCy,
  ariaDescribedBy
}) => {
  // If element is currently focused on, we would like to let users open it using enter
  const handleKeyUp = (key: string) => {
    if (key === "Enter") {
      onClick();
    }
  };

  if (size !== "small") {
    return (
      <Button
        label={label}
        buttonType="none"
        variant="outline"
        disabled={false}
        collapsible={false}
        size="large"
        onClick={onClick}
        dataCy={dataCy}
        ariaDescribedBy={ariaDescribedBy}
      />
    );
  }

  return (
    <button
      className="link-tag text-small-caption material-manifestation-item__find capitalize-all btn-ui"
      aria-describedby={ariaDescribedBy}
      onClick={onClick}
      onKeyUp={(e) => handleKeyUp(e.key)}
      tabIndex={0}
      type="button"
      data-cy={dataCy}
    >
      {label}
    </button>
  );
};

export default MaterialSecondaryButton;
