import React, { FC, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import EmptyList from "../../../components/empty-list/empty-list";
import usePager from "../../../components/result-pager/use-pager";
import { getListItems } from "../../../core/utils/helpers/general";
import {
  reservationId,
  ReservationType
} from "../../../core/utils/types/reservation-type";
import ReservationMaterial from "../reservation-material/reservation-material";

interface ListProps {
  reservations: ReservationType[];
  header: string;
  emptyListDataCy: string;
  emptyListLabel: string;
  pageSize: number;
  openReservationDetailsModal: (reservation: ReservationType) => void;
}
const List: FC<ListProps> = ({
  reservations,
  header,
  pageSize,
  emptyListDataCy,
  emptyListLabel,
  openReservationDetailsModal
}) => {
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [displayedReservations, setDisplayedReservations] = useState<
    ReservationType[]
  >([]);
  const { itemsShown, PagerComponent, firstInNewPage } = usePager({
    hitcount: reservations.length,
    pageSize
  });

  useDeepCompareEffect(() => {
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
      <div className="dpl-list-buttons m-32">
        <h2
          data-cy="reservation-list-header"
          className="dpl-list-buttons__header"
        >
          <>
            {header}
            <div className="dpl-list-buttons__power">{reservations.length}</div>
          </>
        </h2>
      </div>
      <div data-cy="list-reservation-container">
        {dataReady && (
          <>
            <ul className="list-reservation-container">
              {displayedReservations.map((reservation, i) => (
                <ReservationMaterial
                  focused={firstInNewPage === i}
                  openReservationDetailsModal={openReservationDetailsModal}
                  key={reservationId(reservation)}
                  item={reservation}
                  reservation={reservation}
                />
              ))}
            </ul>
            <PagerComponent />
          </>
        )}
        {!displayedReservations.length && (
          <EmptyList
            classNames="mt-24"
            dataCy={emptyListDataCy}
            emptyListText={emptyListLabel}
          />
        )}
      </div>
    </div>
  );
};

export default List;
