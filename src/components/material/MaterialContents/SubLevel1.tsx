import React, { useState } from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { ContentSublevel } from "./types";
import { EntryDetails } from "./EntryDetails";
import { SubLevel2 } from "./SubLevel2";

interface SubLevel1Props {
  item: ContentSublevel;
}

export const SubLevel1: React.FC<SubLevel1Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSublevels = item.sublevel && item.sublevel.length > 0;

  const itemContent = (
    <>
      <div className="material-content__main-line">
        <span className="material-content__title">{item.title.display}</span>
        <EntryDetails playingTime={item.playingTime} />
      </div>
      {item.contributors && item.contributors.length > 0 && (
        <div className="material-content__secondary-line">
          <span className="material-content__contributors">
            ({item.contributors.join(", ")})
          </span>
        </div>
      )}
    </>
  );

  if (!hasSublevels) {
    return (
      <li className="material-content__item material-content__item--level-2">
        <div className="material-content__item-content">{itemContent}</div>
      </li>
    );
  }

  return (
    <li className="material-content__item material-content__item--level-2">
      <details open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary className="material-content__summary">
          <div className="material-content__summary-content">{itemContent}</div>
          <img src={ExpandIcon} alt="" className="material-content__icon" />
        </summary>
        <ol className="material-content__list material-content__list--level-3">
          {item.sublevel?.map((sublevel2, idx) => (
            <SubLevel2 key={idx} item={sublevel2} />
          ))}
        </ol>
      </details>
    </li>
  );
};
