import React from "react";
import {
  FacetField,
  FacetResult,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import FacetBrowserModalBody from "./FacetBrowserModalBody";

export const FacetBrowserModalId = "facet-browser-modal";

interface FacetBrowserModalProps {
  q: string;
}

const FacetBrowserModal: React.FunctionComponent<FacetBrowserModalProps> = ({
  q
}) => {
  const t = useText();

  const { data, isLoading, isError } = useSearchFacetQuery({
    q: { all: q },
    facets: [
      FacetField.AccessTypes,
      FacetField.ChildrenOrAdults,
      FacetField.Creators,
      FacetField.FictionNonfiction,
      FacetField.FictionalCharacter,
      FacetField.GenreAndForm,
      FacetField.MainLanguages,
      FacetField.MaterialTypes,
      FacetField.Subjects,
      FacetField.WorkTypes
    ],
    facetLimit: 10
  });

  if (isLoading || isError || !data) {
    return null;
  }

  return (
    <Modal
      classNames="modal-right modal--no-padding"
      modalId={FacetBrowserModalId}
      screenReaderModalDescriptionText={t(
        "facetBrowserModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("facetBrowserModalCloseModalAriaLabelText")}
    >
      {/* TODO Is it necessary to have "as FacetResult[]" ? */}
      <FacetBrowserModalBody facets={data.search.facets as FacetResult[]} />
    </Modal>
  );
};

export default FacetBrowserModal;
