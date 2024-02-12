import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import LoadIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reload.svg";
import { IconFavourite } from "../icon-favourite/icon-favourite";
import {
  getGetListQueryKey,
  removeItem,
  useHasItem
} from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";

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
  const [isLoadingHeart, setIsLoadingHeart] = useState<boolean>(true);
  const t = useText();
  const { mutate } = useHasItem();

  useEffect(() => {
    // The heart icon needs to change into a loading icon while the material
    // is being removed from the favorite list
    setIsLoadingHeart(true);
    mutate(
      {
        listId: "default",
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
  }, [id, mutate]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (fillState) {
        removeItem("default", id);
        queryClient.invalidateQueries(getGetListQueryKey("default"));
        setFillState(false);
      } else {
        addToListRequest(id);
        setFillState(true);
      }
      // Prevent event from bubbling up. If other components includes the favourite button
      // this wont interfere with their click handler.
      e.stopPropagation();
    },
    [addToListRequest, fillState, id, queryClient]
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
