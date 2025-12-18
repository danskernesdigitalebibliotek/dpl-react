import React, { useState } from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { ContentEntry } from "./types";
import { EntryDetails } from "./EntryDetails";
import { SubLevel1 } from "./SubLevel1";

interface EntryItemProps {
  entry: ContentEntry;
}

export const EntryItem: React.FC<EntryItemProps> = ({ entry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSublevels = entry.sublevel && entry.sublevel.length > 0;

  if (!hasSublevels) {
    return (
      <li className="material-content__item material-content__item--level-1">
        <div className="material-content__item-content">
          <div className="material-content__main-line">
            <span className="material-content__title">
              {entry.title.display}
            </span>
            <EntryDetails
              creators={entry.creators}
              playingTime={entry.playingTime}
            />
          </div>
          {entry.contributors && entry.contributors.length > 0 && (
            <div className="material-content__secondary-line">
              <span className="material-content__contributors">
                ({entry.contributors.join(", ")})
              </span>
            </div>
          )}
        </div>
      </li>
    );
  }

  return (
    <li className="material-content__item material-content__item--level-1">
      <details open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary className="material-content__summary">
          <div className="material-content__summary-content">
            <div className="material-content__main-line">
              <span className="material-content__title">
                {entry.title.display}
              </span>
              <EntryDetails
                creators={entry.creators}
                playingTime={entry.playingTime}
              />
            </div>
            {entry.contributors && entry.contributors.length > 0 && (
              <div className="material-content__secondary-line">
                <span className="material-content__contributors">
                  ({entry.contributors.join(", ")})
                </span>
              </div>
            )}
          </div>
          <img src={ExpandIcon} alt="" className="material-content__icon" />
        </summary>
        <ol className="material-content__list material-content__list--level-2">
          {entry.sublevel?.map((sublevel1, idx) => (
            <SubLevel1 key={idx} item={sublevel1} />
          ))}
        </ol>
      </details>
    </li>
  );
};
