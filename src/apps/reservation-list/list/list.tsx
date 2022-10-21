import React, { FC } from "react";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationMaterial from "../reservation-material/reservation-material";

interface ListProps {
  list: ReservationType[];
  header: string;
}
const List: FC<ListProps> = ({ list, header }) => {
  return (
    <>
      <div className="dpl-list-buttons m-32">
        <h2 className="dpl-list-buttons__header">
          {header}
          <div className="dpl-list-buttons__power">{list.length}</div>
        </h2>
      </div>
      <ul className="list-reservation-container m-32">
        {list.map((reservation) => (
          <ReservationMaterial
            key={reservation.identifier || reservation.faust}
            identifier={reservation.identifier}
            faust={reservation.faust}
            reservation={reservation}
          />
        ))}
      </ul>
    </>
  );
};

export default List;
