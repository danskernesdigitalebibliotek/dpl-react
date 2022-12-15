import { capitalize, transform } from "lodash";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { FeeV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import FeeListItem from "../fee-list-item/fee-list.item";
import {
  getFeesPostPaymentChangeDate,
  getFeesPrePaymentChangeDate
} from "../utils/intermediate-list-helper";

const FeeList: FC = () => {
  const t = useText();
  const { data: fbsFees } = useGetFeesV2<FeeV2>();
  const [itemsPrePaymentChange, setItemsPrePaymentChange] = useState<
    FeeV2[] | boolean
  >(false);
  const [itemsPostPaymentChange, setItemsPostPaymentChange] = useState<
    FeeV2[] | boolean
  >(false);

  useEffect(() => {
    if (fbsFees) {
      setItemsPrePaymentChange(getFeesPrePaymentChangeDate(fbsFees));
      setItemsPostPaymentChange(getFeesPostPaymentChangeDate(fbsFees));
    }
  }, [fbsFees]);
  return (
    <div>
      {itemsPrePaymentChange && (
        <div>
          <p style={{ textTransform: "uppercase" }}>
            {t("unpaidFeesText")} - <b>{t("prePaymentTypeChangeDateText")}</b>
          </p>
          {Object.values(itemsPrePaymentChange).map((itemData) => (
            <FeeListItem itemData={itemData} />
          ))}
        </div>
      )}
      {itemsPostPaymentChange && (
        <div>
          <p style={{ textTransform: "uppercase" }}>
            {t("unpaidFeesText")} - <b>{t("postPaymentTypeChangeDateText")}</b>
          </p>
          {Object.values(itemsPostPaymentChange).map((itemData) => (
            <FeeListItem itemData={itemData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeeList;
