import React, { useEffect, useState } from "react";
import { IconFavourite } from "../icon-favourite/icon-favourite";
import {
  addItem,
  removeItem,
  useHasItem
} from "../../core/material-list-api/material-list";

export interface ButtonFavouriteProps {
  materialId: string;
}

// TODO
// We have to check if user is login and redirect if not

const ButtonFavourite: React.FC<ButtonFavouriteProps> = ({ materialId }) => {
  const [fillState, setFillState] = useState<boolean>(false);
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

  const handleClick = () => {
    if (fillState) {
      removeItem("default", materialId);
      setFillState(false);
    } else {
      addItem("default", materialId);
      setFillState(true);
    }
  };

  return (
    <button
      type="button"
      aria-label={fillState ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      onClick={handleClick}
      className="button-favourite"
    >
      <IconFavourite fill={fillState} />
    </button>
  );
};

export default ButtonFavourite;
