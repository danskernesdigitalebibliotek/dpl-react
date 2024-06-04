import React from "react";
import useFilterHandler from "../../apps/search-result/useFilterHandler";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import FacetBrowserModalBody from "./FacetBrowserModalBody";
import { FacetBrowserModalId, useGetFacets } from "./helper";

interface FacetBrowserModalProps {
  q: string;
}

const FacetBrowserModal: React.FunctionComponent<FacetBrowserModalProps> = ({
  q
}) => {
  const t = useText();
  const { filters } = useFilterHandler();
  const { facets, isLoading } = useGetFacets(q, filters);

  return (
    <Modal
      classNames="modal-right modal--no-padding"
      modalId={FacetBrowserModalId}
      screenReaderModalDescriptionText={t(
        "facetBrowserModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("facetBrowserModalCloseModalAriaLabelText")}
      isSlider
    >
      {isLoading || !facets ? null : <FacetBrowserModalBody facets={facets} />}
    </Modal>
  );
};

export default FacetBrowserModal;
