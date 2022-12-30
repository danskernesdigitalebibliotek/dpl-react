import React, { FC, useEffect, useState } from "react";
import { useGetLoansV2, useGetReservationsV2 } from "../../core/fbs/fbs";
import {
  useGetV1UserLoans,
  useGetV1UserReservations
} from "../../core/publizon/publizon";
import {
  sortByLoanDate,
  sortByReservationDate
} from "../../core/utils/helpers/general";
import {
  mapFBSLoanToLoanType,
  mapFBSReservationToReservationType,
  mapPublizonLoanToLoanType,
  mapPublizonReservationToReservationType
} from "../../core/utils/helpers/list-mapper";
import { LoanType } from "../../core/utils/types/loan-type";
import { ReservationType } from "../../core/utils/types/reservation-type";
import InspirationRecommender from "./InspirationRecommender";
import RecommendList from "./RecommendList";

const Recommender: FC = () => {
  const [loanForRecommender, setLoanForRecommender] = useState<LoanType | null>(
    null
  );
  const [reservationForRecommender, setReservationForRecommender] =
    useState<ReservationType | null>(null);
  const [digitalLoans, setDigitalLoans] = useState<LoanType[] | null>(null);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[] | null>(null);

  const [digitalReservations, setDigitalReservations] = useState<
    ReservationType[] | null
  >(null);
  const [physicalReservations, setPhysicalReservations] = useState<
    ReservationType[] | null
  >(null);

  const {
    isSuccess: isSuccessFbsLoans,
    error: fbsErrorLoans,
    data: fbsLoans
  } = useGetLoansV2();

  const {
    isSuccess: isSuccessPublizonLoans,
    error: publizonErrorLoans,
    data: publizonLoans
  } = useGetV1UserLoans();

  const {
    isSuccess: isSuccessFbsReservations,
    error: fbsErrorReservations,
    data: fbsReservations
  } = useGetReservationsV2();

  const {
    isSuccess: isSuccessPublizonReservations,
    error: publizonErrorReservations,
    data: publizonReservations
  } = useGetV1UserReservations();

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
        mapFBSReservationToReservationType(fbsReservations)
      );
    }
    if (fbsErrorReservations && !isSuccessFbsReservations) {
      setPhysicalReservations([]);
    }
  }, [fbsErrorReservations, fbsReservations, isSuccessFbsReservations]);

  useEffect(() => {
    if (publizonReservations && publizonReservations.reservations) {
      setDigitalReservations(
        mapPublizonReservationToReservationType(
          publizonReservations.reservations
        )
      );
      setDigitalReservations([]);
    }
    if (publizonErrorReservations && !isSuccessPublizonReservations) {
      setDigitalReservations([]);
    }
  }, [
    isSuccessPublizonReservations,
    publizonErrorReservations,
    publizonReservations
  ]);

  useEffect(() => {
    if (physicalLoans !== null && digitalLoans !== null) {
      const newestLoan = sortByLoanDate([
        ...physicalLoans,
        ...digitalLoans
      ]).reverse();
      if (newestLoan.length > 0) {
        setLoanForRecommender(newestLoan[0]);
      }
    }
    if (physicalReservations !== null && digitalReservations !== null) {
      const newestReservation = sortByReservationDate([
        ...physicalReservations,
        ...digitalReservations
      ]).reverse();
      if (newestReservation.length > 0) {
        setReservationForRecommender(newestReservation[0]);
      }
    }
  }, [
    digitalLoans,
    digitalReservations,
    physicalLoans,
    physicalReservations,
    setLoanForRecommender
  ]);

  useEffect(() => {
    if (publizonLoans && publizonLoans.loans) {
      setDigitalLoans(mapPublizonLoanToLoanType(publizonLoans.loans));
    }
    if (publizonErrorLoans && !isSuccessPublizonLoans) {
      setDigitalLoans([]);
    }
  }, [isSuccessPublizonLoans, publizonLoans, publizonErrorLoans]);

  return (
    <div className="recommender">
      {loanForRecommender && (
        <RecommendList
          faust={loanForRecommender.faust}
          identifier={loanForRecommender.identifier}
          loan={loanForRecommender}
        />
      )}
      {!loanForRecommender && reservationForRecommender && (
        <RecommendList
          faust={reservationForRecommender.faust}
          identifier={reservationForRecommender.identifier}
          reservation={reservationForRecommender}
        />
      )}
      {!loanForRecommender && !reservationForRecommender && (
        <InspirationRecommender />
      )}
    </div>
  );
};

export default Recommender;
