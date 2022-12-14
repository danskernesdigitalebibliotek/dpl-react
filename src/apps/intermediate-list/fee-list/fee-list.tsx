import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { FeeV2 } from "../../../core/fbs/model";
import FeeListItem from "../fee-list-item/fee-list.item";
import {
  getFeesPostPaymentChangeDate,
  getFeesPrePaymentChangeDate
} from "../utils/intermediate-list-helper";

interface FeeListProps {
  totalFeeAmountText: string;
  FeeCreatedText: string;
  otherMaterialsText: string;
}
const FeeList: FC<FeeListProps> = ({
  totalFeeAmountText,
  FeeCreatedText,
  otherMaterialsText
}) => {
  const { data: fbsFees } = useGetFeesV2<FeeV2>();
  const [itemsPrePaymentChange, setItemsPrePaymentChange] = useState<
    FeeV2[] | boolean
  >(false);
  const [itemsPostPaymentChange, setItemsPostPaymentChange] = useState<
    FeeV2[] | boolean
  >(false);

  useEffect(() => {
    if (fbsFees) {
      console.log(fbsFees);

      setItemsPrePaymentChange(getFeesPrePaymentChangeDate(fbsFees));
      setItemsPostPaymentChange(getFeesPostPaymentChangeDate(fbsFees));
    }
  }, [fbsFees]);
  return (
    <div>
      {itemsPrePaymentChange && (
        <div>
          <p>
            UBETALTE GEBYRER - <b>INDEN 27/10/2020</b>
          </p>
          {Object.values(itemsPrePaymentChange).map((itemData) => (
            <FeeListItem
              itemData={itemData}
              totalFeeAmountText={totalFeeAmountText}
              FeeCreatedText={FeeCreatedText}
              otherMaterialsText={otherMaterialsText}
            />
          ))}
        </div>
      )}
      {itemsPostPaymentChange && (
        <div>
          <p>
            UBETALTE GEBYRER - <b>EFTER 27/10/2020</b>
          </p>
          {Object.values(itemsPostPaymentChange).map((itemData) => (
            <FeeListItem
              itemData={itemData}
              totalFeeAmountText={totalFeeAmountText}
              FeeCreatedText={FeeCreatedText}
              otherMaterialsText={otherMaterialsText}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeeList;
