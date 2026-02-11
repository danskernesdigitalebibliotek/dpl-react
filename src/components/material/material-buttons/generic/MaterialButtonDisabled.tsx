import * as React from "react";
import { FC } from "react";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonDisabledProps {
  label: string;
  reason?: string;
  size?: ButtonSize;
  dataCy?: string;
  classNames?: string;
}

const MaterialButtonDisabled: FC<MaterialButtonDisabledProps> = ({
  label,
  reason,
  size,
  dataCy = "material-header-buttons-cant-reserve",
  classNames
}) => {
  return (
    <>
      <Button
        classNames={classNames}
        label={label}
        buttonType="none"
        variant="filled"
        disabled
        collapsible={false}
        size={size || "large"}
        dataCy={dataCy}
      />
      {reason && (
        <p className="text-small-caption mt-16" role="alert">
          {reason}
        </p>
      )}
    </>
  );
};

export default MaterialButtonDisabled;
