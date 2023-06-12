import React, { FC, useEffect, useState } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import { sortByDueDate } from "../../core/utils/helpers/general";
import { LoanType } from "../../core/utils/types/loan-type";
import { useGetLoansV2, useGetReservationsV2 } from "../../core/fbs/fbs";
import {
  mapFBSLoanToLoanType,
  mapFBSReservationToReservationType
} from "../../core/utils/helpers/list-mapper";
import { ThresholdType } from "../../core/utils/types/threshold-type";
import { useConfig } from "../../core/utils/config";
import { ReservationType } from "../../core/utils/types/reservation-type";

interface DashboardProps {
  pageSize: number;
}

const DashBoard: FC<DashboardProps> = ({ pageSize }) => {
  const t = useText();
  const config = useConfig();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });
  const { data: reservationsFbs } = useGetReservationsV2();
  const [reservations, setReservations] = useState<ReservationType[]>([]);

  const { isSuccess, data } = useGetLoansV2();
  const [loans, setLoans] = useState<LoanType[] | null>(null);

  useEffect(() => {
    if (reservationsFbs) {
      setReservations(mapFBSReservationToReservationType(reservationsFbs));
    }
  }, [reservationsFbs]);

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanType = mapFBSLoanToLoanType(data);
      setLoans(mapToLoanType);

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByDueDate(mapToLoanType);

      setLoans(sortedByLoanDate);
    } else {
      setLoans([]);
    }
  }, [isSuccess, data, warning]);

  return (
    <div className="dashboard-page">
      <h1 className="text-header-h1 my-32" data-cy="dashboard-header">
        {t("yourProfileText")}
      </h1>
      <DashboardFees />
      <DashboardNotificationList
        columns
        pageSize={pageSize}
        reservations={reservations}
        loans={loans}
      />
    </div>
  );
};

export default DashBoard;
