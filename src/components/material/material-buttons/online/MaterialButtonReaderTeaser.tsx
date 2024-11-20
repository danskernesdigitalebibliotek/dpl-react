import React from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

type MaterialButtonOnlineTeaserType = {
  identifier: string;
  size: ButtonSize;
  dataCy?: string;
};

const MaterialButtonReaderTeaser = ({
  identifier,
  size,
  dataCy = "material-buttons-reader-teaser"
}: MaterialButtonOnlineTeaserType) => {
  const t = useText();
  const { open } = useModalButtonHandler();

  const onClick = () => {
    open(`reader-modal-${identifier}`);
  };

  // If element is currently focused on, we would like to let users open it using enter
  const onKeyUp = (key: string) => {
    if (key === "Enter") {
      onClick();
    }
  };

  if (size !== "small") {
    return (
      <Button
        label={t("onlineMaterialTeaserText")}
        buttonType="none"
        variant="outline"
        disabled={false}
        collapsible={false}
        size="large"
        onClick={onClick}
        dataCy={dataCy}
      />
    );
  }

  return (
    <button
      className="link-tag text-small-caption material-manifestation-item__find capitalize-all btn-ui"
      aria-describedby={t("onlineMaterialTeaserText")}
      onClick={onClick}
      onKeyUp={(e) => onKeyUp(e.key)}
      tabIndex={0}
      type="button"
      data-cy={dataCy}
    >
      {t("onlineMaterialTeaserText")}
    </button>
  );
};

export default MaterialButtonReaderTeaser;
