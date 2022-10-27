import React, { useEffect, useState } from "react";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import { CampaignMatchPOST200 } from "../../core/dpl-cms/model";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import Campaign from "../campaign/campaign";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: Work[];
}
const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  const { mutate } = useCampaignMatchPOST();
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
  useEffect(() => {
    mutate(
      {
        data: [
          {
            name: "language",
            values: [
              {
                key: "dansk",
                term: "dansk",
                score: 2
              }
            ]
          }
        ]
      },
      {
        onSuccess: (data) => {
          setCampaignData(data);
        },
        onError: () => {
          // TODO: when we handle errors - handle this error
        }
      }
    );
  }, [mutate]);

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
