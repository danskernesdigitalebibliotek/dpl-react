import React, { useEffect, useState } from "react";
import { useGetList } from "../../core/material-list-api/material-list";
import { ItemId, List } from "../../core/material-list-api/model";
import { IconFavourite } from "../icon-favourite/icon-favourite";

export interface ButtonFavouriteProps {
  id: string;
}

const ButtonFavourite: React.FC<ButtonFavouriteProps> = ({ id }) => {
  const [fillState, setFillState] = useState<boolean>(false);
  const { data, isSuccess } = useGetList("default");

  useEffect(() => {
    if (isSuccess && data) {
      // This is because there does not come a property it is called materials but instead is called collections
      const { materials } = data as List & {
        materials: ItemId[];
      };
      // changes value if user has the material on his list
      setFillState(materials.includes(id));
    }
  }, [isSuccess, data, id]);

  return (
    <button type="button" className="button-favourite">
      <IconFavourite fill={fillState} />
    </button>
  );
};

export default ButtonFavourite;
