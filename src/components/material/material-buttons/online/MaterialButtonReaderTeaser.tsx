import React from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";

type MaterialButtonOnlineTeaserType = {
  identifier: string;
};

const MaterialButtonReaderTeaser = ({
  identifier
}: MaterialButtonOnlineTeaserType) => {
  const t = useText();
  const { open } = useModalButtonHandler();

  const onClick = () => {
    open(`reader-modal-${identifier}`);
  };

  return (
    <button
      className="btn-primary btn-outline btn-large arrow__hover--right-small "
      type="button"
      onClick={onClick}
    >
      {t("onlineMaterialTeaserText")}
    </button>
  );
};

export default MaterialButtonReaderTeaser;
