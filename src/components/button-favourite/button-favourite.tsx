import React, { useCallback, useEffect, useState } from "react";
import { IconFavourite } from "../icon-favourite/icon-favourite";
import {
  removeItem,
  useHasItem
} from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";

export type ButtonFavouriteId = WorkId | Pid;
export interface ButtonFavouriteProps {
  id: ButtonFavouriteId;
  addToListRequest: (id: ButtonFavouriteId) => void;
}

// TODO We have to check if user is login and redirect if not

const ButtonFavourite: React.FC<ButtonFavouriteProps> = ({
  id,
  addToListRequest
}) => {
  const [fillState, setFillState] = useState<boolean>(false);
  const t = useText();
  const { mutate } = useHasItem();

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
        setFillState(false);
      } else {
        addToListRequest(id);
        setFillState(true);
      }
      // Prevent event from bubbling up. If other components includes the favourite button
      // this wont interfere with their click handler.
      e.stopPropagation();
    },
    [addToListRequest, fillState, id]
  );

  return (
    <button
      type="button"
      aria-label={
        fillState ? t("Remove from favorites") : t("Add to favorites")
      }
      onClick={handleClick}
      className="button-favourite"
    >
      <IconFavourite fill={fillState} />
    </button>
  );
};

export default ButtonFavourite;
