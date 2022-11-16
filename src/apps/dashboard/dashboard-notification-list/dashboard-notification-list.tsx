import React, { useEffect, useState } from "react";
import { useGetLoansV2, useGetReservationsV2 } from "../../../core/fbs/fbs";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";

import { LoanType } from "../../../core/utils/types/loan-type";

function DashboardNotificationList() {
  const { data: publizonData } = useGetV1UserLoans();
  const { data: patronReservations } = useGetReservationsV2();
  const [digitalLoansCount, setDigitalLoansCount] = useState(0);

  useEffect(() => {
    if (publizonData && publizonData.loans) {
      setDigitalLoansCount(publizonData.loans.length);
    }
  }, [publizonData]);
  // Merge digital and physical loans, for easier filtration down the line.
  return (
    <div className="status-userprofile">
      <div className="status-userprofile__column">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <a href="/" className="link-tag link-tag link-filters__tag">
              Fysiske lån
            </a>
            <span className="link-filters__counter">0</span>
          </div>
        </div>
        {publizonData && digitalLoansCount === 0 && (
          <div className="dpl-list-empty">
            Du har i øjebilkket 0 fysiske lån
          </div>
        )}
        {publizonData && digitalLoansCount !== 0 && (
          <div className="dpl-list-empty">
            Du har mangle flere end 0 lån du!
          </div>
        )}
      </div>
      <div className="status-userprofile__column">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <a href="/" className="link-tag link-tag link-filters__tag">
              Reserveringer
            </a>
            <span className="link-filters__counter">0</span>
          </div>
        </div>
        {patronReservations && patronReservations.length === 0 && (
          <div className="dpl-list-empty">
            Du har i øjebilkket 0 reserveringer
          </div>
        )}
        {patronReservations && patronReservations.length !== 0 && (
          <div className="dpl-list-empty">
            Du har mange flere end 0 reserveringer du!
          </div>
        )}
      </div>
    </div>
  );
}
export default DashboardNotificationList;
