import React, { FC, useEffect, useState } from "react";
import { useRecommendFromPidQuery } from "../../core/dbc-gateway/generated/graphql";
import { useGetLoansV2 } from "../../core/fbs/fbs";
import { useGetV1UserLoans } from "../../core/publizon/publizon";
import { sortByLoanDate } from "../../core/utils/helpers/general";
import {
  mapFBSLoanToLoanType,
  mapPublizonLoanToLoanType
} from "../../core/utils/helpers/list-mapper";
import { FaustId } from "../../core/utils/types/ids";
import { LoanType } from "../../core/utils/types/loan-type";

const Recommender: FC = () => {
  const [pidForFetch, setPidForFetch] = useState<FaustId | string | null>();
  const { data } = useRecommendFromPidQuery({
    pid: `870970-basis:${pidForFetch}`,
    limit: 4
  });

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
    if (data) {
    }
  }, [data]);

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
      ]).reverse()[0];
      setPidForFetch(newestLoan.faust ?? newestLoan.identifier);
    }
  }, [currentDigitalLoans, currentPhysicalLoans]);

  useEffect(() => {
    if (publizonData && publizonData.loans) {
      setCurrentDigitalLoans(mapPublizonLoanToLoanType(publizonData.loans));
    }
    if (publizonError && !isSuccessPublizon) {
      setCurrentDigitalLoans([]);
    }
  }, [isSuccessPublizon, publizonData, publizonError]);

  useEffect(() => {
    console.log(pidForFetch);
  }, [pidForFetch]);

  return <>Hello</>;
};

export default Recommender;
