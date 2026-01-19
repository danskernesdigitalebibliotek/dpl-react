import React from "react";
import { ContentEntry } from "./types";

interface EntryDetailsProps {
  creators?: ContentEntry["creators"];
  contributors?: string[];
  playingTime?: string | null;
}

export const EntryDetails: React.FC<EntryDetailsProps> = ({
  creators,
  contributors,
  playingTime
}) => {
  const allCreators = [
    ...(creators?.persons?.map((p) => p.display) ?? []),
    ...(creators?.corporations?.map((c) => c.display) ?? [])
  ];
  const hasCreators = allCreators.length > 0;

  return (
    <>
      {/* Display contributors (for articles/fiction - authors, performers) */}
      {contributors && contributors.length > 0 && (
        <span className="material-content__contributors">
          ({contributors.join(", ")})
        </span>
      )}

      {/* Display creators (for music - composers/artists) */}
      {hasCreators && (
        <>
          <span className="material-content__separator">–</span>
          <span className="material-content__creators">
            {allCreators.join(", ")}
          </span>
        </>
      )}

      {/* Display playing time */}
      {playingTime && (
        <span className="material-content__playing-time">{playingTime}</span>
      )}
    </>
  );
};
