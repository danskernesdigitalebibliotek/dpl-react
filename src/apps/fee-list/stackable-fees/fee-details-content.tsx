import dayjs from "dayjs";
import * as React from "react";
import { FC, useState } from "react";
import Link from "../../../components/atoms/links/Link";
import { FeeV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import { FaustId } from "../../../core/utils/types/ids";
import { useUrls } from "../../../core/utils/url";
import FeeStatusCircle from "../utils/fee-status-circle";
import { isDateBeforePaymentChangeDate } from "../utils/helper";
import { dateFormatCustom } from "../../../core/configuration/date-format.json";
import StackableFeesList from "./stackable-fees-list";
import AcceptTermsCheckbox from "./AcceptTermsCheckbox";
import GroupModalContent from "../../../components/GroupModal/GroupModalContent";

export interface FeeDetailsContentProps {
  feeDetailsData: FeeV2;
}

const FeeDetailsContent: FC<FeeDetailsContentProps> = ({ feeDetailsData }) => {
  const t = useText();
  const u = useUrls();
  const paymentOverviewUrl = u("paymentOverviewUrl");
  const [check, setCheck] = useState(false);
  const handleAcceptedTerms = () => {
    setCheck(!check);
  };
  const {
    amount = 0,
    creationDate = "",
    dueDate = "",
    materials = []
  } = feeDetailsData;
  const prePaymentTypeChange = isDateBeforePaymentChangeDate(dueDate);
  const creationDateFormatted = dayjs(creationDate).format(dateFormatCustom);
  const showPaymentButton = !prePaymentTypeChange && check;

  return (
    <div className="modal-loan__container">
      <div className="modal-loan__header">
        <div className="mr-32">
          <FeeStatusCircle
            dueDate={dueDate || ""}
            feeCreationDate={creationDate}
          />
        </div>
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
          <>
            <AcceptTermsCheckbox handleAcceptedTerms={handleAcceptedTerms} />
            <div>
              <p>
                {t("amountText", {
                  placeholders: { "@amount": amount }
                })}
              </p>
            </div>
            {!showPaymentButton && (
              <button
                type="button"
                className="btn-primary btn-outline btn-small arrow__hover--right-small"
                disabled={!showPaymentButton}
              >
                {t("payText")}
              </button>
            )}
            {showPaymentButton && (
              <Link
                className="btn-primary btn-filled btn-small arrow__hover--right-small disabled"
                href={paymentOverviewUrl}
              >
                {t("payText")}
              </Link>
            )}
          </>
        }
      >
        <div />
      </GroupModalContent>
      {materials.map(({ recordId }) => (
        <StackableFeesList
          materials={materials}
          key={recordId}
          item={{ faust: `${recordId}` as FaustId }}
          creationDateFormatted={creationDateFormatted}
        />
      ))}
    </div>
  );
};

export default FeeDetailsContent;
