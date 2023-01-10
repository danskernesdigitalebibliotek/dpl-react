import * as React from "react";
import { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId } from "../../../../core/utils/types/ids";
import { Button } from "../../../Buttons/Button";
import { findOnShelfModalId } from "../../../find-on-shelf/FindOnShelfModal";

export interface MaterialButtonsFindOnShelfProps {
  size?: ButtonSize;
  faustIds: FaustId[];
  dataCy?: string;
}

const MaterialButtonsFindOnShelf: FC<MaterialButtonsFindOnShelfProps> = ({
  size,
  faustIds,
  dataCy = "material-buttons-find-on-shelf"
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const onClick = () => {
    open(findOnShelfModalId(faustIds[0]));
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
        label={t("findOnBookshelfText")}
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
      aria-describedby={t("findOnShelfExpandButtonExplanationText")}
      onClick={onClick}
      onKeyUp={(e) => onKeyUp(e.key)}
      tabIndex={0}
      type="button"
      data-cy={dataCy}
    >
      {t("findOnBookshelfText")}
    </button>
  );
};

export default MaterialButtonsFindOnShelf;
