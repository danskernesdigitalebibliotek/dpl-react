import React, { FC, useEffect, useState } from "react";
import { useGetLoansV2 } from "../../core/fbs/fbs";
import { useGetV1UserLoans } from "../../core/publizon/publizon";
import { sortByLoanDate } from "../../core/utils/helpers/general";
import { mapFBSLoanToLoanType } from "../../core/utils/helpers/list-mapper";
import { LoanType } from "../../core/utils/types/loan-type";
import RecommendList from "./RecommendList";

const Recommender: FC = () => {
  const [loanForRecommender, setLoanForRecommender] = useState<LoanType | null>(
    null
  );
  const [currentDigitalLoans, setCurrentDigitalLoans] = useState<
    LoanType[] | null
  >(null);
  const [currentPhysicalLoans, setCurrentPhysicalLoans] = useState<
    LoanType[] | null
  >(null);

  const {
    isSuccess: isSuccessFbs,
    error: fbsError,
    data: fbsData
  } = useGetLoansV2();

  const {
    isSuccess: isSuccessPublizon,
    error: publizonError,
    data: publizonData
  } = useGetV1UserLoans();

  useEffect(() => {
    if (fbsData) {
      setCurrentPhysicalLoans(mapFBSLoanToLoanType(fbsData));
    }
    if (fbsError && !isSuccessFbs) {
      setCurrentPhysicalLoans([]);
    }
  }, [fbsData, fbsError, isSuccessFbs]);

  useEffect(() => {
    if (currentPhysicalLoans !== null && currentDigitalLoans !== null) {
      const newestLoan = sortByLoanDate([
        ...currentPhysicalLoans,
        ...currentDigitalLoans
      ]).reverse();
      if (newestLoan.length > 0) {
        setLoanForRecommender(newestLoan[0]);
      }
    }
  }, [currentDigitalLoans, currentPhysicalLoans, setLoanForRecommender]);

  useEffect(() => {
    if (publizonData && publizonData.loans) {
      // setCurrentDigitalLoans(mapPublizonLoanToLoanType(publizonData.loans));
      setCurrentDigitalLoans([]);
    }
    if (publizonError && !isSuccessPublizon) {
      setCurrentDigitalLoans([]);
    }
  }, [isSuccessPublizon, publizonData, publizonError]);

  if (loanForRecommender === null) return null;

  return (
    <div className="recommender">
      <RecommendList
        faust={loanForRecommender.faust}
        identifier={loanForRecommender.identifier}
        loan={loanForRecommender}
      />
    </div>
  );
};

export default Recommender;
