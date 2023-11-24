import React, { FC, useEffect, useState } from "react";
import { useGetLoansV2 } from "../../core/fbs/fbs";
import {
  sortByLoanDate,
  sortByReservationDate
} from "../../core/utils/helpers/general";
import {
  mapFBSLoanToLoanType,
  mapFBSReservationGroupToReservationType
} from "../../core/utils/helpers/list-mapper";
import { LoanType } from "../../core/utils/types/loan-type";
import { ReservationType } from "../../core/utils/types/reservation-type";
import InspirationRecommender from "./InspirationRecommender";
import RecommendList from "./RecommendList";
import useGetReservationGroups from "../../core/utils/useGetReservationGroups";

const Recommender: FC = () => {
  const [loanForRecommender, setLoanForRecommender] = useState<LoanType | null>(
    null
  );
  const [reservationForRecommender, setReservationForRecommender] =
    useState<ReservationType | null>(null);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[] | null>(null);
  const [physicalReservations, setPhysicalReservations] = useState<
    ReservationType[] | null
  >(null);

  const {
    isSuccess: isSuccessFbsLoans,
    error: fbsErrorLoans,
    data: fbsLoans,
    isLoading: fbsLoansLoading
  } = useGetLoansV2();

  const {
    isSuccess: isSuccessFbsReservations,
    error: fbsErrorReservations,
    data: fbsReservations,
    isLoading: fbsReservationsLoading
  } = useGetReservationGroups();

  useEffect(() => {
    if (fbsLoans) {
      setPhysicalLoans(mapFBSLoanToLoanType(fbsLoans));
    }
    if (fbsErrorLoans && !isSuccessFbsLoans) {
      setPhysicalLoans([]);
    }
  }, [fbsLoans, fbsErrorLoans, isSuccessFbsLoans]);

  useEffect(() => {
    if (fbsReservations) {
      setPhysicalReservations(
        mapFBSReservationGroupToReservationType(fbsReservations)
      );
    }
    if (fbsErrorReservations && !isSuccessFbsReservations) {
      setPhysicalReservations([]);
    }
  }, [fbsErrorReservations, fbsReservations, isSuccessFbsReservations]);

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
          faust={loanForRecommender.faust}
          identifier={loanForRecommender.identifier}
          loanOrReservationFaust={loanForRecommender.faust}
        />
      )}
      {!loanForRecommender &&
        reservationForRecommender &&
        reservationForRecommender.faust && (
          <RecommendList
            titleKey="recommenderTitleReservationsText"
            faust={reservationForRecommender.faust}
            identifier={reservationForRecommender.identifier}
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
