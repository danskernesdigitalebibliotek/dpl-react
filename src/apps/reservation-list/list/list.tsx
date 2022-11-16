import React, { FC, useState, useEffect } from "react";
import EmptyList from "../../../components/empty-list/empty-list";
import usePager from "../../../components/result-pager/use-pager";
import { getListItems } from "../../../core/utils/helpers/general";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationMaterial from "../reservation-material/reservation-material";

interface ListProps {
  list: ReservationType[];
  header: string;
  emptyListLabel: string;
  pageSize: number;
}
const List: FC<ListProps> = ({ list, header, emptyListLabel, pageSize }) => {
  const [displayedReservations, setDisplayedReservations] = useState<
    ReservationType[]
  >([]);
  const { itemsShown, PagerComponent } = usePager(
    list.length,
    pageSize > list.length ? list.length : pageSize
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
      <ul className="list-reservation-container m-32">
        {displayedReservations.length === 0 && (
          <EmptyList emptyListText={emptyListLabel} />
        )}
        {displayedReservations.map((reservation) => (
          <ReservationMaterial
            key={reservation.identifier || reservation.faust}
            identifier={reservation.identifier}
            faust={reservation.faust}
            reservation={reservation}
          />
        ))}
        {PagerComponent}
      </ul>
    </>
  );
};

export default List;
