import React, { useCallback, useEffect, useState } from "react";
import LoadIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reload.svg";
import { useQueryClient } from "react-query";
import { IconFavourite } from "../icon-favourite/icon-favourite";
import {
  getGetListQueryKey,
  useHasItem,
  useRemoveItem
} from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { isAnonymous } from "../../core/utils/helpers/user";
import { useEventStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";

export type ButtonFavouriteId = WorkId | Pid;
export interface ButtonFavouriteProps {
  id: ButtonFavouriteId;
  darkBackground?: boolean;
  addToListRequest: (id: ButtonFavouriteId) => void;
  title: string;
}

const ButtonFavourite: React.FC<ButtonFavouriteProps> = ({
  id,
  addToListRequest,
  darkBackground,
  title
}) => {
  const isUserAnonymous = isAnonymous();
  const [fillState, setFillState] = useState<boolean>(false);
  const [isLoadingHeart, setIsLoadingHeart] =
    useState<boolean>(!isUserAnonymous);
  const t = useText();
  const { mutate: hasItem } = useHasItem();
  const { mutate: removeItem } = useRemoveItem();
  const { track } = useEventStatistics();
  const queryClient = useQueryClient();

  const listId = "default";

  useEffect(() => {
    // Don't check favorites if user is not logged in
    if (isUserAnonymous) {
      setIsLoadingHeart(false);
      return;
    }

    // The heart icon needs to change into a loading icon while the material
    // is being removed from the favorite list
    setIsLoadingHeart(true);
    hasItem(
      {
        listId,
        itemId: id
      },
      {
        onSuccess: () => {
          setFillState(true);
          setIsLoadingHeart(false);
        },
        // The material list service will return response code 404 when a
        // material is not on the patrons list. This is interpreted as an
        // error by our client. Consequently we set
        onError: () => {
          setFillState(false);
          setIsLoadingHeart(false);
        }
      }
    );
  }, [id, hasItem, isUserAnonymous]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (fillState) {
        setFillState(false);
        removeItem(
          { listId, itemId: id },
          {
            onSuccess: () => {
              // Invalidate the query to remove any faved materials from favorites list
              queryClient.invalidateQueries(getGetListQueryKey(listId));
            }
          }
        );
      } else {
        track("click", {
          id: statistics.addToFavorites.id,
          name: statistics.addToFavorites.name,
          trackedData: id
        });
        addToListRequest(id);
        setFillState(true);
      }
      // Prevent event from bubbling up. If other components includes the favourite button
      // this wont interfere with their click handler.
      e.stopPropagation();
    },
    [addToListRequest, fillState, id, removeItem, track, queryClient]
  );

  return (
    <button
      type="button"
      aria-label={
        fillState
          ? t("removeFromFavoritesAriaLabelText", {
              placeholders: { "@title": title }
            })
          : t("addToFavoritesAriaLabelText", {
              placeholders: { "@title": title }
            })
      }
      onClick={handleClick}
      className="button-favourite"
    >
      {isLoadingHeart && <img src={LoadIcon} alt={t("isLoadingHeartText")} />}
      {!isLoadingHeart && (
        <IconFavourite darkBackground={darkBackground} fill={fillState} />
      )}
    </button>
  );
};

export default ButtonFavourite;
