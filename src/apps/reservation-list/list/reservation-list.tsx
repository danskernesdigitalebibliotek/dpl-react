import React, { useEffect, useState, FC } from "react";
import { useText } from "../../../core/utils/text";
import { useGetReservationsV2 } from "../../../core/fbs/fbs";
import ReservationMaterial from "../../loan-list/materials/stackable-material/reservation-material";
import { mapFBSReservationToLoanMetaDataType } from "../../loan-list/utils/helpers";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

const ReservationList: FC = () => {
  const t = useText();
  const { isSuccess, data } = useGetReservationsV2();
  const [reservations, setReservations] = useState<
    MetaDataType<ReservationMetaDataType>[]
  >([]);

  useEffect(() => {
    if (isSuccess && data) {
      setReservations(mapFBSReservationToLoanMetaDataType(data));
    }
  }, [isSuccess, data]);

  return (
    <>
      <h1 className="text-header-h1 m-32">{t("reservationListHeaderText")}</h1>
      <div className="dpl-list-buttons m-32">
        <h2 className="dpl-list-buttons__header">
          {t("reservationListPhysicalLoansTitleText")}
          <div className="dpl-list-buttons__power">{reservations.length}</div>
        </h2>
      </div>
      {/* Todo */}
      {reservations.length > 0 &&
        reservations.map((reservation) => (
          <ReservationMaterial id={reservation.id} loanMetaData={reservation} />
        ))}
    </>
  );
};

export default ReservationList;
