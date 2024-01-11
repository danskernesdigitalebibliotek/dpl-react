import dayjs from "dayjs";
import * as React from "react";
import { FC } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import { FaustId } from "../../../core/utils/types/ids";
import { dateFormatCustom } from "../../../core/configuration/date-format.json";
import StackableFeesList from "./stackable-fees-list";
import GroupModalContent from "../../../components/GroupModal/GroupModalContent";

export interface FeeDetailsContentProps {
  feeDetailsData: FeeV2;
}

const FeeDetailsContent: FC<FeeDetailsContentProps> = ({ feeDetailsData }) => {
  const t = useText();
  const {
    amount = 0,
    creationDate = "",
    materials = [],
    reasonMessage
  } = feeDetailsData;
  const creationDateFormatted = dayjs(creationDate).format(dateFormatCustom);

  return (
    <div className="modal-loan__container">
      <div className="modal-loan__header">
        <div>
          <h2 className="modal-loan__title text-header-h2">
            {t("turnedInText", {
              placeholders: { "@date": creationDateFormatted }
            })}
          </h2>
        </div>
      </div>
      <GroupModalContent
        amountOfSelectableMaterials={0}
        buttonComponent={
          <div>
            <p className="text-body-small-medium">
              {t("totalText", {
                placeholders: { "@total": amount }
              })}
            </p>
          </div>
        }
      >
        <div />
      </GroupModalContent>
      {materials.map(({ recordId }) => (
        <StackableFeesList
          reasonForFee={reasonMessage}
          materials={materials}
          key={recordId}
          item={{ faust: `${recordId}` as FaustId }}
        />
      ))}
    </div>
  );
};

export default FeeDetailsContent;