import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IconFavourite } from "../icon-favourite/icon-favourite";
import {
  getGetListQueryKey,
  removeItem,
  useHasItem
} from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useStatistics } from "../../core/statistics/useStatistics";
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
  const queryClient = useQueryClient();
  const [fillState, setFillState] = useState<boolean>(false);
  const t = useText();
  const { mutate } = useHasItem();
  const { track } = useStatistics();

  useEffect(() => {
    mutate(
      {
        listId: "default",
        itemId: id
      },
      {
        onSuccess: () => {
          setFillState(true);
        },
        // The material list service will return response code 404 when a
        // material is not on the patrons list. This is interpreted as an
        // error by our client. Consequently we set
        onError: () => {
          setFillState(false);
        }
      }
    );
  }, [id, mutate]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (fillState) {
        removeItem("default", id);
        queryClient.invalidateQueries(getGetListQueryKey("default"));
        setFillState(false);
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
    [addToListRequest, fillState, id, queryClient, track]
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
      <IconFavourite darkBackground={darkBackground} fill={fillState} />
    </button>
  );
};

export default ButtonFavourite;
