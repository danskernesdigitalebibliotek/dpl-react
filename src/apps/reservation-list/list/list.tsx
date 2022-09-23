import React, { FC } from "react";
import ReservationMaterial from "../../loan-list/materials/stackable-material/reservation-material";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

interface ListProps {
  list: MetaDataType<ReservationMetaDataType>[];
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
      <div className="list-reservation-container m-32">
        {list.map((reservation) => (
          <ReservationMaterial
            type={reservation.type}
            id={reservation.id}
            loanMetaData={reservation}
          />
        ))}
      </div>
    </>
  );
};

export default List;
