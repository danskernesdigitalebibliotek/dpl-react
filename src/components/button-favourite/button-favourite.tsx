import React, { useEffect, useState } from "react";
import { useGetList } from "../../core/material-list-api/material-list";
import { ItemId, List } from "../../core/material-list-api/model";
import { IconFavourite } from "../icon-favourite/icon-favourite";

interface ButtonFavouriteProps {
  id: string;
}

export const ButtonFavourite: React.FC<ButtonFavouriteProps> = ({ id }) => {
  const [fillState, setFillState] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetList("default");

  useEffect(() => {
    if (data) {
      // This is because there does not come a property it is called materials but instead is called collections
      const { materials } = data as List & {
        materials: ItemId[];
      };
      // changes value if user has the material on his list
      setFillState(materials.includes(id));
    }
  }, [data, id]);

  return (
    <button className="button-favourite">
      <IconFavourite fill={fillState} />
    </button>
  );
};
