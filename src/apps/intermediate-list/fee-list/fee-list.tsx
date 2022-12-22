import * as React from "react";
import { FC } from "react";
import ListHeader from "../../../components/list-header/list-header";
import { FeeV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import FeeListItem from "../fee-list-item/fee-list.item";
import TotalPaymentPay from "../stackable-fees/total-payment-pay";

interface FeeListProps {
  openDetailsModalClickEvent: (faustId: string) => void;
  itemsPrePaymentChange: FeeV2[] | null;
  itemsPostPaymentChange: FeeV2[] | null;
  totalFeePrePaymentChange: number;
  totalFeePostPaymentChange: number;
}
const FeeList: FC<FeeListProps> = ({
  openDetailsModalClickEvent,
  itemsPrePaymentChange,
  itemsPostPaymentChange,
  totalFeePrePaymentChange,
  totalFeePostPaymentChange
}) => {
  const t = useText();

  return (
    <div>
      {!itemsPrePaymentChange && !itemsPostPaymentChange && (
        <>
          <ListHeader header={<>{t("unpaidFeesText")}</>} amount={0} />
          <div className="dpl-list-empty">{t("emptyIntermediateListText")}</div>
        </>
      )}
      {itemsPrePaymentChange && (
        <div>
          <ListHeader
            header={
              // used ‎ here, an invisible character, to get a pesky space between the dash and second string.
              <>
                {t("unpaidFeesText")} -{" "}
                <b>{t("prePaymentTypeChangeDateText")}</b>
              </>
            }
            amount={null}
          />
          {itemsPrePaymentChange.map((itemData) => (
            <FeeListItem
              prePaymentTypeChange
              itemData={itemData}
              openDetailsModalClickEvent={openDetailsModalClickEvent}
              stackHeight={itemData.materials.length}
            />
          ))}

          <TotalPaymentPay
            prePaymentTypeChange
            total={totalFeePrePaymentChange}
          />
        </div>
      )}
      {itemsPostPaymentChange && (
        <div>
          <ListHeader
            header={
              // used ‎ here, an invisible character, to get a pesky space between the dash and second string.
              <>
                {t("unpaidFeesText")} -{" "}
                <b>{t("postPaymentTypeChangeDateText")}</b>
              </>
            }
            amount={null}
          />
          {itemsPostPaymentChange.map((itemData) => {
            return (
              <FeeListItem
                prePaymentTypeChange={false}
                itemData={itemData}
                openDetailsModalClickEvent={openDetailsModalClickEvent}
                stackHeight={itemData.materials.length}
              />
            );
          })}
          <TotalPaymentPay
            prePaymentTypeChange={false}
            total={totalFeePostPaymentChange}
          />
        </div>
      )}
    </div>
  );
};

export default FeeList;
