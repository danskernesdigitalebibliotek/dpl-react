import React, { useEffect, useState } from "react";
import { formatFilters } from "../../apps/search-result/helpers";
import { FilterItemTerm } from "../../apps/search-result/types";
import {
  FacetField,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import {
  CampaignMatchPOST200,
  CampaignMatchPOSTBodyItem
} from "../../core/dpl-cms/model";
import { getCoverTint, isObjectEmpty } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import Campaign from "../campaign/Campaigns";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: Work[];
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
  q: string;
}

export const allFacetFields = [
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

const SearchResultList: React.FC<SearchResultListProps> = ({
  resultItems,
  filters,
  q
}) => {
  const { mutate } = useCampaignMatchPOST();
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
  const { data } = useSearchFacetQuery({
    q: { all: q },
    facets: allFacetFields,
    facetLimit: 10,
    ...(isObjectEmpty(filters)
      ? {}
      : { filters: { ...formatFilters(filters) } })
  });

  useEffect(() => {
    if (data) {
      mutate(
        {
          data: data.search.facets as CampaignMatchPOSTBodyItem[]
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          },
          onError: () => {
            // TODO: when we handle errors - handle this error
          }
        }
      );
    }
  }, [mutate, data]);

  return (
    <ul className="search-result-page__list my-32">
      {campaignData && campaignData.data && (
        <Campaign campaignData={campaignData.data} />
      )}
      {resultItems.map((item, i) => (
        <li key={item.workId}>
          <SearchResultListItem item={item} coverTint={getCoverTint(i)} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResultList;
