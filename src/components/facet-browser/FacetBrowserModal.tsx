import React, { useState } from "react";
import { formatFilters } from "../../apps/search-result/helpers";
import {
  FilterItemTerm,
  TagOnclickHandler
} from "../../apps/search-result/types";
import {
  FacetResult,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import { isObjectEmpty } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import FacetBrowserModalBody from "./FacetBrowserModalBody";
import { allFacetFields } from "./helper";

export const FacetBrowserModalId = "facet-browser-modal";

interface FacetBrowserModalProps {
  q: string;
  filterHandler: TagOnclickHandler;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
}

const FacetBrowserModal: React.FunctionComponent<FacetBrowserModalProps> = ({
  q,
  filterHandler,
  filters
}) => {
  const t = useText();
  const [openFacets, setOpenFacets] = useState<string[]>([]);

  const { data, isLoading } = useSearchFacetQuery({
    q: { all: q },
    facets: allFacetFields,
    facetLimit: 10,
    ...(isObjectEmpty(filters)
      ? {}
      : { filters: { ...formatFilters(filters) } })
  });

  return (
    <Modal
      classNames="modal-right modal--no-padding"
      modalId={FacetBrowserModalId}
      screenReaderModalDescriptionText={t(
        "facetBrowserModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("facetBrowserModalCloseModalAriaLabelText")}
    >
      {isLoading || !data ? null : (
        <FacetBrowserModalBody
          facets={data.search.facets as FacetResult[]}
          filterHandler={filterHandler}
          filters={filters}
          openFacets={openFacets}
          setOpenFacets={setOpenFacets}
        />
      )}
    </Modal>
  );
};

export default FacetBrowserModal;
