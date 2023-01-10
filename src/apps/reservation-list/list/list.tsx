import React, { FC, useState, useEffect } from "react";
import EmptyList from "../../../components/empty-list/empty-list";
import usePager from "../../../components/result-pager/use-pager";
import { getListItems } from "../../../core/utils/helpers/general";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import ReservationMaterial from "../reservation-material/reservation-material";

interface ListProps {
  reservations: ReservationType[];
  header: string;
  emptyListLabel: string;
  pageSize: number;
  openReservationDetailsModal: (reservation: ReservationType) => void;
}
const List: FC<ListProps> = ({
  reservations,
  header,
  pageSize,
  emptyListLabel,
  openReservationDetailsModal
}) => {
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [displayedReservations, setDisplayedReservations] = useState<
    ReservationType[]
  >([]);
  const { itemsShown, PagerComponent } = usePager(
    reservations.length,
    pageSize
  );

  useEffect(() => {
    if (reservations) {
      setDisplayedReservations(
        getListItems(reservations, itemsShown) as ReservationType[]
      );
      setDataReady(true);
    }
  }, [itemsShown, reservations]);

  if (!dataReady) return <div />;

  return (
    <div>
      {displayedReservations.length > 0 ? (
        <>
          <div className="dpl-list-buttons m-32">
            <h2
              data-cy="reservation-list-header"
              className="dpl-list-buttons__header"
            >
              <>
                {header}
                <div className="dpl-list-buttons__power">
                  {reservations.length}
                </div>
              </>
            </h2>
          </div>
          <ul className="list-reservation-container m-32">
            {displayedReservations.map((reservation) => (
              <ReservationMaterial
                openReservationDetailsModal={openReservationDetailsModal}
                key={reservation.identifier || reservation.faust}
                identifier={reservation.identifier}
                faust={reservation.faust}
                reservation={reservation}
              />
            ))}
            {PagerComponent}
          </ul>
        </>
      ) : (
        <div>
          <div className="dpl-list-buttons m-32">
            <h2 className="dpl-list-buttons__header">
              <>
                {header}
                <div className="dpl-list-buttons__power">0</div>
              </>
            </h2>
          </div>
          <div className="list-reservation-container m-32">
            <EmptyList emptyListText={emptyListLabel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
