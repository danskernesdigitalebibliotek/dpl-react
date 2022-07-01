import React, { useCallback, useEffect, useState } from "react";
import { IconFavourite } from "../icon-favourite/icon-favourite";
import {
  addItem,
  removeItem,
  useHasItem
} from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";

export interface ButtonFavouriteProps {
  materialId: string;
}

// TODO We have to check if user is login and redirect if not

const ButtonFavourite: React.FC<ButtonFavouriteProps> = ({ materialId }) => {
  const [fillState, setFillState] = useState<boolean>(false);
  const t = useText();

  const { mutate } = useHasItem();

  useEffect(() => {
    mutate(
      {
        listId: "default",
        itemId: materialId
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
  }, [materialId, mutate]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (fillState) {
        removeItem("default", materialId);
        setFillState(false);
      } else {
        addItem("default", materialId);
        setFillState(true);
      }
      // Prevent event from bubbling up. If other components includes the favourite button
      // this wont interfere with their click handler.
      e.stopPropagation();
    },
    [fillState, materialId]
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
