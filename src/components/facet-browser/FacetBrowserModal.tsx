import React, { useState } from "react";
import { formatFilters } from "../../apps/search-result/helpers";
import {
  FilterItemTerm,
  TagOnclickHandler
} from "../../apps/search-result/types";
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

  const knownFacets = [
    FacetField.MainLanguages,
    FacetField.AccessTypes,
    FacetField.ChildrenOrAdults,
    FacetField.Creators,
    FacetField.FictionNonfiction,
    FacetField.FictionalCharacter,
    FacetField.GenreAndForm,
    FacetField.MaterialTypes,
    FacetField.Subjects,
    FacetField.WorkTypes
  ];

  const getPlaceHolderFacets = (facets: string[]) =>
    facets.map((facet) => ({
      name: facet,
      values: [
        {
          term: ""
        }
      ]
    }));

  const { data, isLoading } = useSearchFacetQuery(
    {
      q: { all: q },
      facets: knownFacets,
      facetLimit: 10,
      filters: formatFilters(filters)
    },
    {
      keepPreviousData: true,
      placeholderData: {
        search: {
          facets: getPlaceHolderFacets(knownFacets)
        }
      }
    }
  );

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
