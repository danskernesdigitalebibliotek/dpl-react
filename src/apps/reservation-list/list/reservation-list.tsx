import React, { useEffect, useState, FC } from "react";
import { useText } from "../../../core/utils/text";
import { useGetReservationsV2 } from "../../../core/fbs/fbs";
import { ReservationDetailsV2 } from "../../../core/fbs/model/reservationDetailsV2";

const ReservationList: FC = () => {
  const t = useText();
  const { isSuccess, data } = useGetReservationsV2();
  const [reservations, setReservations] = useState<ReservationDetailsV2[]>([]);

  useEffect(() => {
    if (isSuccess && data) {
      setReservations(data);
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
        reservations.map(({ reservationId }) => <div>{reservationId}</div>)}
    </>
  );
};

export default ReservationList;
