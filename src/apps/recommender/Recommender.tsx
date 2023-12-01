import React, { FC, useEffect, useState } from "react";
import {
  sortByLoanDate,
  sortByReservationDate
} from "../../core/utils/helpers/general";
import { LoanType } from "../../core/utils/types/loan-type";
import { ReservationType } from "../../core/utils/types/reservation-type";
import InspirationRecommender from "./InspirationRecommender";
import RecommendList from "./RecommendList";
import useReservations from "../../core/utils/useReservations";
import useLoans from "../../core/utils/useLoans";

const Recommender: FC = () => {
  const [loanForRecommender, setLoanForRecommender] = useState<LoanType | null>(
    null
  );
  const [reservationForRecommender, setReservationForRecommender] =
    useState<ReservationType | null>(null);

  const {
    fbs: { loans: physicalLoans, isLoading: fbsLoansLoading }
  } = useLoans();

  const {
    fbs: {
      reservations: physicalReservations,
      isLoading: fbsReservationsLoading
    }
  } = useReservations();

  useEffect(() => {
    if (physicalLoans !== null) {
      const newestLoan = sortByLoanDate(physicalLoans).reverse();
      if (newestLoan.length > 0) {
        setLoanForRecommender(newestLoan[0]);
      }
    }
    if (physicalReservations !== null) {
      const newestReservation =
        sortByReservationDate(physicalReservations).reverse();
      if (newestReservation.length > 0) {
        setReservationForRecommender(newestReservation[0]);
      }
    }
  }, [physicalLoans, physicalReservations, setLoanForRecommender]);

  const stillLoading = fbsReservationsLoading || fbsLoansLoading;

  return (
    <div className="recommender recommender--padding-desktop recommender--triple-desktop">
      {loanForRecommender && loanForRecommender.faust && (
        <RecommendList
          titleKey="recommenderTitleLoansText"
          item={loanForRecommender}
          loanOrReservationFaust={loanForRecommender.faust}
        />
      )}
      {!loanForRecommender &&
        reservationForRecommender &&
        reservationForRecommender.faust && (
          <RecommendList
            titleKey="recommenderTitleReservationsText"
            item={reservationForRecommender}
            loanOrReservationFaust={reservationForRecommender.faust}
          />
        )}
      {!loanForRecommender && !reservationForRecommender && !stillLoading && (
        <InspirationRecommender />
      )}
    </div>
  );
};

export default Recommender;
