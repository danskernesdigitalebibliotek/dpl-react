import React, { useState } from "react";

import {
  formatFacetTerms,
  getPlaceHolderFacets,
  BowserFacets
} from "../../apps/search-result/helpers";
import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import {
  FacetResult,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import FacetBrowserModalBody from "./FacetBrowserModalBody";
import { useGetFacets } from "./helper";

export const FacetBrowserModalId = "facet-browser-modal";

interface FacetBrowserModalProps {
  q: string;
  filterHandler: TermOnClickHandler;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
}

const FacetBrowserModal: React.FunctionComponent<FacetBrowserModalProps> = ({
  q,
  filterHandler,
  filters
}) => {
  const t = useText();

  const { facets, isLoading } = useGetFacets(q, filters);

  return (
    <Modal
      classNames="modal-right modal--no-padding"
      modalId={FacetBrowserModalId}
      screenReaderModalDescriptionText={t(
        "facetBrowserModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("facetBrowserModalCloseModalAriaLabelText")}
    >
      {isLoading || !facets ? null : (
        <FacetBrowserModalBody
          facets={facets}
          filterHandler={filterHandler}
          filters={filters}
        />
      )}
    </Modal>
  );
};

export default FacetBrowserModal;
