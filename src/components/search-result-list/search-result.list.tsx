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
            name: "mainLanguages",
            values: [
              {
                key: "eng",
                term: "Engelsk",
                score: 30805
              },
              {
                key: "dan",
                term: "Dansk",
                score: 7543
              },
              {
                key: "ger",
                term: "Tysk",
                score: 2465
              },
              {
                key: "mul",
                term: "flere sprog",
                score: 1510
              },
              {
                key: "swe",
                term: "Svensk",
                score: 1140
              }
            ]
          },
          {
            name: "materialTypes",
            values: [
              {
                key: "bog",
                term: "bog",
                score: 17832
              },
              {
                key: "artikel",
                term: "artikel",
                score: 11768
              },
              {
                key: "cd (musik)",
                term: "cd (musik)",
                score: 2988
              },
              {
                key: "grammofonplade",
                term: "grammofonplade",
                score: 2591
              },
              {
                key: "ebog",
                term: "e-bog",
                score: 2538
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
          setCampaignData({
            data: {
              text: "Have you ever wanted to not be alone? This is a fake campaign, so try it today! 🏆",
              image: {
                url: "https://picsum.photos/id/777/300/200",
                alt: "I am an image."
              },
              url: "http://localhost/?path=/story/apps-search-result--search-result"
            }
          });
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
