import * as React from "react";
import { FC } from "react";
import { Button } from "../../Buttons/Button";

const MaterialButtonCantReserve: FC = () => {
  return (
    <Button
      label="Kan ej reserveres"
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonCantReserve;
