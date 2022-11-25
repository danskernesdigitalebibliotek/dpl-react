import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useGetFeesV2, useGetLoansV2 } from "../../../core/fbs/fbs";
import { FeeV2, LoanV2 } from "../../../core/fbs/model";
import { groupObjectArrayByProperty } from "../../../core/utils/helpers/general";
import FeeListItem from "../fee-list-item/fee-list.item";

const FeeList: FC = () => {
  const { data: fbsFees } = useGetFeesV2();
  const [feeItems, setFeeItems] = useState<{ [key: string]: FeeV2[] }>();
  const { isSuccess, data } = useGetLoansV2();
  const [physicalLoans, setPhysicalLoans] = useState<LoanV2[]>([]);

  useEffect(() => {
    if (fbsFees) {
      const feeItemsGroupedByDueDate = groupObjectArrayByProperty(
        fbsFees,
        "dueDate"
      );
      setFeeItems(feeItemsGroupedByDueDate);
    }
  }, [fbsFees]);

  useEffect(() => {
    if (isSuccess && data) {
      setPhysicalLoans(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    console.log(physicalLoans);
  }, [physicalLoans]);

  return (
    <div>
      {feeItems &&
        Object.keys(feeItems).map((key) => {
          const feeItemsObj = feeItems[key];
          return <FeeListItem itemData={feeItemsObj} />;
        })}
    </div>
  );
};

export default FeeList;
