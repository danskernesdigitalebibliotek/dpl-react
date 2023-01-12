import React from "react";
import { useGetAvailabilityV3, useGetHoldingsV3 } from "../../core/fbs/fbs";
import { FaustId } from "../../core/utils/types/ids";
import InstantLoanBranch from "./InstantLoanBranch";

type InstantLoanBranchesProps = {
  faustId: FaustId;
  instantBooksThreshold?: number;
};

const InstantLoanBranches: React.FunctionComponent<
  InstantLoanBranchesProps
> = ({ faustId, instantBooksThreshold = 5 }) => {
  const { data: holdings } = useGetHoldingsV3({
    recordid: [faustId]
  });

  const { data: availability } = useGetAvailabilityV3({
    recordid: [faustId]
  });

  if (!holdings || !availability) return null;
  const { holdings: branches } = holdings[0];

  const { reservable, reservations } = availability[0];

  const hasNoReservableButAvailable = reservations < instantBooksThreshold;

  return (
    <ul className="instant-loan-branches">
      {branches.map((branch) => {
        if (
          branch.materials.some((item) => item.available) &&
          reservable === false
        ) {
          return (
            <li>
              <InstantLoanBranch branch={branch} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default InstantLoanBranches;

// ikke reserverbar men tilgængelig.
// Hvis der er et antal på et branch som der overskiver branchnumberOfBooks
// så skal de vises
