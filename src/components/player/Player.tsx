import React, { useEffect } from "react";
import {
  appendAsset,
  playerAssets,
  removeAppendedAssets
} from "../../apps/reader/helper";

export type PlayerType =
  | {
      identifier?: string;
      orderId?: never;
    }
  | {
      identifier?: never;
      orderId?: string;
    };

const Player: React.FC<PlayerType> = ({ identifier, orderId }) => {
  useEffect(() => {
    playerAssets.forEach(appendAsset);

    return () => {
      removeAppendedAssets();
    };
  }, [identifier, orderId]);

  if (orderId) {
    return (
      <iframe
        title="Player"
        className="player"
        src={`https://play.pubhub.dk/index141.html?o=${orderId}`}
      />
    );
  }

  if (identifier) {
    return (
      <iframe
        title="Player"
        className="player"
        src={`https://play.pubhub.dk/index141.html?i=${identifier}`}
      />
    );
  }

  // eslint-disable-next-line no-console
  console.warn("No identifier or orderId provided for the Player app.");
  return null;
};

export default Player;
