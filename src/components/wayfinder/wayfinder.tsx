import React from "react";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";
import { useText, withText } from "../../core/utils/text";
import IconLocation from "../icon-location/icon-location";
import { getBaseUrl as getWayfinderBaseUrl } from "../find-on-shelf/getWayfinder";
import { WayfinderReaponse } from "./wayfinder-types";

const Wayfinder: React.FC<WayfinderReaponse> = ({ viewId, link }) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  let language = document.querySelector("html")?.getAttribute("lang") || "";
  if (language) {
    language = `&lang=${language}`;
  }

  if (viewId == null || link == null) {
    return null;
  }

  return (
    <div className="dpl-wayfinder">
      <button
        className="drl-wayfinder-button"
        type="button"
        onClick={() => {
          open(viewId);
        }}
      >
        <IconLocation />
      </button>

      <Modal
        modalId={viewId}
        screenReaderModalDescriptionText={t("wayfinderModalDescriptionText")}
        closeModalAriaLabelText={t("wayfinderCloseModalLabelText")}
        isFullScreen
      >
        <iframe
          className="dpl-wayfinder-iframe"
          title="iframeModal"
          src={`${getWayfinderBaseUrl()}${link}${language}`}
        />
      </Modal>
    </div>
  );
};

export default withText(Wayfinder);
