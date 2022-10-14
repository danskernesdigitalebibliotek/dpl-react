import React, { FC, useState, useEffect } from "react";
import usePager from "../../../components/result-pager/use-pager";
import {
  getListItems,
  getPageSizeFromConfiguration
} from "../../../core/utils/helpers/general";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationMaterial from "../reservation-material/reservation-material";

interface ListProps {
  list: ReservationType[];
  header: string;
}
const List: FC<ListProps> = ({ list, header }) => {
  const [displayedReservations, setDisplayedReservations] = useState<
    ReservationType[]
  >([]);
  const { itemsShown, PagerComponent } = usePager(
    list.length,
    getPageSizeFromConfiguration("pageSizeReservationList")
  );

  useEffect(() => {
    if (list) {
      setDisplayedReservations(
        getListItems(list, itemsShown) as ReservationType[]
      );
    }
  }, [itemsShown, list]);

  return (
    <>
      <div className="dpl-list-buttons m-32">
        <h2 className="dpl-list-buttons__header">
          {header}
          <div className="dpl-list-buttons__power">{list.length}</div>
        </h2>
      </div>
      <div className="list-reservation-container m-32">
        {displayedReservations.map((reservation) => (
          <ReservationMaterial
            key={reservation.identifier || reservation.faust}
            identifier={reservation.identifier}
            faust={reservation.faust}
            reservation={reservation}
          />
        ))}
        {PagerComponent}
      </div>
    </>
  );
};

export default List;
