import * as React from "react";
import { FC } from "react";
import { Button } from "../../Buttons/Button";

const MaterialButtonLoading: FC = () => {
  return (
    <Button
      label="Loading"
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonLoading;
