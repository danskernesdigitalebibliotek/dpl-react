import React from "react";
import { ContentSublevelLast } from "./types";
import { EntryDetails } from "./EntryDetails";

interface SubLevel2Props {
  item: ContentSublevelLast;
}

export const SubLevel2: React.FC<SubLevel2Props> = ({ item }) => (
  <li className="material-content__item material-content__item--level-3">
    <div className="material-content__item-content">
      <span className="material-content__title">{item.title.display}</span>
      <EntryDetails
        contributors={item.contributors ?? undefined}
        playingTime={item.playingTime}
      />
    </div>
  </li>
);
