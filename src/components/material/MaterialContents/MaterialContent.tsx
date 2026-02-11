import React, { useState } from "react";
import { EntryItem } from "./EntryItem";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { ContentsArray } from "./types";
import { useText } from "../../../core/utils/text";

const INITIAL_ENTRIES_TO_SHOW = 10;
const CONTENT_TYPES_WITH_SHOW_ALL = ["MUSIC_TRACKS", "ARTICLES"] as const;

const shouldShowAllButton = (contentType?: string | null): boolean => {
  if (!contentType) return false;
  return (CONTENT_TYPES_WITH_SHOW_ALL as readonly string[]).includes(
    contentType
  );
};

interface MaterialContentProps {
  contentEntity: ContentsArray[0];
}

export const MaterialContent: React.FC<MaterialContentProps> = ({
  contentEntity
}) => {
  const t = useText();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasShowAllFunctionality = shouldShowAllButton(contentEntity.type);
  if (!contentEntity.entries && !contentEntity.raw) {
    return null;
  }

  const shouldLimitEntries = hasShowAllFunctionality && !isExpanded;
  const entriesToShow = shouldLimitEntries
    ? INITIAL_ENTRIES_TO_SHOW
    : contentEntity.entries?.length || 0;

  return (
    <section className="material-content">
      <h2 className="material-content__heading">{contentEntity.heading}</h2>

      {contentEntity.raw && (
        <p className="material-content__raw">{contentEntity.raw}</p>
      )}

      {contentEntity.entries && contentEntity.entries.length > 0 && (
        <>
          <ol className="material-content__list material-content__list--level-1">
            {contentEntity.entries
              .slice(0, entriesToShow)
              .map((entry, entryIndex) => (
                <EntryItem key={entryIndex} entry={entry} />
              ))}
          </ol>

          {hasShowAllFunctionality &&
            contentEntity.entries.length > INITIAL_ENTRIES_TO_SHOW && (
              <button
                type="button"
                className={`material-content__show-more ${
                  isExpanded ? "material-content__show-more--expanded" : ""
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="link-tag material-content__show-more-text">
                  {isExpanded
                    ? t("materialContentsShowLessText")
                    : t("materialContentsShowAllText", {
                        placeholders: {
                          "@count": contentEntity.entries.length
                        }
                      })}
                </span>
                <img
                  src={ExpandIcon}
                  alt=""
                  className="material-content__show-more-icon"
                />
              </button>
            )}
        </>
      )}
    </section>
  );
};
